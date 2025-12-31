# Contributing to Role Manager CLI

Thank you for your interest in contributing to the Role Manager CLI! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claude-role-framework/tools/role-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Run linter**
   ```bash
   npm run lint
   ```

5. **Format code**
   ```bash
   npm run format
   ```

---

## Project Structure

See [STRUCTURE.md](./STRUCTURE.md) for detailed project structure.

Key directories:
- `/bin/` - CLI entry point
- `/lib/` - Source code (commands, services, repositories, etc.)
- `/schemas/` - JSON schemas for validation
- `/tests/` - Test suites (unit, integration, e2e)
- `/docs/` - Additional documentation
- `/examples/` - Example configurations and roles

---

## Development Workflow

### 1. Pick a Task

Check the [ROADMAP.md](./ROADMAP.md) for current priorities and available tasks.

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions or updates

### 3. Write Tests First (TDD)

We follow Test-Driven Development:

```bash
# Create test file
touch tests/unit/services/YourService.test.js

# Write failing tests
npm test -- tests/unit/services/YourService.test.js

# Implement feature
touch lib/services/YourService.js

# Make tests pass
npm test
```

### 4. Implement Feature

Follow coding standards (see below).

### 5. Update Documentation

- Update relevant documentation files
- Add JSDoc comments to public APIs
- Update CHANGELOG.md if applicable

### 6. Run Quality Checks

```bash
# Run all tests
npm test

# Check coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Run all checks
npm run validate
```

### 7. Commit Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add role validation service"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

### 8. Submit Pull Request

See [Pull Request Process](#pull-request-process) below.

---

## Coding Standards

### General Principles

1. **Write clear, self-documenting code**
   - Use descriptive variable and function names
   - Keep functions small and focused
   - Prefer readability over cleverness

2. **Follow DRY (Don't Repeat Yourself)**
   - Extract common logic into utilities
   - Use composition over duplication

3. **Handle errors properly**
   - Use custom error classes
   - Provide helpful error messages
   - Never swallow errors silently

4. **Write for testability**
   - Use dependency injection
   - Avoid global state
   - Keep side effects explicit

### Code Style

We use ESLint and Prettier for code formatting.

**Key rules:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- 80 character line length (soft limit)
- No console.log in library code (use logger utility)

**Example:**

```javascript
// Good
class RoleService {
  constructor(roleRepository, validator) {
    this.roleRepo = roleRepository;
    this.validator = validator;
  }

  async getRoleById(roleId) {
    if (!roleId) {
      throw new ValidationError('Role ID is required');
    }

    const role = await this.roleRepo.findById(roleId);
    if (!role) {
      throw new RoleNotFoundError(roleId);
    }

    return role;
  }
}

// Bad
class RoleService {
  async getRoleById(roleId) {
    let role = await require('./repository').findById(roleId);
    if (!role) return null;
    return role;
  }
}
```

### JSDoc Comments

All public APIs must have JSDoc comments:

```javascript
/**
 * Retrieves a role by its ID.
 *
 * @param {string} roleId - The unique identifier of the role
 * @returns {Promise<Object>} The role definition
 * @throws {ValidationError} If roleId is invalid
 * @throws {RoleNotFoundError} If role does not exist
 *
 * @example
 * const role = await roleService.getRoleById('frontend-developer');
 * console.log(role.name); // 'Frontend Developer'
 */
async getRoleById(roleId) {
  // Implementation
}
```

### File Organization

```javascript
// 1. Imports
const fs = require('fs-extra');
const path = require('path');
const { ValidationError } = require('../errors');

// 2. Constants
const DEFAULT_CONFIG_PATH = '~/.config/claude-code';

// 3. Helper functions (private)
function normalizeRoleId(roleId) {
  return roleId.toLowerCase().trim();
}

// 4. Main class
class RoleService {
  // Constructor
  constructor(dependencies) {
    this.deps = dependencies;
  }

  // Public methods
  async publicMethod() {
    // Implementation
  }

  // Private methods
  _privateMethod() {
    // Implementation
  }
}

// 5. Exports
module.exports = RoleService;
```

---

## Testing Guidelines

### Test Coverage Requirements

- **Unit Tests:** >90% coverage for services and repositories
- **Integration Tests:** All critical workflows
- **E2E Tests:** All CLI commands

### Test Organization

```
tests/
├── unit/           # Unit tests (isolated components)
├── integration/    # Integration tests (component interactions)
├── e2e/            # End-to-end tests (full CLI workflows)
└── helpers/        # Test utilities and fixtures
```

### Writing Unit Tests

```javascript
// tests/unit/services/RoleService.test.js
const RoleService = require('../../../lib/services/RoleService');
const { RoleNotFoundError } = require('../../../lib/errors');

describe('RoleService', () => {
  let roleService;
  let mockRoleRepo;
  let mockValidator;

  beforeEach(() => {
    // Setup mocks
    mockRoleRepo = {
      findById: jest.fn(),
      findAll: jest.fn()
    };
    mockValidator = {
      validateRole: jest.fn()
    };

    // Create service with mocks
    roleService = new RoleService(mockRoleRepo, mockValidator);
  });

  describe('getRoleById', () => {
    test('returns role when found', async () => {
      const mockRole = { id: 'test-role', name: 'Test' };
      mockRoleRepo.findById.mockResolvedValue(mockRole);

      const result = await roleService.getRoleById('test-role');

      expect(result).toEqual(mockRole);
      expect(mockRoleRepo.findById).toHaveBeenCalledWith('test-role');
    });

    test('throws RoleNotFoundError when role not found', async () => {
      mockRoleRepo.findById.mockResolvedValue(null);

      await expect(roleService.getRoleById('nonexistent'))
        .rejects
        .toThrow(RoleNotFoundError);
    });

    test('throws ValidationError for invalid roleId', async () => {
      await expect(roleService.getRoleById(''))
        .rejects
        .toThrow(ValidationError);
    });
  });
});
```

### Writing Integration Tests

```javascript
// tests/integration/role-activation.test.js
const { setupTestEnvironment, cleanupTestEnvironment } = require('../helpers');

describe('Role Activation Flow', () => {
  beforeEach(async () => {
    await setupTestEnvironment();
  });

  afterEach(async () => {
    await cleanupTestEnvironment();
  });

  test('activating role updates configuration', async () => {
    const roleService = createRoleService();
    const configService = createConfigService();

    await roleService.activateRole('frontend-developer');

    const config = await configService.loadConfig();
    expect(config.activeRoles).toContain('frontend-developer');
  });
});
```

### Writing E2E Tests

```javascript
// tests/e2e/cli.test.js
const { execCLI, readConfig } = require('../helpers');

describe('CLI End-to-End', () => {
  test('role activate command activates role', async () => {
    const output = await execCLI('role activate frontend-developer');

    expect(output).toContain('activated successfully');

    const config = await readConfig();
    expect(config.activeRoles).toContain('frontend-developer');
  });
});
```

### Test Helpers

Create reusable test utilities:

```javascript
// tests/helpers/fixtures.js
module.exports = {
  createMockRole(overrides = {}) {
    return {
      id: 'test-role',
      name: 'Test Role',
      domain: 'test',
      skills: [],
      mcps: [],
      ...overrides
    };
  }
};
```

---

## Documentation

### Documentation Requirements

1. **Code Documentation**
   - JSDoc for all public APIs
   - Inline comments for complex logic
   - Clear function and variable names

2. **User Documentation**
   - Update README.md for user-facing changes
   - Update CLI-COMMANDS.md for new commands
   - Add examples for new features

3. **Technical Documentation**
   - Update DESIGN.md for architectural changes
   - Update STRUCTURE.md for new components
   - Document design decisions

### Documentation Style

- Use clear, concise language
- Provide examples
- Keep documentation in sync with code
- Use proper Markdown formatting

---

## Pull Request Process

### Before Submitting

1. **Run all quality checks**
   ```bash
   npm run validate
   ```

2. **Update documentation**
   - README.md if needed
   - CLI-COMMANDS.md for new commands
   - CHANGELOG.md for notable changes

3. **Write clear PR description**
   - What does this PR do?
   - Why is this change needed?
   - How was it tested?
   - Any breaking changes?

### PR Template

```markdown
## Description
Brief description of changes

## Motivation
Why is this change needed?

## Changes
- Change 1
- Change 2

## Testing
How was this tested?

## Checklist
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Code follows style guidelines
- [ ] All tests passing
- [ ] No linting errors
```

### Review Process

1. **Automated Checks**
   - Tests must pass
   - Coverage must meet thresholds
   - Linting must pass

2. **Code Review**
   - At least one approval required
   - Address review comments
   - Make requested changes

3. **Merge**
   - Squash commits or rebase
   - Delete feature branch after merge

---

## Communication

### Asking Questions

- Open an issue for questions
- Use clear, specific titles
- Provide context and examples
- Search existing issues first

### Reporting Bugs

Include:
- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Environment (Node version, OS, etc.)
- Error messages or logs

### Suggesting Features

Include:
- Clear feature description
- Use case and motivation
- Proposed implementation (optional)
- Examples of usage

---

## Development Tips

### Useful Commands

```bash
# Run specific test
npm test -- tests/unit/services/RoleService.test.js

# Run tests in watch mode
npm run test:watch

# Check coverage
npm run test:coverage

# Lint specific file
npx eslint lib/services/RoleService.js

# Format specific file
npx prettier --write lib/services/RoleService.js

# Debug tests
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Debugging

```javascript
// Add debug logging
const debug = require('debug')('role-manager:service');

class RoleService {
  async getRoleById(roleId) {
    debug('Getting role:', roleId);
    // ...
  }
}

// Run with debug output
DEBUG=role-manager:* npm test
```

### Using Mock-FS

```javascript
const mockfs = require('mock-fs');

beforeEach(() => {
  mockfs({
    '/fake/path': {
      'roles.json': '{"activeRoles": []}'
    }
  });
});

afterEach(() => {
  mockfs.restore();
});
```

---

## Resources

- [SPECIFICATION.md](../../SPECIFICATION.md) - Framework specification
- [DESIGN.md](./DESIGN.md) - Technical design
- [CLI-COMMANDS.md](./CLI-COMMANDS.md) - Command reference
- [ROADMAP.md](./ROADMAP.md) - Implementation roadmap
- [STRUCTURE.md](./STRUCTURE.md) - Project structure

---

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Role Manager CLI!
