# Role Manager CLI - Technical Design Document

**Version:** 1.0.0-draft
**Last Updated:** 2025-12-30

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Core Components](#core-components)
4. [Command Processing Flow](#command-processing-flow)
5. [Data Management](#data-management)
6. [Role Resolution Engine](#role-resolution-engine)
7. [Configuration System](#configuration-system)
8. [Validation System](#validation-system)
9. [Plugin Architecture](#plugin-architecture)
10. [Error Handling](#error-handling)
11. [Performance Considerations](#performance-considerations)
12. [Testing Strategy](#testing-strategy)
13. [Future Extensibility](#future-extensibility)

---

## Architecture Overview

### Design Principles

The Role Manager CLI is designed following these principles:

1. **Separation of Concerns**: Command handling, business logic, and data access are clearly separated
2. **Composability**: Small, focused modules that can be composed for complex operations
3. **Testability**: Every component is designed for unit and integration testing
4. **Extensibility**: Plugin architecture allows third-party extensions
5. **Performance**: Lazy loading and caching minimize resource usage
6. **User Experience**: Clear error messages, helpful suggestions, and intuitive commands

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLI Entry Point                       │
│                  (bin/claude-role)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│               Command Router                             │
│           (lib/commands/index.js)                        │
└─┬───────────────┬───────────────────┬───────────────────┘
  │               │                   │
  ▼               ▼                   ▼
┌──────────┐  ┌──────────┐      ┌──────────┐
│  Role    │  │  Domain  │      │  Config  │
│ Commands │  │ Commands │      │ Commands │
└────┬─────┘  └────┬─────┘      └────┬─────┘
     │             │                  │
     └─────────────┴──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  Core Services                           │
├─────────────┬──────────────┬──────────────┬─────────────┤
│   Role      │  Domain      │ Config       │ Validation  │
│  Resolver   │  Manager     │ Manager      │ Service     │
└─────────────┴──────────────┴──────────────┴─────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                 Data Access Layer                        │
├─────────────┬──────────────┬──────────────┬─────────────┤
│  Role       │  Domain      │ Config       │  Schema     │
│  Repository │  Repository  │ Repository   │  Repository │
└─────────────┴──────────────┴──────────────┴─────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  File System                             │
│  ~/.config/claude-code/                                  │
│  .claude/                                                │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Technologies

**Language:** Node.js (v18+)
- Wide adoption in CLI tooling
- Excellent JSON handling
- Rich ecosystem for CLI development

**CLI Framework:** Commander.js
- Mature and well-documented
- Supports subcommands naturally
- Easy to extend

**Validation:** Ajv (Another JSON Schema Validator)
- Fast JSON Schema validation
- Comprehensive error reporting
- Supports JSON Schema Draft-07

**Configuration:** Cosmiconfig
- Flexible configuration discovery
- Supports multiple formats (JSON, YAML, JS)
- Industry standard for CLI tools

### Development Dependencies

**Testing:**
- Jest: Unit and integration testing
- Supertest: CLI command testing
- Mock-fs: File system mocking

**Code Quality:**
- ESLint: Linting
- Prettier: Code formatting
- Husky: Git hooks

**Documentation:**
- JSDoc: Inline documentation
- TypeDoc: API documentation generation

---

## Core Components

### 1. Command Layer

**Location:** `lib/commands/`

Handles user input and command execution.

```javascript
// lib/commands/role.js
class RoleCommands {
  constructor(roleService, configService, outputFormatter) {
    this.roleService = roleService;
    this.configService = configService;
    this.output = outputFormatter;
  }

  async list(options) {
    // Command implementation
  }

  async activate(roleId, options) {
    // Command implementation
  }

  async deactivate(roleId, options) {
    // Command implementation
  }

  async show(roleId, options) {
    // Command implementation
  }

  async create(roleId, options) {
    // Command implementation
  }

  async edit(roleId, options) {
    // Command implementation
  }

  async validate(filePath, options) {
    // Command implementation
  }
}
```

### 2. Service Layer

**Location:** `lib/services/`

Implements business logic and orchestrates operations.

```javascript
// lib/services/RoleService.js
class RoleService {
  constructor(roleRepository, domainRepository, configRepository, validator) {
    this.roleRepo = roleRepository;
    this.domainRepo = domainRepository;
    this.configRepo = configRepository;
    this.validator = validator;
    this.cache = new Map();
  }

  async getAllRoles(filters = {}) {
    // Get all available roles with optional filtering
  }

  async getRoleById(roleId) {
    // Get role definition by ID with caching
  }

  async activateRole(roleId, options = {}) {
    // Activate a role and update configuration
  }

  async deactivateRole(roleId) {
    // Deactivate a role and update configuration
  }

  async resolveRole(roleId) {
    // Resolve role with inheritance
  }

  async validateRole(roleDefinition) {
    // Validate role against schema
  }

  async createCustomRole(roleDefinition) {
    // Create a new custom role
  }
}
```

### 3. Repository Layer

**Location:** `lib/repositories/`

Handles data persistence and retrieval.

```javascript
// lib/repositories/RoleRepository.js
class RoleRepository {
  constructor(fileSystem, pathResolver) {
    this.fs = fileSystem;
    this.paths = pathResolver;
  }

  async findAll() {
    // Load all role definitions from file system
  }

  async findById(roleId) {
    // Load specific role definition
  }

  async save(roleDefinition) {
    // Save role definition to file system
  }

  async delete(roleId) {
    // Delete role definition
  }

  async exists(roleId) {
    // Check if role exists
  }
}
```

### 4. Role Resolver

**Location:** `lib/resolvers/RoleResolver.js`

Resolves role inheritance and composition.

```javascript
// lib/resolvers/RoleResolver.js
class RoleResolver {
  constructor(roleRepository) {
    this.roleRepo = roleRepository;
    this.resolveCache = new Map();
  }

  async resolve(roleId) {
    // Resolve role with all inherited properties
    // Returns fully-resolved role definition
  }

  async resolveMultiple(roleIds) {
    // Resolve multiple roles and merge them
  }

  detectCircularDependency(roleId, visited = new Set()) {
    // Detect circular inheritance
  }

  mergeRoles(roles, strategy = 'merge') {
    // Merge multiple role definitions
  }
}
```

### 5. Validation Service

**Location:** `lib/services/ValidationService.js`

Validates role and domain definitions.

```javascript
// lib/services/ValidationService.js
class ValidationService {
  constructor(schemaRepository) {
    this.schemas = schemaRepository;
    this.ajv = new Ajv({ allErrors: true });
  }

  validateRole(roleDefinition) {
    // Validate against role schema
  }

  validateDomain(domainDefinition) {
    // Validate against domain schema
  }

  validateConfig(configDefinition) {
    // Validate against config schema
  }

  formatValidationErrors(errors) {
    // Format Ajv errors for user-friendly display
  }
}
```

---

## Command Processing Flow

### Example: `claude role activate frontend-developer`

```
1. CLI Entry Point (bin/claude-role)
   │
   ▼
2. Command Router
   │ Parses: command = 'role', subcommand = 'activate', args = ['frontend-developer']
   ▼
3. RoleCommands.activate('frontend-developer')
   │
   ▼
4. RoleService.activateRole('frontend-developer')
   │
   ├─► RoleRepository.findById('frontend-developer')
   │   │
   │   └─► Load from: ~/.config/claude-code/domains/development.json
   │
   ├─► RoleResolver.resolve('frontend-developer')
   │   │
   │   └─► Resolve inheritance, merge parent roles
   │
   ├─► ValidationService.validateRole(resolvedRole)
   │   │
   │   └─► Validate against schema
   │
   └─► ConfigRepository.updateActiveRoles(['frontend-developer'])
       │
       └─► Save to: ~/.config/claude-code/roles.json

5. Output Success Message
   │
   └─► "Activated role: Frontend Developer"
       "Skills: canvas-design, web-artifacts-builder, frontend-design, webapp-testing"
       "MCPs: github, npm-registry, figma, browser-devtools"
```

---

## Data Management

### File System Structure

```
~/.config/claude-code/
├── roles.json                      # User configuration
├── domains/                        # Official domain definitions
│   ├── development.json
│   ├── hr.json
│   ├── security.json
│   ├── operations.json
│   ├── finance.json
│   ├── marketing.json
│   ├── home-family.json
│   └── personal.json
└── custom-roles/                   # User-defined roles
    ├── my-custom-role.json
    └── team-role.json

.claude/                            # Project-specific (optional)
└── roles/
    └── project-role.json
```

### Configuration File Format

**roles.json:**

```json
{
  "version": "1.0.0",
  "activeRoles": [
    "frontend-developer"
  ],
  "customRoles": [],
  "preferences": {
    "autoActivate": true,
    "conflictResolution": "merge",
    "skillPriority": "role-defined"
  }
}
```

### Discovery Strategy

1. **Built-in Domains**: Load from `~/.config/claude-code/domains/`
2. **Custom Roles**: Load from `~/.config/claude-code/custom-roles/`
3. **Project Roles**: Load from `.claude/roles/` (if exists)
4. **Merge**: Combine all sources, with precedence: Project > Custom > Built-in

---

## Role Resolution Engine

### Inheritance Resolution Algorithm

```javascript
async function resolveRole(roleId, visited = new Set()) {
  // Prevent circular dependencies
  if (visited.has(roleId)) {
    throw new CircularDependencyError(roleId, Array.from(visited));
  }
  visited.add(roleId);

  // Load base role
  const role = await this.roleRepo.findById(roleId);
  if (!role) {
    throw new RoleNotFoundError(roleId);
  }

  // If no inheritance, return as-is
  if (!role.inheritance || !role.inheritance.extends) {
    return role;
  }

  // Resolve parent roles recursively
  const parentRoles = await Promise.all(
    role.inheritance.extends.map(parentId =>
      this.resolveRole(parentId, new Set(visited))
    )
  );

  // Merge parent roles
  let merged = this.mergeRoles(parentRoles);

  // Apply current role properties
  merged = this.applyRole(merged, role);

  // Apply overrides
  if (role.inheritance.overrides) {
    merged = this.applyOverrides(merged, role.inheritance.overrides);
  }

  return merged;
}
```

### Merge Strategy

**Default Strategy: Additive Merge**

```javascript
function mergeRoles(roles, strategy = 'merge') {
  const merged = {
    skills: new Set(),
    mcps: new Set(),
    context: {}
  };

  for (const role of roles) {
    // Add skills (deduplicated)
    role.skills.forEach(skill => merged.skills.add(skill));

    // Add MCPs (deduplicated)
    role.mcps.forEach(mcp => merged.mcps.add(mcp));

    // Merge context (deep merge)
    merged.context = deepMerge(merged.context, role.context);
  }

  return {
    ...merged,
    skills: Array.from(merged.skills),
    mcps: Array.from(merged.mcps)
  };
}
```

---

## Configuration System

### Configuration Discovery

Uses Cosmiconfig for flexible configuration:

```javascript
const { cosmiconfig } = require('cosmiconfig');

const explorer = cosmiconfig('claude-role', {
  searchPlaces: [
    'roles.json',
    '.claude/roles.json',
    'package.json'
  ]
});

async function loadConfig() {
  const result = await explorer.search();
  return result ? result.config : getDefaultConfig();
}
```

### Configuration Priority

1. Command-line flags (highest priority)
2. Project configuration (`.claude/roles.json`)
3. User configuration (`~/.config/claude-code/roles.json`)
4. Default configuration (lowest priority)

### Configuration Schema

Validated against JSON Schema (see SPECIFICATION.md Section 8.3).

---

## Validation System

### Schema Validation

Uses Ajv for JSON Schema validation:

```javascript
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, verbose: true });

// Load schemas
const roleSchema = require('../schemas/role.schema.json');
const domainSchema = require('../schemas/domain.schema.json');

// Compile validators
const validateRole = ajv.compile(roleSchema);
const validateDomain = ajv.compile(domainSchema);

// Validate
function validate(data, schema) {
  const valid = schema(data);
  if (!valid) {
    return {
      valid: false,
      errors: formatErrors(schema.errors)
    };
  }
  return { valid: true };
}
```

### Semantic Validation

Beyond schema validation, semantic checks:

1. **Reference Validation**: Ensure referenced Skills/MCPs exist
2. **Circular Dependency Detection**: Prevent circular inheritance
3. **Domain Existence**: Verify parent domain exists
4. **Version Compatibility**: Check version constraints

```javascript
async function validateRoleSemantic(role) {
  const errors = [];

  // Check domain exists
  const domainExists = await this.domainRepo.exists(role.domain);
  if (!domainExists) {
    errors.push(`Domain '${role.domain}' does not exist`);
  }

  // Check skills exist
  for (const skillId of role.skills) {
    const skillExists = await this.skillRepo.exists(skillId);
    if (!skillExists) {
      errors.push(`Skill '${skillId}' does not exist`);
    }
  }

  // Check for circular dependencies
  try {
    await this.resolver.detectCircularDependency(role.id);
  } catch (e) {
    errors.push(e.message);
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}
```

---

## Plugin Architecture

### Plugin Interface

Plugins can extend functionality:

```javascript
// Plugin interface
class RolePlugin {
  constructor(context) {
    this.context = context;
  }

  // Lifecycle hooks
  async onRoleActivate(roleId, resolvedRole) {
    // Called when role is activated
  }

  async onRoleDeactivate(roleId) {
    // Called when role is deactivated
  }

  async onRoleResolve(roleId, resolvedRole) {
    // Called after role resolution
    return resolvedRole; // Can modify resolved role
  }

  // Extension points
  async enhanceContext(roleId, context) {
    // Add custom context
    return enhancedContext;
  }

  async validateCustom(role) {
    // Custom validation logic
    return { valid: true };
  }
}
```

### Plugin Loading

```javascript
// Load plugins from configuration
async function loadPlugins(config) {
  const plugins = [];

  for (const pluginConfig of config.plugins || []) {
    const PluginClass = require(pluginConfig.path);
    const plugin = new PluginClass(pluginConfig.options);
    plugins.push(plugin);
  }

  return plugins;
}
```

---

## Error Handling

### Error Hierarchy

```javascript
class RoleManagerError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'RoleManagerError';
    this.code = code;
  }
}

class RoleNotFoundError extends RoleManagerError {
  constructor(roleId) {
    super(`Role '${roleId}' not found`, 'ROLE_NOT_FOUND');
    this.roleId = roleId;
  }
}

class ValidationError extends RoleManagerError {
  constructor(errors) {
    super('Validation failed', 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class CircularDependencyError extends RoleManagerError {
  constructor(roleId, chain) {
    super(
      `Circular dependency detected: ${chain.join(' -> ')} -> ${roleId}`,
      'CIRCULAR_DEPENDENCY'
    );
    this.chain = chain;
  }
}
```

### Error Handling Strategy

```javascript
async function executeCommand(command, args) {
  try {
    await command.execute(args);
  } catch (error) {
    if (error instanceof RoleNotFoundError) {
      console.error(`Error: Role '${error.roleId}' not found.`);
      console.log('\nAvailable roles:');
      await showAvailableRoles();
      process.exit(1);
    } else if (error instanceof ValidationError) {
      console.error('Validation failed:');
      error.errors.forEach(e => console.error(`  - ${e}`));
      process.exit(1);
    } else {
      console.error(`Unexpected error: ${error.message}`);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  }
}
```

---

## Performance Considerations

### Caching Strategy

**1. Role Definition Cache**
- Cache loaded role definitions in memory
- Invalidate on file system changes
- TTL: Session duration

**2. Resolution Cache**
- Cache resolved roles (with inheritance)
- Key: roleId + timestamp of dependencies
- Invalidate when dependencies change

**3. Schema Compilation Cache**
- Compile schemas once at startup
- Reuse compiled validators

### Lazy Loading

```javascript
class LazyRoleLoader {
  constructor(roleRepository) {
    this.repo = roleRepository;
    this.loaded = new Map();
  }

  async load(roleId) {
    if (this.loaded.has(roleId)) {
      return this.loaded.get(roleId);
    }

    const role = await this.repo.findById(roleId);
    this.loaded.set(roleId, role);
    return role;
  }
}
```

### Optimization Targets

- **Startup Time**: < 100ms for command initialization
- **Role Activation**: < 200ms for simple roles, < 500ms for complex inheritance
- **List Command**: < 150ms for displaying all roles
- **Memory Usage**: < 50MB for typical usage

---

## Testing Strategy

### Unit Tests

Test individual components in isolation:

```javascript
// tests/unit/services/RoleService.test.js
describe('RoleService', () => {
  let roleService;
  let mockRoleRepo;
  let mockValidator;

  beforeEach(() => {
    mockRoleRepo = {
      findById: jest.fn(),
      findAll: jest.fn()
    };
    mockValidator = {
      validateRole: jest.fn()
    };
    roleService = new RoleService(mockRoleRepo, mockValidator);
  });

  test('getRoleById returns role when found', async () => {
    const mockRole = { id: 'test-role', name: 'Test' };
    mockRoleRepo.findById.mockResolvedValue(mockRole);

    const result = await roleService.getRoleById('test-role');

    expect(result).toEqual(mockRole);
    expect(mockRoleRepo.findById).toHaveBeenCalledWith('test-role');
  });

  test('getRoleById throws when role not found', async () => {
    mockRoleRepo.findById.mockResolvedValue(null);

    await expect(roleService.getRoleById('nonexistent'))
      .rejects
      .toThrow(RoleNotFoundError);
  });
});
```

### Integration Tests

Test component interactions:

```javascript
// tests/integration/role-activation.test.js
describe('Role Activation Flow', () => {
  let roleService;
  let configService;

  beforeEach(async () => {
    // Setup test file system
    await setupTestFS();
    roleService = createRoleService();
    configService = createConfigService();
  });

  test('activating role updates configuration', async () => {
    await roleService.activateRole('frontend-developer');

    const config = await configService.loadConfig();
    expect(config.activeRoles).toContain('frontend-developer');
  });

  test('activating role with inheritance resolves correctly', async () => {
    const resolved = await roleService.resolveRole('full-stack-developer');

    expect(resolved.skills).toContain('canvas-design'); // from frontend
    expect(resolved.skills).toContain('database-design'); // from backend
  });
});
```

### End-to-End Tests

Test complete CLI workflows:

```javascript
// tests/e2e/cli.test.js
describe('CLI End-to-End', () => {
  test('role list command shows all roles', async () => {
    const output = await execCLI('role list');

    expect(output).toContain('Frontend Developer');
    expect(output).toContain('Backend Developer');
    expect(output).toContain('Security Analyst');
  });

  test('role activate and deactivate workflow', async () => {
    await execCLI('role activate frontend-developer');
    let config = await readConfig();
    expect(config.activeRoles).toContain('frontend-developer');

    await execCLI('role deactivate frontend-developer');
    config = await readConfig();
    expect(config.activeRoles).not.toContain('frontend-developer');
  });
});
```

### Test Coverage Targets

- Unit Tests: > 90% coverage
- Integration Tests: Critical paths covered
- E2E Tests: All user-facing commands

---

## Future Extensibility

### Planned Extensions

1. **Interactive Mode**: TUI for role management
2. **Role Suggestions**: AI-powered role recommendations
3. **Remote Registry**: Download community roles
4. **Team Sync**: Share roles across teams
5. **Analytics**: Track role usage and effectiveness

### Extension Points

1. **Custom Resolvers**: Implement custom inheritance strategies
2. **Custom Validators**: Add domain-specific validation
3. **Output Formatters**: Support JSON, YAML, table formats
4. **Storage Backends**: Support cloud storage, git repositories
5. **Authentication**: Role access control for teams

### Plugin System

Future plugin capabilities:

```javascript
// Example: Analytics Plugin
class AnalyticsPlugin extends RolePlugin {
  async onRoleActivate(roleId) {
    await this.trackEvent('role_activated', { roleId });
  }

  async generateReport() {
    return {
      mostUsedRoles: await this.getMostUsedRoles(),
      activationFrequency: await this.getActivationFrequency()
    };
  }
}
```

---

## Implementation Checklist

### Phase 1: Core Infrastructure
- [ ] Project setup and dependencies
- [ ] File system utilities
- [ ] Schema definitions
- [ ] Repository layer implementation
- [ ] Basic validation service

### Phase 2: Core Services
- [ ] Role service implementation
- [ ] Domain service implementation
- [ ] Configuration service implementation
- [ ] Role resolver implementation
- [ ] Inheritance resolution

### Phase 3: CLI Commands
- [ ] Role commands (list, show, activate, deactivate)
- [ ] Domain commands (list, show)
- [ ] Config commands (roles, export, import)
- [ ] Role creation and editing
- [ ] Validation command

### Phase 4: Advanced Features
- [ ] Plugin architecture
- [ ] Error handling and reporting
- [ ] Performance optimizations
- [ ] Caching implementation
- [ ] Output formatting

### Phase 5: Testing and Documentation
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Documentation
- [ ] Examples

---

## Dependencies

### Production Dependencies

```json
{
  "commander": "^11.0.0",
  "ajv": "^8.12.0",
  "cosmiconfig": "^8.3.0",
  "chalk": "^5.3.0",
  "ora": "^7.0.0",
  "inquirer": "^9.2.0",
  "table": "^6.8.0",
  "fs-extra": "^11.1.0",
  "fast-deep-equal": "^3.1.3",
  "semver": "^7.5.0"
}
```

### Development Dependencies

```json
{
  "jest": "^29.6.0",
  "eslint": "^8.47.0",
  "prettier": "^3.0.0",
  "husky": "^8.0.0",
  "lint-staged": "^14.0.0",
  "mock-fs": "^5.2.0",
  "@types/node": "^20.5.0"
}
```

---

## Conclusion

This design provides a robust, extensible, and maintainable foundation for the Role Manager CLI. The architecture supports the current requirements while providing clear extension points for future enhancements.

Key strengths:
- Clear separation of concerns
- Comprehensive error handling
- Performance-conscious design
- Extensive testing strategy
- Plugin architecture for extensibility

Next steps: Proceed to implementation following the phased approach outlined in the Implementation Checklist.
