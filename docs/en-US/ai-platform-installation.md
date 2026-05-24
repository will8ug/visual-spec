# Multi-Agent Installation Guide

[English](../en-US/ai-platform-installation.md) | [中文](../zh-CN/ai-platform-installation.md) | [日本語](../ja-JP/ai-platform-installation.md)

Recommended: use the official skills.sh installer (the skills CLI). It can install the same Skill to different AI platforms (Trae / Claude Code / Cursor / GitHub Copilot, etc.) by placing it into the correct skills directory.

## Option 1: skills.sh (Recommended)

The installer can auto-detect supported agents and prompt you for installation scope (project vs global).

```bash
npx visual-spec --target /path/to/project
```

Target a specific agent (examples):

```bash
# Trae (project scope)
npx visual-spec --target /path/to/project -a trae

# Claude Code (project scope)
npx visual-spec --target /path/to/project -a claude-code

# Cursor (project scope)
npx visual-spec --target /path/to/project -a cursor

# GitHub Copilot (project scope)
npx visual-spec --target /path/to/project -a github-copilot
```

Global install (available across all projects for the current user):

```bash
npx visual-spec --target /path/to/project -g
```

List skills in this repository:

```bash
npx visual-spec --help
```
