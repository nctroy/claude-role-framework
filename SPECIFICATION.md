# Claude Role Framework: Technical Specification

**Version:** 1.0.0-draft
**Status:** Proposal
**Last Updated:** 2025-12-30
**Authors:** Claude Role Framework Contributors

---

## Abstract

The Claude Role Framework is a hierarchical organizational system for Claude Skills and Model Context Protocol (MCP) servers that maps AI capabilities to real-world job functions and life roles. This specification defines a standardized architecture for grouping Skills into Roles, organizing Roles into Domains, and managing contextual activation of these capabilities within Claude Code and other Claude-powered environments.

---

## 1. Introduction

### 1.1 Motivation

As the Claude Skills ecosystem grows, users face increasing challenges with discoverability, configuration, and organization:

- **Discoverability Problem**: With 50+ individual Skills available, users must manually browse and select each capability without contextual guidance.
- **Configuration Complexity**: Users must independently determine which Skills and MCPs work well together for specific use cases.
- **Mental Model Mismatch**: The current flat structure does not align with how humans naturally conceptualize capabilities (by job function or role).
- **Lack of Context**: Individual Skills operate without domain-specific knowledge or workflow understanding.

The Claude Role Framework addresses these challenges by introducing a hierarchical organization that mirrors real-world job functions and life roles, making AI assistance more intuitive and accessible.

### 1.2 Design Principles

1. **Hierarchical Organization**: Domain → Role → Skills/MCPs structure
2. **Universal Applicability**: Supports both professional and personal use cases
3. **Natural Mental Models**: Aligns with human understanding of capabilities
4. **Composability**: Roles can inherit, extend, and combine
5. **Many-to-Many Relationships**: Skills belong to multiple Roles
6. **Backward Compatibility**: Does not break existing Skills or MCP configurations
7. **Progressive Enhancement**: Users can adopt incrementally

### 1.3 Scope

This specification defines:

- Core data structures (Domain, Role, Skill)
- Configuration format and schema
- Inheritance and composition mechanisms
- Activation and deactivation behavior
- Integration with Claude Code
- Migration path from existing configurations

This specification does not define:

- Individual Skill implementations (covered by existing Skills documentation)
- MCP server protocols (covered by Model Context Protocol specification)
- Claude API internals

---

## 2. Architecture

### 2.1 Hierarchical Structure

The framework implements a three-tier hierarchy:

```
Domain (Organizational Unit)
    ├── Role (Job Function)
    │   ├── Skills (Individual Capabilities)
    │   ├── MCPs (External Tool Connections)
    │   └── Context (Domain-Specific Knowledge)
    └── [Additional Roles...]
```

#### 2.1.1 Domain

A **Domain** represents a high-level organizational category or area of life. Domains provide semantic grouping for related Roles.

**Examples:**
- Work Domains: Development, HR, Security, Operations, Finance, Marketing
- Life Domains: Home & Family, Personal Growth, Health & Wellness, Community

**Properties:**
- Unique identifier
- Display name
- Description
- Collection of Roles
- Optional shared resources (templates, knowledge bases)

#### 2.1.2 Role

A **Role** represents a job function, life role, or specialized capability set. Roles bundle Skills, MCPs, and contextual knowledge into a coherent, activatable unit.

**Examples:**
- Work Roles: Frontend Developer, Data Analyst, Security Analyst, HR Manager
- Life Roles: Parent/Educator, Meal Planner, Job Seeker, DIY Enthusiast

**Properties:**
- Unique identifier
- Display name
- Description
- Parent Domain
- List of included Skills
- List of included MCPs
- Context definitions
- Optional inheritance from other Roles
- Optional metadata (tags, categories, difficulty level)

#### 2.1.3 Skill

A **Skill** is an individual Claude capability (as currently defined in the Claude Skills system). Skills are the atomic units of functionality.

**Properties:**
- Unique identifier
- Display name
- Description
- Implementation (existing Skill definition)
- Role memberships (which Roles include this Skill)

### 2.2 Relationships

#### 2.2.1 Domain-Role Relationship (1:N)

A Domain contains multiple Roles. Each Role belongs to exactly one Domain.

```
Domain: Development
├── Role: Frontend Developer
├── Role: Backend Developer
├── Role: DevOps Engineer
└── Role: Full Stack Developer
```

#### 2.2.2 Role-Skill Relationship (M:N)

A Role includes multiple Skills. A Skill can belong to multiple Roles.

```
Skill: pdf
├── Used by: Legal Counsel
├── Used by: HR Manager
├── Used by: Financial Analyst
├── Used by: Marketing Manager
└── Used by: Security Analyst
```

This many-to-many relationship enables:
- **Skill reusability** across Roles
- **Efficient resource management** (Skills loaded once, used by many Roles)
- **Cross-domain capabilities** (e.g., `xlsx` used in Finance, Marketing, Operations)

#### 2.2.3 Role-MCP Relationship (M:N)

Similar to Skills, MCPs can be shared across Roles.

```
MCP: github
├── Used by: Frontend Developer
├── Used by: Backend Developer
├── Used by: DevOps Engineer
└── Used by: Technical Writer
```

---

## 3. Data Model

### 3.1 Domain Definition

```json
{
  "id": "development",
  "name": "Development",
  "description": "Software development and engineering roles",
  "version": "1.0.0",
  "roles": [
    "frontend-developer",
    "backend-developer",
    "devops-engineer",
    "full-stack-developer"
  ],
  "metadata": {
    "tags": ["engineering", "technology", "software"],
    "icon": "code",
    "color": "#0066cc"
  }
}
```

**Field Descriptions:**

- `id` (required, string): Unique identifier using kebab-case
- `name` (required, string): Human-readable display name
- `description` (required, string): Brief description of the domain
- `version` (required, string): Semantic version of the domain definition
- `roles` (required, array): List of Role IDs contained in this Domain
- `metadata` (optional, object): Additional domain metadata

### 3.2 Role Definition

```json
{
  "id": "frontend-developer",
  "name": "Frontend Developer",
  "domain": "development",
  "description": "Build modern web user interfaces with React, Vue, and other frameworks",
  "version": "1.0.0",
  "skills": [
    "canvas-design",
    "web-artifacts-builder",
    "frontend-design",
    "webapp-testing"
  ],
  "mcps": [
    "github",
    "npm-registry",
    "figma",
    "browser-devtools"
  ],
  "context": {
    "primaryLanguages": ["JavaScript", "TypeScript", "HTML", "CSS"],
    "frameworks": ["React", "Vue", "Angular", "Svelte"],
    "tools": ["Webpack", "Vite", "ESLint", "Prettier"],
    "responsibilities": [
      "Implement responsive user interfaces",
      "Ensure cross-browser compatibility",
      "Optimize frontend performance",
      "Collaborate with designers and backend developers"
    ]
  },
  "inheritance": {
    "extends": [],
    "overrides": {}
  },
  "metadata": {
    "tags": ["web", "ui", "javascript", "react"],
    "difficulty": "intermediate",
    "icon": "layout",
    "color": "#61dafb"
  }
}
```

**Field Descriptions:**

- `id` (required, string): Unique identifier using kebab-case
- `name` (required, string): Human-readable display name
- `domain` (required, string): Parent Domain ID
- `description` (required, string): Detailed description of the role
- `version` (required, string): Semantic version of the role definition
- `skills` (required, array): List of Skill IDs included in this Role
- `mcps` (required, array): List of MCP server IDs included in this Role
- `context` (optional, object): Domain-specific contextual knowledge
- `inheritance` (optional, object): Inheritance configuration
- `metadata` (optional, object): Additional role metadata

### 3.3 Skill Reference

Skills maintain their existing structure as defined by the Claude Skills system. The framework adds metadata to track Role memberships:

```json
{
  "id": "xlsx",
  "name": "Excel/Spreadsheet Operations",
  "description": "Create, edit, and analyze spreadsheet data",
  "version": "1.2.0",
  "implementation": "[Existing Skill Implementation]",
  "roleMemberships": [
    "data-analyst",
    "financial-analyst",
    "hr-manager",
    "marketing-manager",
    "operations-manager"
  ]
}
```

### 3.4 Configuration File

User configurations specify active Roles and customizations:

```json
{
  "version": "1.0.0",
  "activeRoles": [
    "frontend-developer"
  ],
  "customRoles": [
    {
      "id": "my-custom-role",
      "name": "My Custom Role",
      "domain": "custom",
      "extends": ["frontend-developer", "security-analyst"],
      "additionalSkills": ["brand-guidelines"],
      "additionalMCPs": ["jira"],
      "description": "Custom role for secure frontend development"
    }
  ],
  "preferences": {
    "autoActivate": true,
    "conflictResolution": "merge",
    "skillPriority": "role-defined"
  }
}
```

---

## 4. Inheritance and Composition

### 4.1 Role Inheritance

Roles can inherit from one or more parent Roles, enabling:

- Code reuse across similar Roles
- Specialization of general-purpose Roles
- Reduced configuration duplication

#### 4.1.1 Single Inheritance

```json
{
  "id": "financial-analyst",
  "name": "Financial Analyst",
  "domain": "finance",
  "inheritance": {
    "extends": ["base-analyst"]
  },
  "skills": [
    "financial-modeling",
    "forecasting"
  ]
}
```

**Behavior**: The Financial Analyst inherits all Skills and MCPs from `base-analyst`, then adds `financial-modeling` and `forecasting`.

#### 4.1.2 Multiple Inheritance

```json
{
  "id": "full-stack-developer",
  "name": "Full Stack Developer",
  "domain": "development",
  "inheritance": {
    "extends": ["frontend-developer", "backend-developer"]
  },
  "skills": [
    "system-architecture"
  ]
}
```

**Behavior**: The Full Stack Developer inherits Skills and MCPs from both `frontend-developer` and `backend-developer`, then adds `system-architecture`.

#### 4.1.3 Override Mechanism

Child Roles can override inherited properties:

```json
{
  "id": "specialized-analyst",
  "name": "Specialized Analyst",
  "domain": "finance",
  "inheritance": {
    "extends": ["base-analyst"],
    "overrides": {
      "skills": {
        "remove": ["generic-reporting"],
        "add": ["advanced-statistical-analysis"]
      }
    }
  }
}
```

### 4.2 Role Composition

Users can activate multiple Roles simultaneously, creating composite capability sets.

#### 4.2.1 Additive Composition

When multiple Roles are activated, their Skills and MCPs are merged:

```bash
Active Roles: [frontend-developer, security-analyst]

Resulting Skills:
  - All skills from frontend-developer
  - All skills from security-analyst
  - No duplicates (Skills loaded once)
```

#### 4.2.2 Conflict Resolution

When Roles provide conflicting configurations, resolution strategies apply:

**Strategy 1: Merge (Default)**
- Combine all Skills and MCPs from all active Roles
- No conflicts, as Skills are additive

**Strategy 2: Priority**
- User specifies priority order for Roles
- Higher-priority Role configurations take precedence for shared resources

**Strategy 3: Explicit**
- User manually selects which Skills/MCPs to include when conflicts arise

---

## 5. Activation and Lifecycle

### 5.1 Role Activation

Roles are activated through configuration or command-line interface.

#### 5.1.1 Configuration-Based Activation

Users specify active Roles in `claude-config.json`:

```json
{
  "activeRoles": ["data-analyst"]
}
```

When Claude Code starts, it loads all Skills and MCPs associated with the active Role(s).

#### 5.1.2 CLI-Based Activation

```bash
# Activate a single role
claude role activate data-analyst

# Activate multiple roles
claude role activate "frontend-developer + security-analyst"

# Deactivate a role
claude role deactivate frontend-developer

# List active roles
claude role list

# View role details
claude role show data-analyst
```

### 5.2 Lazy Loading

To optimize performance, Skills and MCPs are lazy-loaded:

1. **On Activation**: Role metadata and context are loaded
2. **On First Use**: Individual Skills are loaded when invoked
3. **Caching**: Loaded Skills remain in memory for the session

### 5.3 Session Management

Role activations are session-scoped by default:

- **Session Scope**: Roles active for current Claude Code session
- **Persistent Scope**: Roles saved to configuration file for future sessions
- **Project Scope**: Roles specific to a project directory (`.claude/roles.json`)

---

## 6. Context Management

### 6.1 Domain-Specific Context

Each Role provides context that enhances Claude's responses:

```json
{
  "context": {
    "terminology": {
      "sprint": "A time-boxed iteration in Agile development",
      "standup": "Daily team synchronization meeting"
    },
    "templates": [
      "user-story-template.md",
      "bug-report-template.md"
    ],
    "workflows": [
      "code-review-checklist",
      "deployment-process"
    ],
    "bestPractices": [
      "Write semantic HTML",
      "Use CSS Grid for layouts",
      "Implement accessibility standards"
    ]
  }
}
```

### 6.2 Context Injection

When a Role is active, its context is injected into Claude's system prompt:

```
You are acting as a Frontend Developer.

Your primary responsibilities include:
- Implement responsive user interfaces
- Ensure cross-browser compatibility
- Optimize frontend performance

You work with: React, Vue, JavaScript, TypeScript, HTML, CSS

You have access to: github, npm-registry, figma, browser-devtools
```

This context enables Claude to:
- Use domain-appropriate terminology
- Suggest relevant workflows
- Apply role-specific best practices
- Understand user intent within the role's scope

---

## 7. Integration with Claude Code

### 7.1 Configuration Location

Role configurations are stored in:

```
~/.config/claude-code/
├── roles.json                  # User's active roles
├── custom-roles/               # User-defined custom roles
│   └── my-role.json
└── domains/                    # Official domain definitions
    ├── development.json
    ├── hr.json
    ├── security.json
    └── ...
```

### 7.2 Discovery Mechanism

Claude Code discovers available Roles through:

1. **Built-in Domains**: Shipped with Claude Code in `domains/` directory
2. **User Custom Roles**: Located in `~/.config/claude-code/custom-roles/`
3. **Project Roles**: Located in `.claude/roles/` within project directories
4. **Remote Registry** (future): Downloadable Roles from community registry

### 7.3 CLI Integration

The Role Framework extends the Claude Code CLI:

```bash
# Role management commands
claude role list                      # List all available roles
claude role activate <role-id>        # Activate a role
claude role deactivate <role-id>      # Deactivate a role
claude role show <role-id>            # Show role details
claude role create <role-id>          # Create a custom role
claude role edit <role-id>            # Edit a custom role
claude role validate <file>           # Validate a role definition

# Domain management commands
claude domain list                    # List all available domains
claude domain show <domain-id>        # Show domain details

# Configuration commands
claude config roles                   # Show current role configuration
claude config export                  # Export configuration
claude config import <file>           # Import configuration
```

### 7.4 Backward Compatibility

The framework maintains backward compatibility with existing Claude Code configurations:

- **Non-Role Users**: Can continue using individual Skills and MCPs as before
- **Gradual Migration**: Users can adopt Roles incrementally while maintaining existing configurations
- **Skill Equivalence**: Activating a Role is equivalent to manually configuring its constituent Skills

---

## 8. Schema Definitions

### 8.1 Domain Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "description", "version", "roles"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$",
      "description": "Unique domain identifier (kebab-case)"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Human-readable domain name"
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "description": "Brief description of the domain"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version"
    },
    "roles": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "description": "List of role IDs in this domain"
    },
    "metadata": {
      "type": "object",
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "icon": {
          "type": "string"
        },
        "color": {
          "type": "string",
          "pattern": "^#[0-9a-fA-F]{6}$"
        }
      }
    }
  }
}
```

### 8.2 Role Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "domain", "description", "version", "skills", "mcps"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9-]*$",
      "description": "Unique role identifier (kebab-case)"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "Human-readable role name"
    },
    "domain": {
      "type": "string",
      "description": "Parent domain ID"
    },
    "description": {
      "type": "string",
      "minLength": 1,
      "description": "Detailed role description"
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Semantic version"
    },
    "skills": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of skill IDs"
    },
    "mcps": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of MCP server IDs"
    },
    "context": {
      "type": "object",
      "description": "Domain-specific contextual knowledge"
    },
    "inheritance": {
      "type": "object",
      "properties": {
        "extends": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "overrides": {
          "type": "object"
        }
      }
    },
    "metadata": {
      "type": "object",
      "properties": {
        "tags": {
          "type": "array",
          "items": {
            "type": "string"
          }
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
        }
      }
    }
  }
}
```

### 8.3 Configuration Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["version"],
  "properties": {
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$",
      "description": "Configuration schema version"
    },
    "activeRoles": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "List of currently active role IDs"
    },
    "customRoles": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/role"
      },
      "description": "User-defined custom roles"
    },
    "preferences": {
      "type": "object",
      "properties": {
        "autoActivate": {
          "type": "boolean",
          "default": true
        },
        "conflictResolution": {
          "type": "string",
          "enum": ["merge", "priority", "explicit"],
          "default": "merge"
        },
        "skillPriority": {
          "type": "string",
          "enum": ["role-defined", "user-defined"],
          "default": "role-defined"
        }
      }
    }
  }
}
```

---

## 9. Use Cases

### 9.1 Enterprise Use Cases

#### 9.1.1 Development Team Onboarding

**Scenario**: New developers join a team and need consistent tooling.

**Solution**:
```bash
# Team lead creates shared role configuration
claude role create team-frontend-dev --extends frontend-developer \
  --add-skills internal-component-lib \
  --add-mcps company-github,company-figma

# New developers activate the role
claude role activate team-frontend-dev
```

**Benefits**:
- Consistent development environment across team
- Reduced onboarding time
- Centralized configuration management

#### 9.1.2 Security Compliance

**Scenario**: Security team needs all analysts to have standardized tools.

**Solution**:
```json
{
  "id": "security-analyst-soc2",
  "name": "Security Analyst (SOC 2 Compliant)",
  "domain": "security",
  "extends": ["security-analyst"],
  "additionalSkills": ["audit-logger", "compliance-checker"],
  "context": {
    "complianceFrameworks": ["SOC 2", "ISO 27001"],
    "requiredAudits": ["quarterly-review", "incident-logging"]
  }
}
```

**Benefits**:
- Ensures compliance requirements met
- Standardizes security workflows
- Simplified audit trails

### 9.2 Personal Use Cases

#### 9.2.1 Parent/Educator

**Scenario**: A parent wants to plan educational activities for their children.

**Solution**:
```bash
claude role activate parent-educator

# Claude now has access to:
# - activity-planner skill
# - worksheet-creator skill
# - schedule-organizer skill
# - educational-resources MCP
```

**User Request**: "Create a week of science activities for my 8-year-old"

**Claude Response**: Uses role context to generate age-appropriate, educational content.

#### 9.2.2 Job Seeker

**Scenario**: Someone actively job hunting needs resume, cover letter, and interview prep assistance.

**Solution**:
```bash
claude role activate job-seeker

# Claude now has access to:
# - docx skill (resume creation)
# - pdf skill (export)
# - interview-prep skill
# - job-search MCP (LinkedIn, Indeed)
```

**Benefits**:
- Contextual job search assistance
- Consistent document formatting
- Interview preparation workflows

### 9.3 Multi-Role Scenarios

#### 9.3.1 Security-Aware Development

**Scenario**: Developer building security-sensitive features.

**Solution**:
```bash
claude role activate "frontend-developer + security-analyst"

# Gets Skills from both roles:
# - Frontend: UI development, testing, design
# - Security: Vulnerability scanning, secure coding, compliance
```

**Benefits**:
- Holistic approach to secure development
- Security considerations in UI design
- Integrated tooling

---

## 10. Implementation Guidelines

### 10.1 Phase 1: Core Framework (Weeks 1-2)

**Deliverables**:
- Domain, Role, and Configuration schemas
- JSON validation utilities
- Basic CLI commands (list, show, activate)
- 5 reference domain definitions

**Technical Requirements**:
- JSON Schema validation library
- Configuration file parser
- Role resolution engine (handles inheritance)
- Basic CLI framework (e.g., Commander.js)

### 10.2 Phase 2: Integration (Weeks 3-4)

**Deliverables**:
- Claude Code integration
- Session management
- Context injection mechanism
- 15-20 example role definitions

**Technical Requirements**:
- Claude Code plugin API integration
- System prompt modification
- Skill loading coordination
- MCP server coordination

### 10.3 Phase 3: Advanced Features (Weeks 5-8)

**Deliverables**:
- Role composition and conflict resolution
- Custom role creation UI
- Role validation and testing
- Community role registry (optional)

**Technical Requirements**:
- Conflict resolution algorithms
- Interactive role builder
- Automated testing for role definitions
- Package registry infrastructure (if applicable)

### 10.4 Testing Strategy

**Unit Tests**:
- Schema validation
- Role inheritance resolution
- Configuration parsing
- Skill/MCP lookup

**Integration Tests**:
- Role activation in Claude Code
- Multi-role composition
- Context injection verification
- Backward compatibility

**User Acceptance Tests**:
- Role discovery workflows
- Configuration migration
- Custom role creation
- CLI usability

---

## 11. Migration Path

### 11.1 For Existing Users

Users with existing Skill configurations can migrate incrementally:

**Step 1: Identify Matching Roles**
```bash
claude role suggest
# Analyzes current Skills/MCPs and suggests matching Roles
# Output: "Your current configuration matches: frontend-developer"
```

**Step 2: Preview Migration**
```bash
claude role migrate --preview frontend-developer
# Shows what would change
```

**Step 3: Execute Migration**
```bash
claude role migrate frontend-developer
# Converts current configuration to role-based configuration
# Preserves custom Skills/MCPs as overrides
```

### 11.2 Rollback Mechanism

```bash
claude role rollback
# Reverts to pre-migration configuration
```

### 11.3 Hybrid Mode

Users can mix role-based and traditional configurations:

```json
{
  "activeRoles": ["frontend-developer"],
  "additionalSkills": ["custom-skill-1", "custom-skill-2"],
  "additionalMCPs": ["custom-mcp"]
}
```

---

## 12. Security and Privacy

### 12.1 Role Validation

All role definitions must pass validation before activation:

- Schema compliance check
- Skill/MCP existence verification
- Circular dependency detection (in inheritance)
- Permission verification (for MCPs)

### 12.2 Sandboxing

Custom roles from untrusted sources are sandboxed:

- No file system access beyond designated directories
- Network requests limited to approved domains
- Execution time limits
- Resource usage constraints

### 12.3 Privacy Considerations

- Role definitions contain no user data
- Context information is generic (no PII)
- User configurations stored locally
- Optional telemetry (with user consent) for role usage analytics

---

## 13. Performance Considerations

### 13.1 Lazy Loading

Skills and MCPs are loaded on-demand to minimize memory footprint:

```
Role Activation: Load metadata only (~1-5 KB)
First Skill Use: Load skill implementation (~50-500 KB)
Subsequent Uses: Use cached implementation
```

### 13.2 Caching Strategy

- **Role Definitions**: Cached in memory for session duration
- **Skills**: Cached after first load
- **MCPs**: Persistent connections maintained
- **Context**: Pre-compiled and cached

### 13.3 Startup Time

Target startup time with role framework:
- **Without Roles**: 100-200ms (current baseline)
- **With Roles**: 150-250ms (50-100ms overhead for role resolution)

---

## 14. Extensibility

### 14.1 Plugin Architecture

Third parties can extend the framework:

```javascript
// Example plugin
class RolePlugin {
  onRoleActivate(roleId, context) {
    // Custom logic when role activates
  }

  onRoleDeactivate(roleId) {
    // Cleanup logic
  }

  enhanceContext(roleId, context) {
    // Add custom context
    return enrichedContext;
  }
}
```

### 14.2 Community Contributions

Community members can contribute:

- **Domain Definitions**: New domains for specialized fields
- **Role Definitions**: New roles within existing domains
- **Custom Skills**: Skills tailored to roles
- **Context Libraries**: Domain-specific knowledge bases

### 14.3 Versioning Strategy

Roles, Domains, and the framework itself use semantic versioning:

- **Major version**: Breaking changes to schema or behavior
- **Minor version**: New features, backward compatible
- **Patch version**: Bug fixes

---

## 15. Future Directions

### 15.1 AI-Assisted Role Discovery

Use Claude to suggest roles based on user behavior:

```
Claude analyzes: User frequently uses xlsx, pdf, postgres
Claude suggests: "Would you like to activate the Data Analyst role?"
```

### 15.2 Dynamic Role Composition

Automatically combine roles based on task:

```
User: "Build a secure login page"
Claude: Activates frontend-developer + security-analyst for this task
```

### 15.3 Role Marketplace

Community-driven registry of roles:

- Discover roles created by others
- Share custom roles
- Rate and review roles
- Install with one command: `claude role install community/role-name`

### 15.4 Team Collaboration

Enterprise features for team role management:

- Shared role repositories
- Team-specific role customizations
- Role access controls
- Usage analytics and insights

---

## 16. Comparison with Related Systems

### 16.1 Multi-Agent Systems (CrewAI, AutoGen)

**Similarities**:
- Specialized capabilities organized by function
- Task-oriented design

**Differences**:
- Role Framework: Single Claude instance with context switching
- Multi-Agent: Multiple autonomous agents with communication protocols

### 16.2 RBAC (Role-Based Access Control)

**Similarities**:
- Hierarchical organization of permissions/capabilities
- Role composition and inheritance

**Differences**:
- RBAC: Access control and security
- Role Framework: Capability organization and context

### 16.3 Package Managers (npm, pip)

**Similarities**:
- Dependency management
- Version control
- Community contributions

**Differences**:
- Package Managers: Code libraries
- Role Framework: AI capabilities with context

---

## 17. Open Questions

### 17.1 For Community Discussion

1. **Naming Conventions**: Should role IDs follow strict conventions (e.g., `domain:role-name`)?
2. **Role Granularity**: How specific should roles be? (e.g., "React Developer" vs. "Frontend Developer"?)
3. **Context Format**: Should context use structured formats (JSON-LD, YAML frontmatter)?
4. **Discovery UX**: What's the best user experience for discovering and activating roles?

### 17.2 For Anthropic Consideration

1. **Official Support**: Should this be an official Claude Code feature or community-driven?
2. **Skill API Changes**: Are any changes needed to the Skills API to better support roles?
3. **Performance**: How to optimize role resolution and context injection?
4. **Governance**: Who maintains official domain and role definitions?

---

## 18. Appendices

### Appendix A: Example Domain Definitions

See `/examples/` directory for complete domain definitions:

- `development/` - Software development roles
- `hr/` - Human resources roles
- `security/` - Security and compliance roles
- `operations/` - IT operations and infrastructure roles
- `finance/` - Financial analysis and management roles
- `home-family/` - Home and family management roles
- `personal/` - Personal growth and lifestyle roles

### Appendix B: Glossary

- **Domain**: High-level organizational category grouping related roles
- **Role**: Job function or life role bundling Skills, MCPs, and context
- **Skill**: Individual Claude capability (atomic unit)
- **MCP**: Model Context Protocol server providing external tool integration
- **Context**: Domain-specific knowledge and workflows
- **Inheritance**: Mechanism for roles to extend other roles
- **Composition**: Combining multiple roles for broader capabilities
- **Activation**: Enabling a role and loading its associated Skills/MCPs

### Appendix C: References

1. Claude Skills Documentation: https://docs.anthropic.com/claude/docs/claude-code-skills
2. Model Context Protocol: https://modelcontextprotocol.io/
3. JSON Schema Specification: https://json-schema.org/
4. Semantic Versioning: https://semver.org/

---

## 19. Contributing to This Specification

This specification is a living document. Contributions are welcome:

1. **Discuss**: Open an issue to discuss proposed changes
2. **Draft**: Submit pull requests with detailed explanations
3. **Review**: Participate in community review process
4. **Iterate**: Incorporate feedback and refine

---

## 20. License

This specification is released under the MIT License, allowing free use, modification, and distribution with attribution.

---

**End of Specification**

For questions, feedback, or contributions, please see the project repository or contact the maintainers.
