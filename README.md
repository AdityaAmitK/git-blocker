# Git Blocker

Protect important files from accidental Git commits.

Git Blocker is a lightweight Git CLI that warns you before committing files you've marked as protected. Rules are stored locally inside your Git repository, so each developer can maintain their own protected files without affecting teammates.

## Features

* Protect files or glob patterns
* Local configuration (stored in `.git/git-blocker/`)
* Interactive confirmation before committing protected files
* No project files added to your repository
* Simple CLI
* Fast and dependency-light

## Installation

### From npm

```bash
npm install -g git-blocker
```

### Verify

```bash
git blocker --help
```

## Quick Start

Inside a Git repository:

```bash
git blocker install
```

Protect a file:

```bash
git blocker add src/admin/config.ts --reason "Temporary testing"
```

Protect a directory:

```bash
git blocker add "backend/admin/**" --reason "Critical APIs"
```

List all rules:

```bash
git blocker list
```

Remove a rule:

```bash
git blocker remove "backend/admin/**"
```

Uninstall Git Blocker:

```bash
git blocker uninstall
```

## Example

If a protected file is staged:

```text
Git Blocker

• src/admin/config.ts
  Reason: Temporary testing

Continue with commit? (y/N)
```

Choosing **No** aborts the commit.

Choosing **Yes** allows the commit to continue.

## Configuration

Rules are stored locally in:

```text
.git/git-blocker/config.json
```

This file is not committed to Git, allowing each developer to maintain independent protection rules.

## Commands

| Command                        | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `git blocker install`          | Install Git Blocker into the current repository |
| `git blocker uninstall`        | Remove Git Blocker from the current repository  |
| `git blocker add <pattern>`    | Add a protected file or glob pattern            |
| `git blocker remove <pattern>` | Remove a protected rule                         |
| `git blocker list`             | List configured rules                           |
| `git blocker check`            | Check staged files manually                     |

## Requirements

* Git
* Node.js 18+

## Current Limitations

* v1 replaces an existing `pre-commit` hook instead of integrating with other hook managers.
* Integration with Husky and similar tools is planned for a future release.

## License

MIT
