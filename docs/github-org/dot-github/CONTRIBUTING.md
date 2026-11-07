# Contributing to StackWise projects

Thanks for taking the time to help. These guidelines apply to every public repository in the StackWise organization unless a repository has its own `CONTRIBUTING.md`.

## Before you start

- **Small fixes** (typos, broken links, obvious bugs): open a pull request straight away.
- **Larger changes** (new features, refactors, dependency changes): open an issue first so we can agree on the approach before you spend time on it.
- **Security problems**: do not open a public issue. Follow our [security policy](SECURITY.md) instead.

## Making a change

1. Fork the repository and create a branch from the default branch.
2. Follow the setup steps in the repository's README.
3. Keep the change focused on one thing. Unrelated clean-ups belong in a separate pull request.
4. Run the project's checks before you push: lint, type checks and tests, using the commands in the README or `package.json`.
5. Open a pull request that says what changed, why, and how you tested it. Screenshots help for anything visual.

## Ground rules

- Never commit secrets, API keys, `.env` files or customer data.
- Match the existing code style; the linters and formatters in each repository are the source of truth.
- Be respectful. Everyone taking part is expected to follow our [code of conduct](CODE_OF_CONDUCT.md).

By contributing, you agree that your contribution is licensed under the license of the repository you are contributing to.
