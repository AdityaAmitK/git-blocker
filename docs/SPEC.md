# Git Blocker v1 Specification

## Goal
Prevent accidental commits of locally protected files.

## Principles

- Configuration is local to each Git clone.
- No project files are modified.
- No cloud services.
- Fast execution.
- Safe by default.
- Easy uninstall.

## Commands

- install
- uninstall
- add
- remove
- list
- check

## Configuration

Stored in:

.git/git-blocker/config.json

## Non Goals

- Team shared configuration
- GUI
- VS Code extension
- GitHub Action