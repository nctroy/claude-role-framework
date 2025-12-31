# Implementation Guide

## Overview

This guide provides comprehensive implementation guidance for developers building with or extending the Claude Role Framework. It covers schema definitions, validation, CLI development, integration strategies, testing approaches, and deployment considerations.

This documentation is intended for:
- Developers implementing the framework in Claude Code
- Contributors creating new roles and domains
- Tool builders extending the framework
- Integration engineers connecting the framework to existing systems

## Prerequisites

Before implementing the framework, ensure familiarity with:
- JSON and JSON Schema
- Claude Skills system
- Model Context Protocol (MCP)
- Command-line interface development
- Node.js or Python (depending on implementation language)

## Implementation Phases

The framework implementation follows a phased approach for manageable development and iterative feedback.

### Phase 1: Core Framework (Weeks 1-2)

**Objectives**:
- Establish data structures and schemas
- Implement validation logic
- Build basic CLI commands
- Create reference domain and role definitions

**Deliverables**:
1. JSON Schema definitions for Domain, Role, and Configuration
2. Schema validation utilities
3. CLI commands: `list`, `show`, `activate`, `deactivate`
4. 5 reference domain definitions with 3-5 roles each
5. Unit tests for validation and core logic

**Technical Stack**:
- JSON Schema validation library (e.g., Ajv for JavaScript, jsonschema for Python)
- CLI framework (Commander.js, Click, or similar)
- File system utilities for configuration management
- YAML/JSON parsing libraries

### Phase 2: Integration (Weeks 3-4)

**Objectives**:
- Integrate with Claude Code
- Implement role activation and context injection
- Add session management
- Create comprehensive role library

**Deliverables**:
1. Claude Code integration hooks
2. System prompt modification for context injection
3. Skill and MCP loading coordination
4. Session state management
5. 15-20 example role definitions across domains
6. Integration tests

**Technical Requirements**:
- Claude Code plugin API access
- System prompt injection mechanism
- Skill loading coordination
- MCP server management
- Persistent and session-scoped state management

### Phase 3: Advanced Features (Weeks 5-8)

**Objectives**:
- Implement inheritance and composition
- Add custom role creation
- Build role validation and testing tools
- Create migration utilities

**Deliverables**:
1. Role inheritance resolution engine
2. Conflict resolution strategies
3. Interactive role builder
4. Role testing framework
5. Migration tools for existing configurations
6. Performance optimizations

**Technical Requirements**:
- Graph traversal for inheritance resolution
- Conflict detection and resolution algorithms
- Interactive CLI prompts
- Configuration migration logic
- Performance profiling and optimization

## Schema Implementation

### Domain Schema Definition

Create `schemas/domain.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://claudecode.com/schemas/domain.schema.json",
  "title": "Claude Role Framework Domain",
  "description": "Schema for domain definitions in the Claude Role Framework",
  "type": "object",
  "required": ["id", "name", "description", "version", "roles"],
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$",
      "description": "Unique domain identifier in kebab-case",
      "examples": ["development", "home-family", "security"]
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Human-readable domain name",
      "examples": ["Development", "Home & Family", "Security"]
    },
    "description": {
      "type": "string",
      "minLength": 10,
      "maxLength": 500,
      "description": "Brief description of the domain's purpose and scope"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version of the domain definition",
      "examples": ["1.0.0", "2.1.3"]
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9-]*$"
      },
      "minItems": 1,
      "uniqueItems": true,
      "description": "List of role IDs contained in this domain"
    },
    "metadata": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string",
            "minLength": 1
          },
          "uniqueItems": true,
          "description": "Tags for search and categorization"
        },
        "icon": {
          "type": "string",
          "description": "Icon identifier for UI display"
        },
        "color": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$",
          "description": "Hex color code for UI theming"
        },
        "deprecated": {
          "type": "boolean",
          "description": "Whether this domain is deprecated"
        },
        "replacedBy": {
          "type": "string",
          "description": "Domain ID that replaces this deprecated domain"
        }
      }
    }
  }
}
```

### Role Schema Definition

Create `schemas/role.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://claudecode.com/schemas/role.schema.json",
  "title": "Claude Role Framework Role",
  "description": "Schema for role definitions in the Claude Role Framework",
  "type": "object",
  "required": ["id", "name", "domain", "description", "version", "skills", "mcps"],
  "additionalProperties": false,
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$",
      "description": "Unique role identifier in kebab-case"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "description": "Human-readable role name"
    },
    "domain": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$",
      "description": "Parent domain ID"
    },
    "description": {
      "type": "string",
      "minLength": 10,
      "maxLength": 1000,
      "description": "Detailed description of the role's purpose and capabilities"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version of the role definition"
    },
    "skills": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "uniqueItems": true,
      "description": "List of skill IDs included in this role"
    },
    "mcps": {
      "type": "array",
      "items": {
        "type": "string",
        "minLength": 1
      },
      "uniqueItems": true,
      "description": "List of MCP server IDs included in this role"
    },
    "context": {
      "type": "object",
      "description": "Domain-specific contextual knowledge and configuration"
    },
    "inheritance": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "extends": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[a-z][a-z0-9-]*$"
          },
          "uniqueItems": true,
          "description": "Parent role IDs to inherit from"
        },
        "overrides": {
          "type": "object",
          "properties": {
            "skills": {
              "type": "object",
              "properties": {
                "remove": {
                  "type": "array",
                  "items": {"type": "string"}
                },
                "add": {
                  "type": "array",
                  "items": {"type": "string"}
                }
              }
            },
            "mcps": {
              "type": "object",
              "properties": {
                "remove": {
                  "type": "array",
                  "items": {"type": "string"}
                },
                "add": {
                  "type": "array",
                  "items": {"type": "string"}
                }
              }
            }
          }
        }
      }
    },
    "metadata": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "tags": {
          "type": "array",
          "items": {"type": "string"},
          "uniqueItems": true
        },
        "difficulty": {
          "type": "string",
          "enum": ["beginner", "intermediate", "advanced", "expert"]
        },
        "icon": {
          "type": "string"
        },
        "color": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        },
        "deprecated": {
          "type": "boolean"
        },
        "replacedBy": {
          "type": "string"
        }
      }
    }
  }
}
```

### Configuration Schema Definition

Create `schemas/config.schema.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://claudecode.com/schemas/config.schema.json",
  "title": "Claude Role Framework Configuration",
  "description": "User configuration for active roles and preferences",
  "type": "object",
  "required": ["version"],
  "additionalProperties": false,
  "properties": {
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Configuration schema version"
    },
    "activeRoles": {
      "type": "array",
      "items": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9-]*$"
      },
      "uniqueItems": true,
      "description": "List of currently active role IDs"
    },
    "customRoles": {
      "type": "array",
      "items": {
        "$ref": "role.schema.json"
      },
      "description": "User-defined custom role definitions"
    },
    "preferences": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "autoActivate": {
          "type": "boolean",
          "default": true,
          "description": "Automatically activate roles from configuration on startup"
        },
        "conflictResolution": {
          "type": "string",
          "enum": ["merge", "priority", "explicit"],
          "default": "merge",
          "description": "Strategy for resolving conflicts when multiple roles are active"
        },
        "skillPriority": {
          "type": "string",
          "enum": ["role-defined", "user-defined"],
          "default": "role-defined",
          "description": "Whether to prefer role-defined or user-defined skill configurations"
        },
        "rolePriority": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Priority order for roles when using priority conflict resolution"
        }
      }
    }
  }
}
```

## Validation Implementation

### JavaScript/TypeScript Implementation

```javascript
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const domainSchema = require('./schemas/domain.schema.json');
const roleSchema = require('./schemas/role.schema.json');
const configSchema = require('./schemas/config.schema.json');

class RoleValidator {
  constructor() {
    this.validateDomain = ajv.compile(domainSchema);
    this.validateRole = ajv.compile(roleSchema);
    this.validateConfig = ajv.compile(configSchema);
  }

  /**
   * Validate a domain definition
   * @param {Object} domain - Domain definition object
   * @returns {Object} Validation result with { valid, errors }
   */
  validateDomainDefinition(domain) {
    const valid = this.validateDomain(domain);
    return {
      valid,
      errors: this.validateDomain.errors || []
    };
  }

  /**
   * Validate a role definition
   * @param {Object} role - Role definition object
   * @returns {Object} Validation result with { valid, errors }
   */
  validateRoleDefinition(role) {
    const valid = this.validateRole(role);
    return {
      valid,
      errors: this.validateRole.errors || []
    };
  }

  /**
   * Validate configuration file
   * @param {Object} config - Configuration object
   * @returns {Object} Validation result with { valid, errors }
   */
  validateConfiguration(config) {
    const valid = this.validateConfig(config);
    return {
      valid,
      errors: this.validateConfig.errors || []
    };
  }

  /**
   * Validate role references (skills, MCPs, parent roles exist)
   * @param {Object} role - Role definition
   * @param {Object} registry - Registry of available skills, MCPs, roles
   * @returns {Object} Validation result
   */
  validateReferences(role, registry) {
    const errors = [];

    // Check skills exist
    for (const skillId of role.skills) {
      if (!registry.skills.has(skillId)) {
        errors.push({
          message: `Skill '${skillId}' not found`,
          path: `skills/${skillId}`
        });
      }
    }

    // Check MCPs exist
    for (const mcpId of role.mcps) {
      if (!registry.mcps.has(mcpId)) {
        errors.push({
          message: `MCP '${mcpId}' not found`,
          path: `mcps/${mcpId}`
        });
      }
    }

    // Check parent roles exist
    if (role.inheritance?.extends) {
      for (const parentId of role.inheritance.extends) {
        if (!registry.roles.has(parentId)) {
          errors.push({
            message: `Parent role '${parentId}' not found`,
            path: `inheritance/extends/${parentId}`
          });
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Detect circular dependencies in role inheritance
   * @param {Object} role - Role definition
   * @param {Map} roleRegistry - Map of all role definitions
   * @returns {Object} Validation result
   */
  detectCircularDependencies(role, roleRegistry) {
    const visited = new Set();
    const recursionStack = new Set();

    const hasCycle = (roleId) => {
      if (!roleRegistry.has(roleId)) return false;

      visited.add(roleId);
      recursionStack.add(roleId);

      const currentRole = roleRegistry.get(roleId);
      const parents = currentRole.inheritance?.extends || [];

      for (const parentId of parents) {
        if (!visited.has(parentId)) {
          if (hasCycle(parentId)) return true;
        } else if (recursionStack.has(parentId)) {
          return true;
        }
      }

      recursionStack.delete(roleId);
      return false;
    };

    const hasCircular = hasCycle(role.id);

    return {
      valid: !hasCircular,
      errors: hasCircular ? [{
        message: `Circular dependency detected in inheritance chain for role '${role.id}'`,
        path: 'inheritance/extends'
      }] : []
    };
  }
}

module.exports = RoleValidator;
```

### Python Implementation

```python
import jsonschema
from typing import Dict, List, Set, Any
from pathlib import Path
import json

class RoleValidator:
    def __init__(self, schema_dir: Path):
        """Initialize validator with schema definitions"""
        self.schema_dir = schema_dir

        with open(schema_dir / 'domain.schema.json') as f:
            self.domain_schema = json.load(f)

        with open(schema_dir / 'role.schema.json') as f:
            self.role_schema = json.load(f)

        with open(schema_dir / 'config.schema.json') as f:
            self.config_schema = json.load(f)

    def validate_domain_definition(self, domain: Dict[str, Any]) -> Dict[str, Any]:
        """Validate a domain definition"""
        try:
            jsonschema.validate(instance=domain, schema=self.domain_schema)
            return {'valid': True, 'errors': []}
        except jsonschema.ValidationError as e:
            return {'valid': False, 'errors': [str(e)]}

    def validate_role_definition(self, role: Dict[str, Any]) -> Dict[str, Any]:
        """Validate a role definition"""
        try:
            jsonschema.validate(instance=role, schema=self.role_schema)
            return {'valid': True, 'errors': []}
        except jsonschema.ValidationError as e:
            return {'valid': False, 'errors': [str(e)]}

    def validate_configuration(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Validate configuration file"""
        try:
            jsonschema.validate(instance=config, schema=self.config_schema)
            return {'valid': True, 'errors': []}
        except jsonschema.ValidationError as e:
            return {'valid': False, 'errors': [str(e)]}

    def validate_references(
        self,
        role: Dict[str, Any],
        skills: Set[str],
        mcps: Set[str],
        roles: Set[str]
    ) -> Dict[str, Any]:
        """Validate that all referenced skills, MCPs, and roles exist"""
        errors = []

        # Check skills
        for skill_id in role.get('skills', []):
            if skill_id not in skills:
                errors.append({
                    'message': f"Skill '{skill_id}' not found",
                    'path': f"skills/{skill_id}"
                })

        # Check MCPs
        for mcp_id in role.get('mcps', []):
            if mcp_id not in mcps:
                errors.append({
                    'message': f"MCP '{mcp_id}' not found",
                    'path': f"mcps/{mcp_id}"
                })

        # Check parent roles
        extends = role.get('inheritance', {}).get('extends', [])
        for parent_id in extends:
            if parent_id not in roles:
                errors.append({
                    'message': f"Parent role '{parent_id}' not found",
                    'path': f"inheritance/extends/{parent_id}"
                })

        return {'valid': len(errors) == 0, 'errors': errors}

    def detect_circular_dependencies(
        self,
        role: Dict[str, Any],
        role_registry: Dict[str, Dict[str, Any]]
    ) -> Dict[str, Any]:
        """Detect circular dependencies in role inheritance"""
        visited = set()
        recursion_stack = set()

        def has_cycle(role_id: str) -> bool:
            if role_id not in role_registry:
                return False

            visited.add(role_id)
            recursion_stack.add(role_id)

            current_role = role_registry[role_id]
            parents = current_role.get('inheritance', {}).get('extends', [])

            for parent_id in parents:
                if parent_id not in visited:
                    if has_cycle(parent_id):
                        return True
                elif parent_id in recursion_stack:
                    return True

            recursion_stack.remove(role_id)
            return False

        has_circular = has_cycle(role['id'])

        errors = []
        if has_circular:
            errors.append({
                'message': f"Circular dependency detected in inheritance chain for role '{role['id']}'",
                'path': 'inheritance/extends'
            })

        return {'valid': not has_circular, 'errors': errors}
```

## Role Resolution Engine

The role resolution engine handles inheritance, composition, and conflict resolution.

### Inheritance Resolution Algorithm

```javascript
class RoleResolver {
  constructor(roleRegistry) {
    this.roleRegistry = roleRegistry;
  }

  /**
   * Resolve a role by applying inheritance and merging properties
   * @param {string} roleId - Role ID to resolve
   * @returns {Object} Fully resolved role definition
   */
  resolveRole(roleId) {
    const role = this.roleRegistry.get(roleId);
    if (!role) {
      throw new Error(`Role '${roleId}' not found`);
    }

    // If no inheritance, return as-is
    if (!role.inheritance?.extends || role.inheritance.extends.length === 0) {
      return this.cloneRole(role);
    }

    // Resolve parent roles first (depth-first)
    const parentRoles = role.inheritance.extends.map(parentId =>
      this.resolveRole(parentId)
    );

    // Merge parent roles
    const merged = this.mergeRoles(parentRoles);

    // Merge current role on top
    const resolved = this.mergeRoles([merged, role]);

    // Apply overrides
    if (role.inheritance.overrides) {
      this.applyOverrides(resolved, role.inheritance.overrides);
    }

    return resolved;
  }

  /**
   * Merge multiple roles into one
   * @param {Array} roles - Array of role definitions
   * @returns {Object} Merged role definition
   */
  mergeRoles(roles) {
    const merged = {
      skills: new Set(),
      mcps: new Set(),
      context: {}
    };

    for (const role of roles) {
      // Merge skills
      for (const skill of role.skills || []) {
        merged.skills.add(skill);
      }

      // Merge MCPs
      for (const mcp of role.mcps || []) {
        merged.mcps.add(mcp);
      }

      // Merge context (deep merge)
      if (role.context) {
        this.deepMerge(merged.context, role.context);
      }
    }

    // Convert sets back to arrays
    merged.skills = Array.from(merged.skills);
    merged.mcps = Array.from(merged.mcps);

    return merged;
  }

  /**
   * Apply override rules to a resolved role
   * @param {Object} role - Resolved role
   * @param {Object} overrides - Override configuration
   */
  applyOverrides(role, overrides) {
    // Remove specified skills
    if (overrides.skills?.remove) {
      role.skills = role.skills.filter(
        skill => !overrides.skills.remove.includes(skill)
      );
    }

    // Add specified skills
    if (overrides.skills?.add) {
      for (const skill of overrides.skills.add) {
        if (!role.skills.includes(skill)) {
          role.skills.push(skill);
        }
      }
    }

    // Remove specified MCPs
    if (overrides.mcps?.remove) {
      role.mcps = role.mcps.filter(
        mcp => !overrides.mcps.remove.includes(mcp)
      );
    }

    // Add specified MCPs
    if (overrides.mcps?.add) {
      for (const mcp of overrides.mcps.add) {
        if (!role.mcps.includes(mcp)) {
          role.mcps.push(mcp);
        }
      }
    }
  }

  /**
   * Deep merge objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   */
  deepMerge(target, source) {
    for (const key in source) {
      if (source[key] instanceof Object && key in target) {
        this.deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  /**
   * Clone a role definition
   * @param {Object} role - Role to clone
   * @returns {Object} Cloned role
   */
  cloneRole(role) {
    return JSON.parse(JSON.stringify(role));
  }
}
```

## CLI Implementation

### Command Structure

```javascript
const { Command } = require('commander');
const program = new Command();

program
  .name('claude-role')
  .description('Claude Role Framework CLI')
  .version('1.0.0');

// List commands
program
  .command('list')
  .description('List available roles')
  .option('-d, --domain <domain>', 'Filter by domain')
  .option('-t, --tags <tags...>', 'Filter by tags')
  .option('--difficulty <level>', 'Filter by difficulty level')
  .action(async (options) => {
    const roleManager = new RoleManager();
    const roles = await roleManager.listRoles(options);
    displayRoleList(roles);
  });

// Show command
program
  .command('show <role-id>')
  .description('Show detailed information about a role')
  .option('--resolve', 'Show resolved role (with inheritance applied)')
  .action(async (roleId, options) => {
    const roleManager = new RoleManager();
    const role = await roleManager.getRole(roleId, options.resolve);
    displayRoleDetails(role);
  });

// Activate command
program
  .command('activate <role-expression>')
  .description('Activate one or more roles')
  .option('-p, --persistent', 'Save activation to configuration')
  .option('--project', 'Activate for current project only')
  .action(async (roleExpression, options) => {
    const roleManager = new RoleManager();
    await roleManager.activateRoles(roleExpression, options);
    console.log(`Activated: ${roleExpression}`);
  });

// Deactivate command
program
  .command('deactivate [role-id]')
  .description('Deactivate a role or all roles')
  .option('--all', 'Deactivate all roles')
  .action(async (roleId, options) => {
    const roleManager = new RoleManager();
    await roleManager.deactivateRoles(roleId, options);
  });

// Create command
program
  .command('create <role-id>')
  .description('Create a custom role')
  .option('--name <name>', 'Role display name')
  .option('--domain <domain>', 'Parent domain')
  .option('--extends <roles...>', 'Parent roles to extend')
  .option('--add-skill <skills...>', 'Skills to include')
  .option('--add-mcp <mcps...>', 'MCPs to include')
  .option('--interactive', 'Interactive role creation wizard')
  .action(async (roleId, options) => {
    const roleCreator = new RoleCreator();
    if (options.interactive) {
      await roleCreator.interactiveCreate(roleId);
    } else {
      await roleCreator.create(roleId, options);
    }
  });

// Validate command
program
  .command('validate <file>')
  .description('Validate a role or domain definition file')
  .action(async (file) => {
    const validator = new RoleValidator();
    const result = await validator.validateFile(file);
    displayValidationResult(result);
  });

program.parse();
```

## Context Injection

### System Prompt Modification

```javascript
class ContextInjector {
  /**
   * Generate system prompt injection for active roles
   * @param {Array} activeRoles - List of active role definitions
   * @returns {string} Context injection text
   */
  generateContextInjection(activeRoles) {
    if (activeRoles.length === 0) {
      return '';
    }

    const sections = [];

    // Role identification
    if (activeRoles.length === 1) {
      sections.push(`You are acting as a ${activeRoles[0].name}.`);
    } else {
      const roleNames = activeRoles.map(r => r.name).join(', ');
      sections.push(`You are acting in multiple roles: ${roleNames}.`);
    }

    sections.push(''); // Blank line

    // Aggregate responsibilities
    const allResponsibilities = this.aggregateResponsibilities(activeRoles);
    if (allResponsibilities.length > 0) {
      sections.push('Your primary responsibilities include:');
      allResponsibilities.forEach(resp => {
        sections.push(`- ${resp}`);
      });
      sections.push('');
    }

    // Aggregate tools and technologies
    const allLanguages = this.aggregateContextField(activeRoles, 'primaryLanguages');
    if (allLanguages.length > 0) {
      sections.push(`You work with these languages: ${allLanguages.join(', ')}`);
    }

    const allFrameworks = this.aggregateContextField(activeRoles, 'frameworks');
    if (allFrameworks.length > 0) {
      sections.push(`You use these frameworks: ${allFrameworks.join(', ')}`);
    }

    const allTools = this.aggregateContextField(activeRoles, 'tools');
    if (allTools.length > 0) {
      sections.push(`You use these tools: ${allTools.join(', ')}`);
    }

    // Available MCPs
    const allMcps = new Set();
    activeRoles.forEach(role => {
      role.mcps.forEach(mcp => allMcps.add(mcp));
    });
    if (allMcps.size > 0) {
      sections.push(`You have access to: ${Array.from(allMcps).join(', ')}`);
    }

    sections.push('');

    // Best practices
    const allBestPractices = this.aggregateContextField(activeRoles, 'bestPractices');
    if (allBestPractices.length > 0) {
      sections.push('Best practices you follow:');
      allBestPractices.forEach(practice => {
        sections.push(`- ${practice}`);
      });
    }

    return sections.join('\n');
  }

  /**
   * Aggregate responsibilities from multiple roles
   * @param {Array} roles - Active role definitions
   * @returns {Array} Aggregated responsibilities
   */
  aggregateResponsibilities(roles) {
    const responsibilities = new Set();
    roles.forEach(role => {
      const roleResponsibilities = role.context?.responsibilities || [];
      roleResponsibilities.forEach(resp => responsibilities.add(resp));
    });
    return Array.from(responsibilities);
  }

  /**
   * Aggregate a specific context field from multiple roles
   * @param {Array} roles - Active role definitions
   * @param {string} fieldName - Context field to aggregate
   * @returns {Array} Aggregated values
   */
  aggregateContextField(roles, fieldName) {
    const values = new Set();
    roles.forEach(role => {
      const fieldValues = role.context?.[fieldName] || [];
      if (Array.isArray(fieldValues)) {
        fieldValues.forEach(val => values.add(val));
      }
    });
    return Array.from(values);
  }
}
```

## Testing Strategy

### Unit Tests

```javascript
const { describe, it, expect } = require('@jest/globals');
const RoleValidator = require('./role-validator');
const RoleResolver = require('./role-resolver');

describe('RoleValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new RoleValidator();
  });

  it('should validate correct domain definition', () => {
    const domain = {
      id: 'test-domain',
      name: 'Test Domain',
      description: 'A test domain for unit testing',
      version: '1.0.0',
      roles: ['test-role']
    };

    const result = validator.validateDomainDefinition(domain);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject domain with invalid id format', () => {
    const domain = {
      id: 'Test-Domain',  // Should be kebab-case
      name: 'Test Domain',
      description: 'A test domain',
      version: '1.0.0',
      roles: ['test-role']
    };

    const result = validator.validateDomainDefinition(domain);
    expect(result.valid).toBe(false);
  });

  it('should detect circular dependencies', () => {
    const roleA = {
      id: 'role-a',
      inheritance: { extends: ['role-b'] }
    };

    const roleB = {
      id: 'role-b',
      inheritance: { extends: ['role-a'] }
    };

    const registry = new Map([
      ['role-a', roleA],
      ['role-b', roleB]
    ]);

    const result = validator.detectCircularDependencies(roleA, registry);
    expect(result.valid).toBe(false);
    expect(result.errors[0].message).toContain('Circular dependency');
  });
});

describe('RoleResolver', () => {
  let resolver;
  let registry;

  beforeEach(() => {
    const baseRole = {
      id: 'base',
      skills: ['skill-a', 'skill-b'],
      mcps: ['mcp-a'],
      context: { tools: ['tool-a'] }
    };

    const childRole = {
      id: 'child',
      inheritance: { extends: ['base'] },
      skills: ['skill-c'],
      mcps: ['mcp-b'],
      context: { tools: ['tool-b'] }
    };

    registry = new Map([
      ['base', baseRole],
      ['child', childRole]
    ]);

    resolver = new RoleResolver(registry);
  });

  it('should resolve role with inheritance', () => {
    const resolved = resolver.resolveRole('child');

    expect(resolved.skills).toContain('skill-a');
    expect(resolved.skills).toContain('skill-b');
    expect(resolved.skills).toContain('skill-c');
    expect(resolved.mcps).toContain('mcp-a');
    expect(resolved.mcps).toContain('mcp-b');
  });

  it('should apply overrides correctly', () => {
    const roleWithOverrides = {
      id: 'override-role',
      inheritance: {
        extends: ['base'],
        overrides: {
          skills: {
            remove: ['skill-a'],
            add: ['skill-d']
          }
        }
      }
    };

    registry.set('override-role', roleWithOverrides);

    const resolved = resolver.resolveRole('override-role');

    expect(resolved.skills).not.toContain('skill-a');
    expect(resolved.skills).toContain('skill-b');
    expect(resolved.skills).toContain('skill-d');
  });
});
```

### Integration Tests

```javascript
describe('Role Activation Integration', () => {
  it('should activate role and load skills', async () => {
    const roleManager = new RoleManager();

    await roleManager.activateRoles('frontend-developer');

    const activeRoles = roleManager.getActiveRoles();
    expect(activeRoles).toContain('frontend-developer');

    const availableSkills = roleManager.getAvailableSkills();
    expect(availableSkills).toContain('web-artifacts-builder');
    expect(availableSkills).toContain('frontend-design');
  });

  it('should merge multiple active roles', async () => {
    const roleManager = new RoleManager();

    await roleManager.activateRoles('frontend-developer + security-analyst');

    const availableSkills = roleManager.getAvailableSkills();
    expect(availableSkills).toContain('web-artifacts-builder');
    expect(availableSkills).toContain('security-scan');
  });
});
```

## Performance Optimization

### Lazy Loading Implementation

```javascript
class SkillLoader {
  constructor() {
    this.loadedSkills = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load a skill on-demand
   * @param {string} skillId - Skill identifier
   * @returns {Promise} Skill instance
   */
  async loadSkill(skillId) {
    // Return cached skill if already loaded
    if (this.loadedSkills.has(skillId)) {
      return this.loadedSkills.get(skillId);
    }

    // Return in-progress loading promise if loading
    if (this.loadingPromises.has(skillId)) {
      return this.loadingPromises.get(skillId);
    }

    // Start loading
    const loadingPromise = this._loadSkillImplementation(skillId);
    this.loadingPromises.set(skillId, loadingPromise);

    try {
      const skill = await loadingPromise;
      this.loadedSkills.set(skillId, skill);
      return skill;
    } finally {
      this.loadingPromises.delete(skillId);
    }
  }

  /**
   * Internal method to load skill implementation
   * @private
   */
  async _loadSkillImplementation(skillId) {
    // Implementation-specific loading logic
    // This would integrate with Claude Code's skill system
    const skillModule = await import(`./skills/${skillId}`);
    return new skillModule.default();
  }

  /**
   * Preload skills for performance
   * @param {Array} skillIds - Skills to preload
   */
  async preloadSkills(skillIds) {
    await Promise.all(skillIds.map(id => this.loadSkill(id)));
  }

  /**
   * Clear loaded skills (for memory management)
   */
  clearCache() {
    this.loadedSkills.clear();
  }
}
```

## Migration Utilities

### Configuration Migration Tool

```javascript
class ConfigurationMigrator {
  /**
   * Suggest roles based on current skill configuration
   * @param {Array} currentSkills - Currently configured skills
   * @param {Array} currentMcps - Currently configured MCPs
   * @returns {Array} Suggested role IDs with match scores
   */
  suggestRoles(currentSkills, currentMcps) {
    const allRoles = this.roleRegistry.getAllRoles();
    const suggestions = [];

    for (const role of allRoles) {
      const matchScore = this.calculateMatchScore(
        currentSkills,
        currentMcps,
        role
      );

      if (matchScore > 0.5) {  // 50% match threshold
        suggestions.push({
          roleId: role.id,
          roleName: role.name,
          matchScore,
          matchedSkills: this.getMatchedItems(currentSkills, role.skills),
          matchedMcps: this.getMatchedItems(currentMcps, role.mcps)
        });
      }
    }

    // Sort by match score descending
    return suggestions.sort((a, b) => b.matchScore - a.matchScore);
  }

  /**
   * Calculate match score between current config and role
   * @private
   */
  calculateMatchScore(currentSkills, currentMcps, role) {
    const skillMatches = this.countMatches(currentSkills, role.skills);
    const mcpMatches = this.countMatches(currentMcps, role.mcps);

    const totalCurrent = currentSkills.length + currentMcps.length;
    const totalMatched = skillMatches + mcpMatches;

    return totalCurrent > 0 ? totalMatched / totalCurrent : 0;
  }

  /**
   * Migrate current configuration to role-based configuration
   * @param {Object} currentConfig - Current configuration
   * @returns {Object} Role-based configuration
   */
  migrate(currentConfig) {
    const suggestions = this.suggestRoles(
      currentConfig.skills || [],
      currentConfig.mcps || []
    );

    if (suggestions.length === 0) {
      throw new Error('No matching roles found for current configuration');
    }

    const bestMatch = suggestions[0];
    const role = this.roleRegistry.getRole(bestMatch.roleId);

    // Find skills/MCPs in current config but not in matched role
    const additionalSkills = currentConfig.skills.filter(
      skill => !role.skills.includes(skill)
    );
    const additionalMcps = currentConfig.mcps.filter(
      mcp => !role.mcps.includes(mcp)
    );

    return {
      version: '1.0.0',
      activeRoles: [bestMatch.roleId],
      additionalSkills,
      additionalMcps,
      migrationMetadata: {
        migratedFrom: 'legacy-config',
        migrationDate: new Date().toISOString(),
        matchScore: bestMatch.matchScore
      }
    };
  }
}
```

## Deployment Considerations

### File Structure

```
~/.config/claude-code/
├── roles.json                    # User configuration
├── custom-roles/                 # User-defined custom roles
│   ├── my-role-1.json
│   └── my-role-2.json
├── domains/                      # Official domain definitions
│   ├── development.json
│   ├── hr.json
│   ├── security.json
│   ├── operations.json
│   └── finance.json
└── cache/
    ├── resolved-roles/           # Cached resolved roles
    └── loaded-skills/            # Skill loading cache
```

### Environment-Specific Configuration

```javascript
class ConfigurationManager {
  constructor() {
    this.configDir = this.getConfigDirectory();
  }

  /**
   * Get configuration directory based on environment
   * @returns {string} Configuration directory path
   */
  getConfigDirectory() {
    if (process.env.CLAUDE_CONFIG_DIR) {
      return process.env.CLAUDE_CONFIG_DIR;
    }

    const platform = process.platform;
    const home = process.env.HOME || process.env.USERPROFILE;

    switch (platform) {
      case 'darwin':  // macOS
        return path.join(home, '.config', 'claude-code');
      case 'win32':   // Windows
        return path.join(process.env.APPDATA, 'ClaudeCode');
      case 'linux':   // Linux
        return path.join(home, '.config', 'claude-code');
      default:
        return path.join(home, '.claude-code');
    }
  }

  /**
   * Get project-specific configuration if available
   * @param {string} projectDir - Project directory path
   * @returns {Object|null} Project configuration or null
   */
  getProjectConfiguration(projectDir) {
    const projectConfigPath = path.join(projectDir, '.claude', 'roles.json');

    if (fs.existsSync(projectConfigPath)) {
      return JSON.parse(fs.readFileSync(projectConfigPath, 'utf8'));
    }

    return null;
  }

  /**
   * Merge global and project configurations
   * @param {Object} globalConfig - Global configuration
   * @param {Object} projectConfig - Project configuration
   * @returns {Object} Merged configuration
   */
  mergeConfigurations(globalConfig, projectConfig) {
    return {
      version: projectConfig?.version || globalConfig?.version,
      activeRoles: [
        ...(globalConfig?.activeRoles || []),
        ...(projectConfig?.activeRoles || [])
      ],
      preferences: {
        ...(globalConfig?.preferences || {}),
        ...(projectConfig?.preferences || {})
      }
    };
  }
}
```

## Best Practices for Implementers

### Error Handling

- Provide clear, actionable error messages
- Validate early and often
- Gracefully handle missing roles or skills
- Log errors for debugging but don't crash

### Performance

- Use lazy loading for skills and MCPs
- Cache resolved roles
- Minimize file system reads
- Optimize role resolution algorithm

### User Experience

- Provide helpful CLI feedback
- Use progress indicators for long operations
- Offer interactive wizards for complex tasks
- Include examples in help text

### Security

- Validate all user input
- Sandbox custom roles from untrusted sources
- Never execute arbitrary code from role definitions
- Audit role changes in enterprise environments

### Documentation

- Keep inline code comments up to date
- Generate API documentation from code
- Provide migration guides for breaking changes
- Include troubleshooting guides

## Summary

This implementation guide provides:

- Complete schema definitions with validation
- Role resolution and inheritance algorithms
- CLI command structure and implementation
- Context injection mechanisms
- Testing strategies and examples
- Performance optimization techniques
- Migration utilities
- Deployment considerations
- Best practices for implementers

With these implementations, you can build a robust, performant, and user-friendly Claude Role Framework integration.

For real-world examples, refer to:
- [Introduction](01-introduction.md) for user-facing concepts
- [Core Concepts](02-core-concepts.md) for architectural details
- [Use Cases](03-use-cases.md) for practical applications
