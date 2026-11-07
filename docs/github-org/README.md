# StackwiseInd GitHub organization

The studio's GitHub organization is **https://github.com/StackwiseInd**. This folder holds everything needed to set it up:

| Path | What it is |
| --- | --- |
| `stackwise-avatar.png` | 1024×1024 profile picture: the site's mark, full-bleed on the brand black |
| `dot-github/` | The contents of the public `StackwiseInd/.github` repository: the org profile README and default community files |
| `dot-github/profile/README.md` | The README shown on the organization's profile page |
| `dot-github/CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md` | Defaults for every public repo in the org that has none of its own |
| `dot-github/.github/ISSUE_TEMPLATE/`, `dot-github/.github/pull_request_template.md` | Default issue forms and pull request template |

**Already done in this repo:** the footer's GitHub link and the Organization structured data point at the org (`siteConfig.links.githubOrg` in `src/config/site.ts`). The founder's Person structured data keeps the personal profile, `links.github`.

The steps below need an org owner in a browser. GitHub has no API for most of them.

---

## 1. Profile

[Settings → General](https://github.com/organizations/StackwiseInd/settings/profile):

| Field | Value |
| --- | --- |
| Profile picture | Upload `stackwise-avatar.png` |
| Organization display name | `StackWise` |
| Email (public) | `stackwiseind@gmail.com` |
| Description | `Software development studio in Mumbai. SaaS, web apps, AI and websites at fixed prices, live in weeks. You own the code.` |
| URL | `https://stackwise.yashsuthar.dev` |
| Location | `Mumbai, India` |
| Social accounts | Leave empty. The X account in `siteConfig` is the founder's personal one. |
| Billing email | `stackwiseind@gmail.com` |

## 2. Profile README and community files

1. Create a **public** repository named `.github` in StackwiseInd and tick **Add a README file**. It has to be public, or GitHub ignores it.
2. Copy everything in `dot-github/` into it, keeping the folders, including the hidden `.github/` folder:

   ```bash
   git clone https://github.com/StackwiseInd/.github.git stackwiseind-dot-github
   cp -R stackwise-site/docs/github-org/dot-github/. stackwiseind-dot-github/
   cd stackwiseind-dot-github
   git add -A
   git commit -m "Add org profile README and default community files"
   git push
   ```

   No terminal? In the `.github` repo, click **Add file → Create new file** once per file, type the path (for example `profile/README.md` or `.github/ISSUE_TEMPLATE/bug_report.yml`) and paste the contents. `profile/README.md` is the one that matters most.

Claude cloud sessions can't attach a repository whose name starts with a dot, so this step has to be done by hand.

## 3. Security

- **Settings → Authentication security:** tick **Require two-factor authentication** for everyone in the organization.
- **Settings → Member privileges:** set base permissions to **Read**. Allow members to create **private** repositories only, so nothing is made public by accident.
- **Settings → Advanced Security** (or **Code security** on some plans): apply the **GitHub recommended** security configuration to all repositories, and set it as the default for new ones. That turns on Dependabot alerts and security updates, secret scanning with push protection, and private vulnerability reporting, which `SECURITY.md` points to.
- **Settings → Actions → General:** set workflow permissions to **Read repository contents and packages permissions**. Grant write access in a workflow's own `permissions:` block where it needs it.
- **Settings → Verified and approved domains** (optional): verify `stackwise.yashsuthar.dev` to get the **Verified** badge. GitHub gives you a DNS TXT record to add. If the domain's DNS is on Vercel, a Claude session with the Vercel connector can add it for you.

## 4. Move the repositories in

For each repo: **Settings → General → Danger Zone → Transfer ownership**, then enter `StackwiseInd`. GitHub redirects the old web, clone and push URLs to the new home, as long as no new repository with the same name is created under `trynayash`. So the site's links keep working until they are updated in step 5.

| Repository | Linked from the site | Notes |
| --- | --- | --- |
| `trynayash/stackwise-site` | `/work/stackwise` | Vercel deploys it. Reconnect it afterwards: install the Vercel GitHub app on StackwiseInd, then **Vercel → Project → Settings → Git**. Install the Claude GitHub app on StackwiseInd so Claude sessions can keep pushing to it. |
| `trynayash/scopecihq` | ScopeCI case study, proof grid | |
| `trynayash/limityourapi-sdk` | LimitYourAPI case study, proof grid | Update `repository` in the Node.js SDK's `package.json` with the next npm release. Leave the Go module path as it is: the old path keeps resolving through GitHub's redirect, and changing it breaks existing imports. |
| `trynayash/PromptP` | `/work/promptp` | |
| `trynayash/CodeFusionAI` | `/work/codefusionai` | Reconnect Vercel if it deploys from the repo. |
| `trynayash/om-enterprise` | `/work/omenterprise` | Client project. Check the contract first: if the client should own it, transfer it to them instead. |

Personal repositories, such as the yashsuthar.dev portfolio, stay under `trynayash`.

Update local clones afterwards:

```bash
git remote set-url origin https://github.com/StackwiseInd/stackwise-site.git
```

## 5. Point the site at the moved repositories

Once the transfers are done, replace `github.com/trynayash/<repo>` with `github.com/StackwiseInd/<repo>` in:

- `src/lib/case-studies.ts`: `projectLinks.limityourapi.repo` and `projectLinks.scopeci.repo`
- `src/lib/proof.ts`: the SDK and ScopeCI links. Consider pointing "Code on GitHub" at the org page (`siteConfig.links.githubOrg`) instead.
- `src/lib/more-work.ts`: `repoUrl` and the GitHub `extraLinks` for CodeFusionAI, PromptP, StackWise and OM ENTERPRISE
- `README.md` (the clone command) and `docs/frontend-playbook.md`

## 6. Polish each repository

- **Pin up to six repositories** on the org profile (**View as: Public → Customize pins**). Suggested: `stackwise-site`, `limityourapi-sdk`, `scopecihq`, `PromptP`, `CodeFusionAI`.
- **Fill in each repository's About panel** (the ⚙ next to About): a description, the website and topics.

| Repository | Description | Website | Topics |
| --- | --- | --- | --- |
| `stackwise-site` | The StackWise studio website, built with Next.js. | https://stackwise.yashsuthar.dev | `nextjs` `react` `typescript` `tailwindcss` `framer-motion` |
| `limityourapi-sdk` | Node.js, Go and Python SDKs for the LimitYourAPI rate limiting API. | https://limityourapi.tech | `rate-limiting` `sdk` `nodejs` `golang` `python` `api` |
| `scopecihq` | A GitHub App that checks agency pull requests against the signed scope. | https://scopeci.onrender.com | `github-app` `typescript` `nodejs` `agencies` `linear` |
| `PromptP` | Turns a short prompt into a structured one. | | `prompt-engineering` `react` `typescript` `express` |
| `CodeFusionAI` | A browser code editor with a course catalog. | https://codefusionai.vercel.app | `code-editor` `monaco-editor` `react` `supabase` `education` |

- Make sure every public repository has a `LICENSE`. GitHub can't supply one from the org's `.github` repo.
