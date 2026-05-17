# Configuration

## Package Configuration

The project is configured via `package.json`:

### Key Fields

| Field | Value | Description |
|-------|-------|-------------|
| `name` | `ux-laws-reviewer` | Package name for npm |
| `version` | `2.1.0` | Current version |
| `type` | `commonjs` | Module system |
| `bin` | `install.js` | CLI entry point |
| `engines.node` | `>=14.0.0` | Minimum Node.js version |

### Distribution Files

The `files` array controls what gets published:

```json
"files": [
  "install.js",
  "SKILL.md",
  "references/",
  "evals/",
  "README.md",
  "LICENSE"
]
```

## Skill Metadata

SKILL.md frontmatter configures agent behavior:

```yaml
---
name: ux-laws-reviewer
description: <trigger description>
license: ISC
metadata:
  author: Zendevve
  version: "2.1.0"
---
```

### Metadata Fields

| Field | Purpose |
|-------|---------|
| `name` | Skill identifier for agent loading |
| `description` | Determines when the agent invokes this skill |
| `license` | License type |
| `metadata.author` | Author attribution |
| `metadata.version` | Skill version |

## CLI Configuration

### Environment Variables

No environment variables are required. The installer detects agent directories from standard paths:

| Agent | Default Path |
|-------|-------------|
| Claude Code | `~/.claude/skills/` |
| Gemini CLI | `~/.gemini/skills/` |
| Cursor | `~/.cursor/skills/` |
| Windsurf | `~/.windsurf/skills/` |
| Generic | `~/.agents/skills/` |

### Installer Behavior

The installer (`install.js`) supports these runtime options:

| Flag | Effect |
|------|--------|
| `--force` | Overwrites existing files without prompting |
| `--path` | Overrides auto-detection with custom directory |
| `--all` | Installs to all detected agent directories |
| `--uninstall` | Removes skill files from all directories |

## Review Mode Configuration

The skill auto-configures review mode based on input context. Mode behavior is determined by which reference files are loaded:

### Quick Mode
- Loads: `laws.md` (top 8), `scoring.md`, `accessibility.md` (basic), `examples.md`, `components.md`
- Triggered by: Single component, ≤50 LOC

### Standard Mode
- Loads: All references except `heuristics.md`
- Triggered by: Full page or multi-component layout

### Deep Mode
- Loads: All references including `heuristics.md`
- Triggered by: Explicit request or "accessibility review"

## Customization

### Adding Custom Laws

1. Edit `references/laws.md`
2. Add law definition with name, description, and detection patterns
3. Update SKILL.md if the law should be in Quick mode's top 8

### Modifying Scoring

1. Edit `references/scoring.md`
2. Adjust dimension criteria or calibration anchors
3. Ensure total still sums to 100 (5 dimensions × 20 points)

### Updating Accessibility Mapping

1. Edit `references/accessibility.md`
2. Add or modify WCAG 2.2 criterion mappings
3. Verify criterion numbers match the official WCAG 2.2 spec
