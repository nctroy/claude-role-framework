# Role Manager - Directory Structure

This document outlines the complete directory structure for the Role Manager CLI tool.

## Overview

```
tools/role-manager/
├── bin/                          # Executable scripts
├── lib/                          # Source code
├── schemas/                      # JSON schemas
├── tests/                        # Test suites
├── docs/                         # Additional documentation
├── examples/                     # Example configurations
├── scripts/                      # Build and utility scripts
├── package.json                  # Package configuration
├── README.md                     # User documentation
├── DESIGN.md                     # Technical design
├── CLI-COMMANDS.md              # Command reference
├── STRUCTURE.md                 # This file
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc.js               # Prettier configuration
├── jest.config.js               # Jest configuration
└── LICENSE                      # License file
```

## Detailed Structure

### `/bin/` - Executables

Entry points for the CLI tool.

```
bin/
└── claude-role.js               # Main CLI entry point
```

**Purpose:** Contains the main executable that users invoke. Sets up the command-line interface and delegates to command handlers.

### `/lib/` - Source Code

Core application logic organized by layer.

```
lib/
├── index.js                     # Main export
├── cli.js                       # CLI initialization and router
│
├── commands/                    # Command handlers
│   ├── index.js                # Command exports
│   ├── role.js                 # Role commands
│   ├── domain.js               # Domain commands
│   └── config.js               # Config commands
│
├── services/                    # Business logic
│   ├── RoleService.js          # Role operations
│   ├── DomainService.js        # Domain operations
│   ├── ConfigService.js        # Configuration management
│   ├── ValidationService.js    # Validation logic
│   └── PluginService.js        # Plugin management
│
├── repositories/                # Data access
│   ├── RoleRepository.js       # Role data access
│   ├── DomainRepository.js     # Domain data access
│   ├── ConfigRepository.js     # Config data access
│   ├── SchemaRepository.js     # Schema loading
│   └── FileSystem.js           # File system abstraction
│
├── resolvers/                   # Resolution logic
│   ├── RoleResolver.js         # Role inheritance resolution
│   └── ConflictResolver.js     # Conflict resolution strategies
│
├── validators/                  # Validation components
│   ├── SchemaValidator.js      # JSON schema validation
│   ├── SemanticValidator.js    # Semantic validation
│   └── CircularDependencyValidator.js
│
├── formatters/                  # Output formatting
│   ├── TableFormatter.js       # Table output
│   ├── JsonFormatter.js        # JSON output
│   ├── YamlFormatter.js        # YAML output
│   └── ErrorFormatter.js       # Error messages
│
├── utils/                       # Utilities
│   ├── path-resolver.js        # Path resolution
│   ├── file-utils.js           # File operations
│   ├── cache.js                # Caching utilities
│   ├── logger.js               # Logging
│   └── merge.js                # Deep merge utilities
│
├── errors/                      # Error classes
│   ├── RoleManagerError.js     # Base error
│   ├── RoleNotFoundError.js    # Role not found
│   ├── ValidationError.js      # Validation errors
│   ├── CircularDependencyError.js
│   └── ConfigurationError.js   # Config errors
│
└── plugins/                     # Plugin system
    ├── PluginInterface.js      # Plugin base class
    └── PluginLoader.js         # Plugin loading
```

### `/schemas/` - JSON Schemas

JSON Schema definitions for validation.

```
schemas/
├── domain.schema.json           # Domain definition schema
├── role.schema.json             # Role definition schema
├── config.schema.json           # Configuration schema
└── skill.schema.json            # Skill reference schema
```

**Purpose:** Contains JSON Schema definitions used to validate role definitions, domain definitions, and user configurations.

### `/tests/` - Test Suites

Comprehensive test coverage.

```
tests/
├── setup.js                     # Test setup and globals
├── helpers/                     # Test utilities
│   ├── fixtures.js             # Test fixtures
│   ├── mock-fs-helper.js       # File system mocking
│   └── assertions.js           # Custom assertions
│
├── unit/                        # Unit tests
│   ├── services/
│   │   ├── RoleService.test.js
│   │   ├── DomainService.test.js
│   │   ├── ConfigService.test.js
│   │   └── ValidationService.test.js
│   ├── repositories/
│   │   ├── RoleRepository.test.js
│   │   └── ConfigRepository.test.js
│   ├── resolvers/
│   │   ├── RoleResolver.test.js
│   │   └── ConflictResolver.test.js
│   └── validators/
│       ├── SchemaValidator.test.js
│       └── SemanticValidator.test.js
│
├── integration/                 # Integration tests
│   ├── role-activation.test.js
│   ├── role-inheritance.test.js
│   ├── config-management.test.js
│   └── validation-flow.test.js
│
└── e2e/                         # End-to-end tests
    ├── cli.test.js             # CLI command tests
    ├── role-lifecycle.test.js   # Complete role lifecycle
    └── multi-role.test.js      # Multi-role scenarios
```

### `/docs/` - Documentation

Additional documentation beyond main README.

```
docs/
├── api/                         # API documentation
│   └── (generated by JSDoc)
├── guides/                      # User guides
│   ├── getting-started.md
│   ├── creating-custom-roles.md
│   ├── inheritance-guide.md
│   └── troubleshooting.md
└── architecture/                # Architecture docs
    ├── data-flow.md
    ├── plugin-development.md
    └── extending-cli.md
```

### `/examples/` - Examples

Example configurations and roles.

```
examples/
├── configurations/              # Example configs
│   ├── basic-config.json
│   ├── multi-role-config.json
│   └── team-config.json
│
├── custom-roles/                # Example custom roles
│   ├── full-stack-dev.json
│   ├── security-focused-dev.json
│   └── data-engineer.json
│
└── scripts/                     # Example scripts
    ├── auto-activate.sh
    └── team-sync.sh
```

### `/scripts/` - Utility Scripts

Build and development scripts.

```
scripts/
├── install-completion.sh        # Shell completion installer
├── migrate-config.js            # Config migration tool
├── generate-docs.sh             # Documentation generator
└── validate-schemas.js          # Schema validation
```

## Implementation Files

### Core Files to Implement

#### Phase 1: Foundation
1. `/bin/claude-role.js` - CLI entry point
2. `/lib/cli.js` - Command router
3. `/lib/utils/path-resolver.js` - Path utilities
4. `/lib/utils/file-utils.js` - File operations
5. `/lib/repositories/FileSystem.js` - FS abstraction
6. `/schemas/*.schema.json` - All schemas

#### Phase 2: Data Layer
1. `/lib/repositories/RoleRepository.js`
2. `/lib/repositories/DomainRepository.js`
3. `/lib/repositories/ConfigRepository.js`
4. `/lib/repositories/SchemaRepository.js`

#### Phase 3: Services
1. `/lib/services/ValidationService.js`
2. `/lib/validators/SchemaValidator.js`
3. `/lib/validators/SemanticValidator.js`
4. `/lib/resolvers/RoleResolver.js`
5. `/lib/services/RoleService.js`
6. `/lib/services/DomainService.js`
7. `/lib/services/ConfigService.js`

#### Phase 4: Commands
1. `/lib/commands/role.js`
2. `/lib/commands/domain.js`
3. `/lib/commands/config.js`
4. `/lib/formatters/TableFormatter.js`
5. `/lib/formatters/JsonFormatter.js`
6. `/lib/formatters/YamlFormatter.js`

#### Phase 5: Advanced Features
1. `/lib/resolvers/ConflictResolver.js`
2. `/lib/plugins/PluginInterface.js`
3. `/lib/plugins/PluginLoader.js`
4. `/lib/services/PluginService.js`

## Configuration Files

### `.eslintrc.js`

ESLint configuration for code quality.

```javascript
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  rules: {
    'no-console': 'off', // CLI tool needs console
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};
```

### `.prettierrc.js`

Prettier configuration for formatting.

```javascript
module.exports = {
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false
};
```

### `jest.config.js`

Jest testing configuration.

```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/**/*.test.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  testMatch: ['**/tests/**/*.test.js']
};
```

## File Naming Conventions

### JavaScript Files
- **Classes:** PascalCase (e.g., `RoleService.js`)
- **Utilities:** kebab-case (e.g., `path-resolver.js`)
- **Tests:** Same as source with `.test.js` suffix

### JSON Files
- **Schemas:** kebab-case with `.schema.json` suffix
- **Configs:** kebab-case with `.json` extension
- **Examples:** descriptive kebab-case

### Documentation
- All Markdown files use UPPERCASE for main docs
- Guide files use kebab-case

## Key Design Decisions

### Separation of Concerns
- **Commands:** Handle CLI interaction only
- **Services:** Implement business logic
- **Repositories:** Manage data persistence
- **Validators:** Handle all validation
- **Formatters:** Control output presentation

### Dependency Injection
All components receive dependencies via constructor to enable:
- Easy testing with mocks
- Flexible composition
- Clear dependency graph

### Error Handling
- Custom error classes for different error types
- Consistent error formatting
- User-friendly error messages
- Debug mode for detailed errors

### Testability
- Every component is unit testable
- Mock-fs for file system testing
- Integration tests for workflows
- E2E tests for complete scenarios

## Next Steps

1. Create directory structure
2. Implement JSON schemas
3. Build foundational utilities
4. Implement data layer (repositories)
5. Build service layer
6. Implement commands
7. Add formatters and output
8. Write tests
9. Documentation
10. Examples and guides

## Additional Resources

- See [DESIGN.md](./DESIGN.md) for architectural details
- See [CLI-COMMANDS.md](./CLI-COMMANDS.md) for command specifications
- See [README.md](./README.md) for user documentation
- See [../../SPECIFICATION.md](../../SPECIFICATION.md) for framework specification
