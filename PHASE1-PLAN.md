# Phase 1: Minimal Proof-of-Concept Implementation Plan

**Version:** 1.0.0
**Timeline:** 1-2 weeks
**Status:** Planning
**Last Updated:** 2025-12-30

---

## Objective

Build a minimal but functional proof-of-concept of the Claude Role Framework that demonstrates core capabilities and technical feasibility for Anthropic submission.

---

## Success Criteria

A successful Phase 1 PoC must:

1. **Load and validate** role/domain JSON files using schemas
2. **List available** domains and roles via CLI
3. **Display details** for specific roles (skills, MCPs, context)
4. **Activate roles** and demonstrate context injection
5. **Resolve inheritance** correctly (single and multiple inheritance)
6. **Pass all tests** (unit and integration)
7. **Run as CLI** with documented commands
8. **Work with example roles** created in documentation phase

---

## Scope

### In Scope (Phase 1)

**Core Functionality:**
- JSON schema validation (domain, role, config)
- Role/domain file loading and parsing
- Basic CLI interface (Commander.js)
- Role resolution engine (inheritance, composition)
- Context injection mechanism (proof-of-concept)
- Configuration file management

**CLI Commands:**
```bash
claude-role list                    # List all domains and roles
claude-role list --domain dev       # List roles in specific domain
claude-role show <role-id>          # Show role details
claude-role activate <role-id>      # Activate a role
claude-role activate "role1+role2"  # Activate multiple roles
claude-role validate <file>         # Validate role/domain JSON
```

**Testing:**
- Unit tests for core modules
- Integration tests for CLI commands
- Example role loading tests

**Documentation:**
- README for PoC
- Quick start guide
- Architecture decisions document

### Out of Scope (Phase 1)

**Deferred to Later Phases:**
- Full Claude Code integration (stub only)
- Custom role creation UI
- Role marketplace/registry
- Advanced conflict resolution
- Performance optimization
- Migration utilities
- Plugin architecture
- Session management
- Project-scoped roles
- Remote role loading

---

## Technical Architecture

### Directory Structure

```
tools/role-manager/
├── bin/
│   └── claude-role.js          # CLI entry point
├── src/
│   ├── commands/               # CLI command handlers
│   │   ├── list.js
│   │   ├── show.js
│   │   ├── activate.js
│   │   └── validate.js
│   ├── core/                   # Core business logic
│   │   ├── RoleLoader.js       # Load roles from filesystem
│   │   ├── RoleResolver.js     # Resolve inheritance/composition
│   │   ├── SchemaValidator.js  # JSON schema validation
│   │   └── ContextBuilder.js   # Build context from roles
│   ├── config/                 # Configuration management
│   │   └── ConfigManager.js    # Load/save user config
│   └── utils/                  # Utilities
│       ├── logger.js
│       └── errors.js
├── test/
│   ├── unit/                   # Unit tests
│   └── integration/            # Integration tests
├── package.json
└── README.md
```

### Key Components

#### 1. SchemaValidator
**Responsibility:** Validate JSON files against schemas
```javascript
class SchemaValidator {
  validateDomain(domainJson)
  validateRole(roleJson)
  validateConfig(configJson)
}
```

#### 2. RoleLoader
**Responsibility:** Load roles and domains from filesystem
```javascript
class RoleLoader {
  loadAllDomains()
  loadDomain(domainId)
  loadRole(roleId)
  loadConfig()
}
```

#### 3. RoleResolver
**Responsibility:** Resolve inheritance and composition
```javascript
class RoleResolver {
  resolveRole(roleId)              // Single role with inheritance
  composeRoles(roleIds)            // Multiple roles combined
  detectCircularDependency(roleId)
}
```

#### 4. ContextBuilder
**Responsibility:** Build context from activated roles
```javascript
class ContextBuilder {
  buildContext(resolvedRoles)
  formatForClaudeCode()
}
```

---

## Implementation Tasks

### Week 1: Core Infrastructure

**Day 1-2: Project Setup**
- [ ] Initialize Node.js project with proper package.json
- [ ] Set up ESLint, Prettier for code quality
- [ ] Configure Jest for testing
- [ ] Create directory structure
- [ ] Set up CI/CD basics (if needed)

**Day 3-4: Schema Validation**
- [ ] Implement SchemaValidator class
- [ ] Load JSON schemas from schemas/ directory
- [ ] Add Ajv for JSON Schema validation
- [ ] Write unit tests for validation
- [ ] Handle validation error messages

**Day 5-7: Role Loading**
- [ ] Implement RoleLoader class
- [ ] Scan examples/ directory for domains and roles
- [ ] Parse JSON files with error handling
- [ ] Cache loaded roles in memory
- [ ] Write unit tests for loader

### Week 2: CLI and Integration

**Day 8-9: Role Resolution**
- [ ] Implement RoleResolver class
- [ ] Handle single inheritance (extends one role)
- [ ] Handle multiple inheritance (extends multiple roles)
- [ ] Implement override mechanism
- [ ] Detect circular dependencies
- [ ] Write comprehensive tests

**Day 10-11: CLI Commands**
- [ ] Set up Commander.js CLI framework
- [ ] Implement `list` command
- [ ] Implement `show` command
- [ ] Implement `validate` command
- [ ] Implement `activate` command (basic)
- [ ] Add help text and examples

**Day 12-13: Context Building**
- [ ] Implement ContextBuilder class
- [ ] Merge skills from multiple roles
- [ ] Merge MCPs from multiple roles
- [ ] Combine context objects
- [ ] Format output for Claude Code
- [ ] Write integration tests

**Day 14: Testing and Documentation**
- [ ] Write integration tests for full workflows
- [ ] Test with all 26 example roles
- [ ] Update README with usage examples
- [ ] Create demo script
- [ ] Record demo video (optional)

---

## Testing Strategy

### Unit Tests (Jest)

**Target Coverage:** 80%+

```javascript
// Example test structure
describe('RoleResolver', () => {
  test('resolves single inheritance correctly', () => {
    const resolver = new RoleResolver(loader);
    const resolved = resolver.resolveRole('full-stack-developer');
    expect(resolved.skills).toContain('canvas-design'); // from frontend
    expect(resolved.skills).toContain('database-design'); // from backend
  });

  test('detects circular dependencies', () => {
    expect(() => {
      resolver.resolveRole('circular-role');
    }).toThrow('Circular dependency detected');
  });
});
```

### Integration Tests

**Test Scenarios:**
1. Load all 26 example roles without errors
2. Validate all example JSON files
3. Resolve Full Stack Developer (extends Frontend + Backend)
4. Activate multiple roles and verify combined skills
5. CLI commands execute successfully
6. Invalid JSON files are rejected with clear errors

---

## Dependencies

### Production Dependencies
```json
{
  "commander": "^11.0.0",          // CLI framework
  "ajv": "^8.12.0",                // JSON schema validation
  "ajv-formats": "^2.1.1",         // Additional format validators
  "cosmiconfig": "^8.3.0",         // Config file loading
  "chalk": "^5.3.0"                // Terminal colors
}
```

### Development Dependencies
```json
{
  "jest": "^29.7.0",               // Testing framework
  "eslint": "^8.50.0",             // Linting
  "prettier": "^3.0.0",            // Code formatting
  "@types/node": "^20.0.0"         // TypeScript types (if needed)
}
```

---

## Risk Mitigation

### Technical Risks

**Risk 1: Schema Validation Complexity**
- **Mitigation:** Use well-tested Ajv library, validate early

**Risk 2: Circular Dependency Detection**
- **Mitigation:** Implement graph traversal with visited set

**Risk 3: Inheritance Override Conflicts**
- **Mitigation:** Define clear precedence rules, test edge cases

**Risk 4: Context Injection Integration**
- **Mitigation:** Start with simple proof-of-concept, iterate

### Schedule Risks

**Risk 1: Underestimated Complexity**
- **Mitigation:** Focus on MVP, defer nice-to-haves

**Risk 2: Scope Creep**
- **Mitigation:** Strict adherence to in-scope items only

---

## Demo Preparation

### Demo Script

```bash
# 1. List all available roles
claude-role list

# 2. Show details for Frontend Developer
claude-role show frontend-developer

# 3. Activate a single role
claude-role activate frontend-developer

# 4. Activate multiple roles (composition)
claude-role activate "frontend-developer+security-analyst"

# 5. Validate a custom role file
claude-role validate examples/custom/my-role.json
```

### Demo Video (Optional)
- 2-3 minute walkthrough
- Show CLI in action
- Demonstrate key features
- Highlight role composition

---

## Deliverables

### Code Deliverables
1. Working CLI tool in tools/role-manager/
2. Passing test suite (80%+ coverage)
3. All 26 example roles load successfully

### Documentation Deliverables
1. Updated README.md with installation and usage
2. ARCHITECTURE.md explaining design decisions
3. TESTING.md with test coverage report

### Demo Deliverables
1. Demo script showing core functionality
2. Screenshots of CLI in action
3. Optional: Demo video (2-3 minutes)

---

## Definition of Done

Phase 1 PoC is complete when:

- [ ] All CLI commands work as specified
- [ ] All 26 example roles load without errors
- [ ] Role inheritance resolves correctly
- [ ] Role composition (multiple roles) works
- [ ] All tests pass (80%+ coverage)
- [ ] Documentation is complete and accurate
- [ ] Demo script runs successfully
- [ ] Code is reviewed and approved
- [ ] Ready for Anthropic submission package

---

## Next Steps After Phase 1

1. **Package for Anthropic submission:**
   - SPECIFICATION.md
   - Working PoC code
   - Demo video/screenshots
   - Documentation
   - Example roles

2. **Submit to Anthropic** for feedback

3. **Iterate based on feedback:**
   - Implement requested changes
   - Refine architecture
   - Expand scope if approved

4. **Proceed to Phase 2** (if approved):
   - Full Claude Code integration
   - Advanced features
   - Production hardening

---

## Appendix: Command Examples

### List Commands
```bash
# List all domains
claude-role list

# List roles in specific domain
claude-role list --domain development

# Search for roles
claude-role list --search "analyst"
```

### Show Commands
```bash
# Show role details
claude-role show frontend-developer

# Show with full context
claude-role show frontend-developer --verbose

# Show in JSON format
claude-role show frontend-developer --json
```

### Activate Commands
```bash
# Activate single role
claude-role activate frontend-developer

# Activate multiple roles
claude-role activate "frontend-developer+security-analyst"

# Dry-run activation (show what would happen)
claude-role activate frontend-developer --dry-run
```

### Validate Commands
```bash
# Validate a role file
claude-role validate examples/development/frontend-developer.json

# Validate entire domain
claude-role validate examples/development/

# Validate with detailed output
claude-role validate examples/development/ --verbose
```

---

**End of Phase 1 Plan**
