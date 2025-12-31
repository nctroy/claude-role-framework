# Role Manager CLI

A command-line interface tool for managing Claude roles, domains, and configurations in the Claude Role Framework.

## Overview

The Role Manager CLI provides a comprehensive set of commands for discovering, activating, and managing roles within the Claude Code ecosystem. It enables users to organize their Claude Skills and MCP servers into logical job-function-based roles, making AI assistance more intuitive and contextual.

## Installation

```bash
# Install globally (recommended)
npm install -g @claude/role-manager

# Or install locally in project
npm install --save-dev @claude/role-manager
```

## Quick Start

```bash
# List all available roles
claude role list

# Show details about a specific role
claude role show frontend-developer

# Activate a role
claude role activate frontend-developer

# Check currently active roles
claude config roles

# Deactivate a role
claude role deactivate frontend-developer
```

## Core Concepts

### Domains
High-level organizational categories that group related roles (e.g., Development, HR, Security, Operations).

### Roles
Job functions or life roles that bundle Skills, MCPs, and contextual knowledge into coherent, activatable units (e.g., Frontend Developer, Security Analyst, Parent/Educator).

### Skills
Individual Claude capabilities that provide specific functionality.

### MCPs
Model Context Protocol servers that provide external tool integration.

## Command Categories

The CLI is organized into three main command categories:

### 1. Role Management (`claude role`)
Commands for discovering, activating, and managing individual roles.

### 2. Domain Management (`claude domain`)
Commands for exploring and understanding available domains.

### 3. Configuration Management (`claude config`)
Commands for managing user configuration, imports, and exports.

## Features

- **Role Discovery**: Browse and search available roles across all domains
- **Role Activation**: Enable roles to access their bundled Skills and MCPs
- **Multi-Role Support**: Activate multiple roles simultaneously for composite capabilities
- **Custom Roles**: Create and manage custom role definitions
- **Role Validation**: Validate role definitions against schema
- **Configuration Export/Import**: Share and sync role configurations across machines
- **Backward Compatibility**: Works seamlessly with existing Claude Code configurations

## Configuration Files

The Role Manager uses the following configuration structure:

```
~/.config/claude-code/
├── roles.json                  # User's active roles and preferences
├── custom-roles/               # User-defined custom roles
│   └── my-custom-role.json
└── domains/                    # Official domain definitions
    ├── development.json
    ├── hr.json
    ├── security.json
    └── ...
```

## Project-Specific Roles

You can also define project-specific roles:

```
.claude/
└── roles/
    └── project-role.json
```

Project roles are automatically discovered when running commands within the project directory.

## Examples

### Activate a Development Role

```bash
# Activate the frontend developer role
claude role activate frontend-developer

# Now all frontend development skills are available
# (canvas-design, web-artifacts-builder, frontend-design, webapp-testing)
```

### Combine Multiple Roles

```bash
# Activate both frontend developer and security analyst roles
claude role activate frontend-developer
claude role activate security-analyst

# Now you have capabilities from both roles
```

### Create a Custom Role

```bash
# Create a new custom role
claude role create my-secure-frontend-dev

# Edit the role definition
claude role edit my-secure-frontend-dev

# Activate your custom role
claude role activate my-secure-frontend-dev
```

### Export and Share Configuration

```bash
# Export your current configuration
claude config export > my-roles-config.json

# On another machine, import the configuration
claude config import my-roles-config.json
```

### Validate a Role Definition

```bash
# Validate a role file before using it
claude role validate ./custom-roles/my-role.json
```

## Role Composition

Roles can inherit from other roles using the `extends` property in their definition:

```json
{
  "id": "full-stack-developer",
  "name": "Full Stack Developer",
  "domain": "development",
  "extends": ["frontend-developer", "backend-developer"],
  "skills": ["system-architecture"],
  "mcps": []
}
```

## Session vs Persistent Activation

By default, role activations are persistent (saved to configuration):

```bash
# Persistent activation (default)
claude role activate data-analyst

# Session-only activation (not saved)
claude role activate --session-only security-analyst
```

## Advanced Usage

### Search Roles by Tag

```bash
# List roles with specific tags
claude role list --tag javascript --tag react
```

### Filter by Domain

```bash
# List only development roles
claude role list --domain development
```

### Show Inherited Capabilities

```bash
# Show full resolved capabilities including inherited
claude role show full-stack-developer --resolve-inheritance
```

### Dry Run Activation

```bash
# Preview what would be activated without actually activating
claude role activate frontend-developer --dry-run
```

## Troubleshooting

### Role Not Found

If a role cannot be found, verify it exists:

```bash
claude role list
```

### Validation Errors

If validation fails, check the error message and compare against the schema:

```bash
claude role validate my-role.json --verbose
```

### Conflicting Roles

When multiple roles provide conflicting configurations, use conflict resolution:

```bash
# Set conflict resolution strategy
claude config set conflictResolution merge  # merge, priority, or explicit
```

## Development

For development and contribution information, see [DESIGN.md](./DESIGN.md).

## Documentation

- [CLI Commands Reference](./CLI-COMMANDS.md) - Detailed command documentation
- [Design Document](./DESIGN.md) - Technical architecture and design
- [Specification](../../SPECIFICATION.md) - Complete framework specification

## Support

For issues, questions, or contributions:

1. Check the [CLI Commands Reference](./CLI-COMMANDS.md)
2. Review the [Design Document](./DESIGN.md)
3. Consult the [Specification](../../SPECIFICATION.md)
4. Open an issue in the project repository

## License

MIT License - See LICENSE file for details
