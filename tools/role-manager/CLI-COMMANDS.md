# Role Manager CLI - Command Reference

Complete reference for all Role Manager CLI commands.

---

## Table of Contents

- [Role Commands](#role-commands)
- [Domain Commands](#domain-commands)
- [Configuration Commands](#configuration-commands)
- [Global Options](#global-options)
- [Exit Codes](#exit-codes)
- [Environment Variables](#environment-variables)

---

## Role Commands

All role commands follow the pattern: `claude role <subcommand> [arguments] [options]`

### `claude role list`

List all available roles across all domains.

**Usage:**
```bash
claude role list [options]
```

**Options:**
- `--domain <domain-id>` - Filter roles by domain
- `--tag <tag>` - Filter roles by tag (can be specified multiple times)
- `--active` - Show only active roles
- `--custom` - Show only custom roles
- `--format <format>` - Output format: table, json, yaml (default: table)
- `--verbose` - Show detailed information

**Examples:**
```bash
# List all roles
claude role list

# List only development roles
claude role list --domain development

# List roles tagged with 'javascript' and 'react'
claude role list --tag javascript --tag react

# List only currently active roles
claude role list --active

# List all custom roles
claude role list --custom

# Output as JSON
claude role list --format json
```

**Output (table format):**
```
ID                      DOMAIN        NAME                    ACTIVE
frontend-developer      development   Frontend Developer      *
backend-developer       development   Backend Developer
security-analyst        security      Security Analyst        *
data-analyst            operations    Data Analyst
```

---

### `claude role show`

Display detailed information about a specific role.

**Usage:**
```bash
claude role show <role-id> [options]
```

**Arguments:**
- `<role-id>` - The unique identifier of the role (required)

**Options:**
- `--resolve-inheritance` - Show fully resolved role with inherited properties
- `--show-skills` - Display detailed skill information
- `--show-mcps` - Display detailed MCP information
- `--format <format>` - Output format: yaml, json (default: yaml)

**Examples:**
```bash
# Show basic role information
claude role show frontend-developer

# Show fully resolved role (with inheritance)
claude role show full-stack-developer --resolve-inheritance

# Show role with detailed skill information
claude role show frontend-developer --show-skills

# Output as JSON
claude role show frontend-developer --format json
```

**Output:**
```yaml
ID: frontend-developer
Name: Frontend Developer
Domain: development
Description: Build modern web user interfaces with React, Vue, and other frameworks
Version: 1.0.0

Skills:
  - canvas-design
  - web-artifacts-builder
  - frontend-design
  - webapp-testing

MCPs:
  - github
  - npm-registry
  - figma
  - browser-devtools

Context:
  Primary Languages: JavaScript, TypeScript, HTML, CSS
  Frameworks: React, Vue, Angular, Svelte
  Responsibilities:
    - Implement responsive user interfaces
    - Ensure cross-browser compatibility
    - Optimize frontend performance

Status: Active
```

---

### `claude role activate`

Activate one or more roles.

**Usage:**
```bash
claude role activate <role-id> [role-id...] [options]
```

**Arguments:**
- `<role-id>` - Role identifier(s) to activate (required, one or more)

**Options:**
- `--session-only` - Activate only for current session (don't save to config)
- `--dry-run` - Preview what would be activated without actually activating
- `--force` - Force activation even if there are warnings
- `--conflict-resolution <strategy>` - Strategy for conflicts: merge, priority, explicit (default: merge)

**Examples:**
```bash
# Activate a single role
claude role activate frontend-developer

# Activate multiple roles
claude role activate frontend-developer security-analyst

# Activate for current session only
claude role activate data-analyst --session-only

# Preview activation without committing
claude role activate frontend-developer --dry-run

# Force activation ignoring warnings
claude role activate experimental-role --force
```

**Output:**
```
Activating role: Frontend Developer

Skills added:
  + canvas-design
  + web-artifacts-builder
  + frontend-design
  + webapp-testing

MCPs added:
  + github
  + npm-registry
  + figma
  + browser-devtools

Role 'frontend-developer' activated successfully.
```

---

### `claude role deactivate`

Deactivate one or more roles.

**Usage:**
```bash
claude role deactivate <role-id> [role-id...] [options]
```

**Arguments:**
- `<role-id>` - Role identifier(s) to deactivate (required, one or more)

**Options:**
- `--all` - Deactivate all active roles
- `--keep-skills <skill-id>` - Keep specific skills active (can be repeated)
- `--keep-mcps <mcp-id>` - Keep specific MCPs active (can be repeated)

**Examples:**
```bash
# Deactivate a single role
claude role deactivate frontend-developer

# Deactivate multiple roles
claude role deactivate frontend-developer security-analyst

# Deactivate all active roles
claude role deactivate --all

# Deactivate but keep specific skills
claude role deactivate frontend-developer --keep-skills canvas-design
```

**Output:**
```
Deactivating role: Frontend Developer

Skills removed:
  - canvas-design
  - web-artifacts-builder
  - frontend-design
  - webapp-testing

MCPs removed:
  - github
  - npm-registry
  - figma
  - browser-devtools

Role 'frontend-developer' deactivated successfully.
```

---

### `claude role create`

Create a new custom role.

**Usage:**
```bash
claude role create <role-id> [options]
```

**Arguments:**
- `<role-id>` - Unique identifier for the new role (required)

**Options:**
- `--name <name>` - Display name for the role
- `--domain <domain-id>` - Parent domain (required)
- `--description <description>` - Role description
- `--extends <role-id>` - Parent role(s) to inherit from (can be repeated)
- `--skills <skill-id>` - Skills to include (can be repeated)
- `--mcps <mcp-id>` - MCPs to include (can be repeated)
- `--interactive` - Interactive mode with prompts
- `--template <template-id>` - Use a role template

**Examples:**
```bash
# Create a basic custom role
claude role create my-role \
  --name "My Custom Role" \
  --domain development \
  --description "My custom development role"

# Create a role that inherits from another
claude role create secure-frontend-dev \
  --name "Secure Frontend Developer" \
  --domain development \
  --extends frontend-developer \
  --extends security-analyst \
  --skills penetration-testing

# Interactive mode
claude role create my-role --interactive

# Create from template
claude role create my-role --template basic-developer
```

**Output:**
```
Creating custom role: my-role

Role definition saved to:
  ~/.config/claude-code/custom-roles/my-role.json

To activate this role, run:
  claude role activate my-role
```

---

### `claude role edit`

Edit an existing custom role.

**Usage:**
```bash
claude role edit <role-id> [options]
```

**Arguments:**
- `<role-id>` - ID of the role to edit (required, must be custom role)

**Options:**
- `--editor <editor>` - Editor to use (default: $EDITOR or vim)
- `--add-skill <skill-id>` - Add a skill to the role
- `--remove-skill <skill-id>` - Remove a skill from the role
- `--add-mcp <mcp-id>` - Add an MCP to the role
- `--remove-mcp <mcp-id>` - Remove an MCP from the role
- `--set-description <description>` - Update description

**Examples:**
```bash
# Edit role in default editor
claude role edit my-custom-role

# Add a skill to the role
claude role edit my-custom-role --add-skill new-skill

# Remove a skill from the role
claude role edit my-custom-role --remove-skill old-skill

# Update description
claude role edit my-custom-role --set-description "Updated description"

# Use specific editor
claude role edit my-custom-role --editor nano
```

**Output:**
```
Opening role definition in editor...

Role 'my-custom-role' updated successfully.
Changes:
  + Added skill: new-skill
  ~ Updated description

Validation: PASSED
```

---

### `claude role validate`

Validate a role definition file.

**Usage:**
```bash
claude role validate <file-path> [options]
```

**Arguments:**
- `<file-path>` - Path to role definition file (required)

**Options:**
- `--schema-only` - Only validate against JSON schema
- `--semantic` - Also perform semantic validation (default: true)
- `--strict` - Enable strict validation mode
- `--format <format>` - Output format: text, json (default: text)
- `--verbose` - Show detailed validation information

**Examples:**
```bash
# Validate a role file
claude role validate ./my-role.json

# Validate schema only
claude role validate ./my-role.json --schema-only

# Strict validation with verbose output
claude role validate ./my-role.json --strict --verbose

# Output validation result as JSON
claude role validate ./my-role.json --format json
```

**Output (success):**
```
Validating: ./my-role.json

Schema validation: PASSED
Semantic validation: PASSED

The role definition is valid.
```

**Output (failure):**
```
Validating: ./my-role.json

Schema validation: FAILED

Errors:
  - Missing required property: 'domain' (line 3)
  - Invalid skill ID format: 'My-Skill' should be 'my-skill' (line 8)
  - Skill 'nonexistent-skill' does not exist (line 9)

Semantic validation: SKIPPED (schema validation failed)
```

---

### `claude role delete`

Delete a custom role.

**Usage:**
```bash
claude role delete <role-id> [options]
```

**Arguments:**
- `<role-id>` - ID of the custom role to delete (required)

**Options:**
- `--force` - Skip confirmation prompt
- `--keep-backup` - Keep a backup of the deleted role

**Examples:**
```bash
# Delete a custom role (with confirmation)
claude role delete my-custom-role

# Delete without confirmation
claude role delete my-custom-role --force

# Delete and keep backup
claude role delete my-custom-role --keep-backup
```

**Output:**
```
This will permanently delete the custom role 'my-custom-role'.
Are you sure? (y/N): y

Role 'my-custom-role' deleted successfully.
Backup saved to: ~/.config/claude-code/backups/my-custom-role.json.bak
```

---

## Domain Commands

All domain commands follow the pattern: `claude domain <subcommand> [arguments] [options]`

### `claude domain list`

List all available domains.

**Usage:**
```bash
claude domain list [options]
```

**Options:**
- `--format <format>` - Output format: table, json, yaml (default: table)
- `--show-roles` - Include role count for each domain
- `--verbose` - Show detailed information

**Examples:**
```bash
# List all domains
claude domain list

# List with role counts
claude domain list --show-roles

# Output as JSON
claude domain list --format json
```

**Output:**
```
ID              NAME            ROLES   DESCRIPTION
development     Development     6       Software development and engineering roles
security        Security        4       Security and compliance roles
operations      Operations      5       IT operations and infrastructure roles
finance         Finance         3       Financial analysis and management roles
hr              HR              4       Human resources roles
marketing       Marketing       3       Marketing and communication roles
home-family     Home & Family   5       Home and family management roles
personal        Personal        4       Personal growth and lifestyle roles
```

---

### `claude domain show`

Display detailed information about a specific domain.

**Usage:**
```bash
claude domain show <domain-id> [options]
```

**Arguments:**
- `<domain-id>` - The domain identifier (required)

**Options:**
- `--show-roles` - List all roles in the domain
- `--format <format>` - Output format: yaml, json (default: yaml)

**Examples:**
```bash
# Show domain information
claude domain show development

# Show domain with role details
claude domain show development --show-roles

# Output as JSON
claude domain show development --format json
```

**Output:**
```yaml
ID: development
Name: Development
Description: Software development and engineering roles
Version: 1.0.0

Roles:
  - frontend-developer (Frontend Developer)
  - backend-developer (Backend Developer)
  - full-stack-developer (Full Stack Developer)
  - devops-engineer (DevOps Engineer)
  - mobile-developer (Mobile Developer)
  - qa-engineer (QA Engineer)

Metadata:
  Tags: engineering, technology, software
  Icon: code
  Color: #0066cc
```

---

## Configuration Commands

All config commands follow the pattern: `claude config <subcommand> [arguments] [options]`

### `claude config roles`

Display current role configuration.

**Usage:**
```bash
claude config roles [options]
```

**Options:**
- `--format <format>` - Output format: yaml, json, table (default: table)
- `--show-skills` - Include skills from active roles
- `--show-mcps` - Include MCPs from active roles
- `--resolved` - Show fully resolved configuration

**Examples:**
```bash
# Show active roles
claude config roles

# Show with skills and MCPs
claude config roles --show-skills --show-mcps

# Show fully resolved configuration
claude config roles --resolved

# Output as JSON
claude config roles --format json
```

**Output:**
```
Active Roles:
  - frontend-developer (Frontend Developer)
  - security-analyst (Security Analyst)

Preferences:
  Auto-activate: true
  Conflict Resolution: merge
  Skill Priority: role-defined

Configuration file: ~/.config/claude-code/roles.json
```

---

### `claude config export`

Export role configuration to a file or stdout.

**Usage:**
```bash
claude config export [file-path] [options]
```

**Arguments:**
- `[file-path]` - Output file path (optional, defaults to stdout)

**Options:**
- `--format <format>` - Export format: json, yaml (default: json)
- `--include-custom-roles` - Include custom role definitions
- `--minify` - Minify JSON output
- `--pretty` - Pretty-print output (default: true)

**Examples:**
```bash
# Export to stdout
claude config export

# Export to file
claude config export my-config.json

# Export with custom roles
claude config export my-config.json --include-custom-roles

# Export as YAML
claude config export my-config.yaml --format yaml

# Export minified JSON
claude config export config.json --minify
```

**Output (stdout):**
```json
{
  "version": "1.0.0",
  "activeRoles": [
    "frontend-developer",
    "security-analyst"
  ],
  "customRoles": [],
  "preferences": {
    "autoActivate": true,
    "conflictResolution": "merge",
    "skillPriority": "role-defined"
  }
}
```

---

### `claude config import`

Import role configuration from a file.

**Usage:**
```bash
claude config import <file-path> [options]
```

**Arguments:**
- `<file-path>` - Path to configuration file (required)

**Options:**
- `--merge` - Merge with existing configuration (default: replace)
- `--activate` - Activate imported roles immediately
- `--dry-run` - Preview import without applying
- `--backup` - Create backup of current configuration

**Examples:**
```bash
# Import configuration (replaces current)
claude config import my-config.json

# Import and merge with existing
claude config import my-config.json --merge

# Import and activate roles
claude config import my-config.json --activate

# Preview import
claude config import my-config.json --dry-run

# Import with backup
claude config import my-config.json --backup
```

**Output:**
```
Importing configuration from: my-config.json

Preview:
  Active Roles (before): frontend-developer
  Active Roles (after): frontend-developer, backend-developer, security-analyst

  Custom Roles (before): 1
  Custom Roles (after): 3

Proceed with import? (y/N): y

Backup saved to: ~/.config/claude-code/backups/roles.json.bak.20231230120000

Configuration imported successfully.
```

---

### `claude config set`

Set configuration preferences.

**Usage:**
```bash
claude config set <key> <value> [options]
```

**Arguments:**
- `<key>` - Configuration key (required)
- `<value>` - Configuration value (required)

**Valid Keys:**
- `autoActivate` - Auto-activate roles on startup (boolean)
- `conflictResolution` - Conflict resolution strategy (merge, priority, explicit)
- `skillPriority` - Skill priority strategy (role-defined, user-defined)

**Examples:**
```bash
# Disable auto-activation
claude config set autoActivate false

# Set conflict resolution strategy
claude config set conflictResolution priority

# Set skill priority
claude config set skillPriority user-defined
```

**Output:**
```
Configuration updated:
  autoActivate: true -> false

Changes saved to: ~/.config/claude-code/roles.json
```

---

### `claude config get`

Get configuration preference value.

**Usage:**
```bash
claude config get <key>
```

**Arguments:**
- `<key>` - Configuration key (required)

**Examples:**
```bash
# Get auto-activate setting
claude config get autoActivate

# Get conflict resolution strategy
claude config get conflictResolution
```

**Output:**
```
autoActivate: true
```

---

### `claude config reset`

Reset configuration to defaults.

**Usage:**
```bash
claude config reset [options]
```

**Options:**
- `--force` - Skip confirmation prompt
- `--backup` - Create backup before resetting
- `--keep-custom-roles` - Keep custom roles when resetting

**Examples:**
```bash
# Reset configuration (with confirmation)
claude config reset

# Reset without confirmation
claude config reset --force

# Reset with backup
claude config reset --backup

# Reset but keep custom roles
claude config reset --keep-custom-roles
```

**Output:**
```
This will reset all configuration to defaults.
Custom roles will be deleted.
Are you sure? (y/N): y

Backup saved to: ~/.config/claude-code/backups/roles.json.bak.20231230120000

Configuration reset to defaults.
```

---

## Global Options

These options are available for all commands:

- `--help`, `-h` - Show help for the command
- `--version`, `-v` - Show version information
- `--verbose` - Enable verbose output
- `--quiet`, `-q` - Suppress non-essential output
- `--no-color` - Disable colored output
- `--config <path>` - Use custom configuration file
- `--debug` - Enable debug mode (shows stack traces)

**Examples:**
```bash
# Show help for a command
claude role activate --help

# Show version
claude --version

# Verbose output
claude role list --verbose

# Quiet mode
claude role activate frontend-developer --quiet

# Disable colors
claude role list --no-color

# Use custom config file
claude --config ./my-config.json role list

# Debug mode
claude --debug role activate test-role
```

---

## Exit Codes

The CLI uses the following exit codes:

- `0` - Success
- `1` - General error
- `2` - Command usage error (invalid arguments)
- `3` - Configuration error
- `4` - Validation error
- `5` - Role not found error
- `6` - Domain not found error
- `7` - Circular dependency error
- `8` - File system error
- `9` - Permission error

**Usage in Scripts:**
```bash
#!/bin/bash

claude role activate frontend-developer
if [ $? -eq 0 ]; then
  echo "Role activated successfully"
else
  echo "Failed to activate role"
  exit 1
fi
```

---

## Environment Variables

The following environment variables affect CLI behavior:

### `CLAUDE_CONFIG_DIR`
Override default configuration directory.

```bash
export CLAUDE_CONFIG_DIR=/custom/path
claude role list
```

Default: `~/.config/claude-code`

### `CLAUDE_NO_COLOR`
Disable colored output.

```bash
export CLAUDE_NO_COLOR=1
claude role list
```

### `CLAUDE_EDITOR`
Default editor for role editing.

```bash
export CLAUDE_EDITOR=nano
claude role edit my-role
```

Fallback: `$EDITOR`, then `vim`

### `CLAUDE_LOG_LEVEL`
Set logging level.

```bash
export CLAUDE_LOG_LEVEL=debug
claude role activate test-role
```

Values: `error`, `warn`, `info`, `debug`

### `CLAUDE_ROLE_CACHE_TTL`
Cache time-to-live in seconds.

```bash
export CLAUDE_ROLE_CACHE_TTL=3600
claude role list
```

Default: `300` (5 minutes)

---

## Shell Completion

Enable shell completion for bash, zsh, or fish:

### Bash
```bash
claude completion bash > /etc/bash_completion.d/claude
source /etc/bash_completion.d/claude
```

### Zsh
```bash
claude completion zsh > "${fpath[1]}/_claude"
```

### Fish
```bash
claude completion fish > ~/.config/fish/completions/claude.fish
```

---

## Examples by Use Case

### First-Time User Setup

```bash
# List available domains
claude domain list

# Explore development domain
claude domain show development

# View a specific role
claude role show frontend-developer

# Activate the role
claude role activate frontend-developer

# Verify activation
claude config roles
```

### Creating a Team Role

```bash
# Create team role extending official role
claude role create team-frontend-dev \
  --name "Team Frontend Developer" \
  --domain development \
  --extends frontend-developer \
  --skills internal-component-lib \
  --mcps company-github

# Export for team members
claude config export team-config.json --include-custom-roles

# Team members import
claude config import team-config.json --activate
```

### Multi-Role Workflow

```bash
# Activate multiple roles for complex project
claude role activate frontend-developer
claude role activate security-analyst
claude role activate devops-engineer

# Check combined capabilities
claude config roles --show-skills --show-mcps

# Deactivate when switching contexts
claude role deactivate --all
claude role activate data-analyst
```

### Custom Role Development

```bash
# Create custom role interactively
claude role create my-role --interactive

# Validate the role
claude role validate ~/.config/claude-code/custom-roles/my-role.json

# Test the role
claude role activate my-role --dry-run

# Activate if satisfied
claude role activate my-role

# Edit later if needed
claude role edit my-role --add-skill new-skill
```

---

## Troubleshooting Commands

### Diagnose Issues

```bash
# Check configuration validity
claude config roles --resolved

# Validate all custom roles
for role in ~/.config/claude-code/custom-roles/*.json; do
  claude role validate "$role"
done

# Check for circular dependencies
claude role show my-role --resolve-inheritance --verbose

# View debug information
claude --debug role activate problematic-role
```

### Reset After Issues

```bash
# Reset to defaults with backup
claude config reset --backup

# Delete problematic custom role
claude role delete problematic-role --force

# Re-import from backup if needed
claude config import ~/.config/claude-code/backups/roles.json.bak
```

---

## Advanced Patterns

### Scripting with the CLI

```bash
#!/bin/bash

# Activate role based on project type
if [ -f "package.json" ]; then
  claude role activate frontend-developer
elif [ -f "requirements.txt" ]; then
  claude role activate backend-developer
fi

# Export list of active roles as JSON
active_roles=$(claude config roles --format json | jq -r '.activeRoles[]')
echo "Active: $active_roles"
```

### CI/CD Integration

```bash
# In CI pipeline, activate specific role for build
claude role activate ci-build-role --session-only

# Export configuration for caching
claude config export /tmp/claude-config.json

# Import in subsequent jobs
claude config import /tmp/claude-config.json
```

---

## Command Aliases

Consider adding aliases for frequently used commands:

```bash
# In ~/.bashrc or ~/.zshrc
alias cr='claude role'
alias cra='claude role activate'
alias crd='claude role deactivate'
alias crl='claude role list'
alias crs='claude role show'
alias cc='claude config'
```

Usage:
```bash
cra frontend-developer
crl --domain development
crs frontend-developer
```

---

## Quick Reference

### Most Common Commands

```bash
claude role list                           # Browse roles
claude role show <role-id>                 # View role details
claude role activate <role-id>             # Activate role
claude role deactivate <role-id>           # Deactivate role
claude config roles                        # Check active roles
claude config export > backup.json         # Backup configuration
claude config import backup.json           # Restore configuration
```

### Common Workflows

```bash
# Start fresh
claude role deactivate --all
claude role activate <role-id>

# Switch contexts
claude role deactivate <old-role>
claude role activate <new-role>

# Multi-role project
claude role activate <role1> <role2> <role3>

# Custom role workflow
claude role create <id> --interactive
claude role validate ~/.config/claude-code/custom-roles/<id>.json
claude role activate <id>
```

---

For more information, see:
- [README.md](./README.md) - Overview and getting started
- [DESIGN.md](./DESIGN.md) - Technical design details
- [SPECIFICATION.md](../../SPECIFICATION.md) - Complete framework specification
