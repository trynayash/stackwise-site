#!/usr/bin/env bash
# Sets up the StackwiseInd GitHub organization from this folder, using the GitHub CLI (gh) on your own computer.
#
#   bash docs/github-org/setup.sh
#
# It asks before every repository transfer. Each step can be re-run safely: anything already done is skipped.
# GitHub has no API for the profile picture, the two-factor requirement or pinned repositories; the script lists
# those at the end.
set -uo pipefail

ORG="StackwiseInd"
OLD_OWNER="trynayash"
SITE="https://stackwise.yashsuthar.dev"
EMAIL="stackwiseind@gmail.com"
DESCRIPTION="Software development studio in Mumbai. SaaS, web apps, AI and websites at fixed prices, live in weeks. You own the code."
KIT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ok()   { printf '\033[32m✓\033[0m %s\n' "$*"; }
warn() { printf '\033[33m!\033[0m %s\n' "$*"; }
step() { printf '\n\033[1m%s\033[0m\n' "$*"; }
confirm() { local a; read -r -p "$1 [y/N] " a; [[ "$a" =~ ^[Yy]$ ]]; }

# ── 0. GitHub CLI, signed in with org admin rights ──────────────────────────────────────────────────
step "Checking the GitHub CLI"
command -v gh >/dev/null || { echo "Install the GitHub CLI first: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || gh auth login -h github.com -s admin:org,repo || exit 1
if ! gh auth status 2>&1 | grep -q "admin:org"; then
    gh auth refresh -h github.com -s admin:org || exit 1
fi
role=$(gh api "orgs/$ORG/memberships/$(gh api user --jq .login)" --jq .role 2>/dev/null)
[[ "$role" == "admin" ]] || { echo "You need to be an owner of $ORG."; exit 1; }
ok "Signed in as an owner of $ORG"

# ── 1. Profile ──────────────────────────────────────────────────────────────────────────────────────
step "1. Organization profile"
gh api -X PATCH "orgs/$ORG" \
    -f name="StackWise" -f email="$EMAIL" -f billing_email="$EMAIL" \
    -f description="$DESCRIPTION" -f blog="$SITE" -f location="Mumbai, India" >/dev/null \
    && ok "Name, description, website, email and location set" || warn "Could not update the profile"

# ── 2. Member privileges and security defaults ──────────────────────────────────────────────────────
step "2. Member privileges and security"
gh api -X PATCH "orgs/$ORG" -f default_repository_permission=read \
    -F members_can_create_public_repositories=false -F members_can_create_private_repositories=true >/dev/null \
    && ok "Base permission Read; members can create private repositories only" || warn "Could not set member privileges"

gh api -X PUT "orgs/$ORG/actions/permissions/workflow" \
    -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false >/dev/null \
    && ok "Actions workflows get a read-only token by default" || warn "Could not set the Actions token permissions"

config_id=$(gh api "orgs/$ORG/code-security/configurations?target_type=global" --jq '.[0].id' 2>/dev/null)
if [[ -n "$config_id" ]]; then
    gh api -X POST "orgs/$ORG/code-security/configurations/$config_id/attach" -f scope=all >/dev/null \
        && ok "GitHub recommended security configuration applied to all repositories" || warn "Could not apply the security configuration"
    gh api -X PUT "orgs/$ORG/code-security/configurations/$config_id/defaults" -f default_for_new_repos=all >/dev/null \
        && ok "…and set as the default for new repositories" || warn "Could not make it the default for new repositories"
else
    warn "No GitHub recommended security configuration found; apply one in Settings → Advanced Security"
fi

# ── 3. The .github repository: profile README and default community files ──────────────────────────
step "3. Profile README and community files (the public $ORG/.github repository)"
if gh repo view "$ORG/.github" >/dev/null 2>&1; then
    ok "$ORG/.github already exists"
else
    gh repo create "$ORG/.github" --public --add-readme \
        --description "StackWise organization profile and default community health files" >/dev/null \
        && ok "Created $ORG/.github" || warn "Could not create $ORG/.github"
fi
tmp=$(mktemp -d)
if gh repo clone "$ORG/.github" "$tmp/dot-github" -- --quiet 2>/dev/null; then
    cp -R "$KIT/dot-github/." "$tmp/dot-github/"
    (
        cd "$tmp/dot-github" || exit 1
        git add -A
        if git diff --cached --quiet; then
            ok "Files are already up to date"
        else
            git commit -q -m "Add org profile README and default community files" && git push -q origin HEAD \
                && ok "Pushed the profile README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, SUPPORT and templates" \
                || warn "Could not push to $ORG/.github"
        fi
    )
else
    warn "Could not clone $ORG/.github"
fi
rm -rf "$tmp"

# ── 4. Move the repositories in, and fill in each one's About panel ────────────────────────────────
step "4. Move repositories into $ORG"
echo "GitHub redirects the old URLs (web, clone and push) to the new home after a transfer."

# repo | description | homepage | topics
REPOS=(
    "stackwise-site|The StackWise studio website, built with Next.js.|$SITE|nextjs,react,typescript,tailwindcss,framer-motion"
    "scopecihq|A GitHub App that checks agency pull requests against the signed scope.|https://scopeci.onrender.com|github-app,typescript,nodejs,agencies,linear"
    "limityourapi-sdk|Node.js, Go and Python SDKs for the LimitYourAPI rate limiting API.|https://limityourapi.tech|rate-limiting,sdk,nodejs,golang,python,api"
    "PromptP|Turns a short prompt into a structured one.||prompt-engineering,react,typescript,express"
    "CodeFusionAI|A browser code editor with a course catalog.|https://codefusionai.vercel.app|code-editor,monaco-editor,react,supabase,education"
    "om-enterprise|||"
)

moved=()
for entry in "${REPOS[@]}"; do
    IFS='|' read -r repo desc homepage topics <<<"$entry"
    owner=$(gh api "repos/$OLD_OWNER/$repo" --jq .owner.login 2>/dev/null)
    if [[ "$owner" == "$ORG" ]]; then
        ok "$repo is already in $ORG"
    elif [[ -z "$owner" ]]; then
        warn "$OLD_OWNER/$repo not found; skipped"
        continue
    else
        note=""
        [[ "$repo" == "om-enterprise" ]] && note=" (client project: check the contract says StackWise keeps it)"
        [[ "$repo" == "stackwise-site" ]] && note=" (reconnect Vercel afterwards)"
        if ! confirm "Transfer $OLD_OWNER/$repo to $ORG?$note"; then
            echo "  skipped $repo"
            continue
        fi
        gh api -X POST "repos/$OLD_OWNER/$repo/transfer" -f new_owner="$ORG" >/dev/null || { warn "Transfer of $repo failed"; continue; }
        for _ in $(seq 1 30); do
            gh api "repos/$ORG/$repo" >/dev/null 2>&1 && break
            sleep 2
        done
        ok "Transferred $repo"
    fi
    moved+=("$repo")
    if [[ -n "$desc" ]]; then
        args=(--description "$desc")
        [[ -n "$homepage" ]] && args+=(--homepage "$homepage")
        [[ -n "$topics" ]] && args+=(--add-topic "$topics")
        gh repo edit "$ORG/$repo" "${args[@]}" >/dev/null && ok "  description, website and topics set" || warn "  could not edit $repo's About panel"
    fi
done

# ── 5. What is left ─────────────────────────────────────────────────────────────────────────────────
step "Done. Four things GitHub only allows in the browser:"
cat <<EOF
  1. Profile picture: upload docs/github-org/stackwise-avatar.png at
     https://github.com/organizations/$ORG/settings/profile
  2. Two-factor requirement: tick "Require two-factor authentication" at
     https://github.com/organizations/$ORG/settings/security
  3. Pins: on https://github.com/$ORG, choose View as: Public, then Customize pins.
  4. If stackwise-site moved: install the Vercel and Claude GitHub apps on $ORG, then reconnect the
     project in Vercel → Project → Settings → Git.
EOF
if ((${#moved[@]})); then
    echo
    echo "Repositories now in $ORG: ${moved[*]}"
    echo "Tell Claude these moved, so the website's links can be switched to github.com/$ORG/…"
fi
