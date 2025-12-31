# Core Concepts

## Overview

This guide provides a deep dive into the Claude Role Framework architecture. You'll learn how domains, roles, and skills relate to each other, how inheritance and composition work, and how the framework manages context and lifecycle.

If you haven't read the [Introduction](01-introduction.md), start there for foundational concepts.

## Architectural Hierarchy

The framework implements a three-tier hierarchy that mirrors organizational structures in the real world.

### The Three Tiers

```
┌─────────────────────────────────────┐
│ Domain: Development                 │  Tier 1: Organizational Unit
│ (Software engineering roles)        │
└────────────┬────────────────────────┘
             │
             ├─► Role: Frontend Developer     Tier 2: Job Function
             │   ├─ Skills: canvas-design, web-artifacts-builder
             │   ├─ MCPs: github, npm-registry, figma
             │   └─ Context: Frontend workflows
             │
             ├─► Role: Backend Developer       Tier 2: Job Function
             │   ├─ Skills: api-builder, database-manager
             │   ├─ MCPs: github, postgres, redis
             │   └─ Context: Backend patterns
             │
             └─► Role: Full Stack Developer    Tier 2: Job Function
                 ├─ Extends: frontend-developer, backend-developer
                 ├─ Skills: system-architecture
                 └─ Context: Full stack workflows
```

### Why Three Tiers?

**One Tier (Flat Skills List)**
- Too granular for discovery
- No organizational context
- Overwhelming for users

**Two Tiers (Skills → Roles)**
- Better, but roles become scattered
- No domain organization
- Difficult to browse

**Three Tiers (Domains → Roles → Skills)**
- Natural mental model
- Organized by life area or job category
- Easy browsing and discovery
- Supports both work and life use cases

## Domain Deep Dive

A Domain is the highest-level organizational unit representing an area of work or life.

### Domain Properties

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

**id** (required)
- Unique identifier in kebab-case
- Used for referencing the domain programmatically
- Must match pattern: `^[a-z][a-z0-9-]*$`

**name** (required)
- Human-readable display name
- Shown in user interfaces and documentation

**description** (required)
- Brief explanation of what the domain encompasses
- Helps users understand if this domain is relevant to them

**version** (required)
- Semantic version (e.g., "1.0.0")
- Tracks changes to domain definition
- Enables migration and compatibility checks

**roles** (required)
- Array of role IDs contained in this domain
- Each role belongs to exactly one domain
- Minimum of one role required

**metadata** (optional)
- Additional information for enhanced UX
- Tags for search and filtering
- Icons and colors for visual organization

### Domain Examples

**Work Domains**:
- **Development**: Software engineering and coding
- **HR**: Human resources and people management
- **Security**: Information security and compliance
- **Operations**: IT operations and infrastructure
- **Finance**: Financial analysis and management
- **Marketing**: Marketing and communications

**Life Domains**:
- **Home & Family**: Family management and parenting
- **Personal Growth**: Self-improvement and learning
- **Health & Wellness**: Health and fitness management
- **Community**: Community engagement and volunteering

### Domain Relationships

Domains are independent and don't inherit from each other. However, roles from different domains can be composed together.

```bash
# Roles from different domains working together
claude role activate "frontend-developer + security-analyst"
#                     └─ Development    └─ Security domain
#                        domain
```

## Role Deep Dive

A Role represents a job function, life role, or specialized capability set. Roles are where the framework's power really shines.

### Role Properties

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

**id** (required)
- Unique identifier in kebab-case
- Must be unique across all roles globally
- Pattern: `^[a-z][a-z0-9-]*$`

**name** (required)
- Human-readable role name
- Used in CLI output and documentation

**domain** (required)
- Parent domain ID
- Each role belongs to exactly one domain
- Must reference a valid domain

**description** (required)
- Detailed explanation of the role's purpose
- What kinds of tasks this role supports
- What makes this role distinct

**version** (required)
- Semantic version of the role definition
- Enables upgrades and deprecation management

**skills** (required)
- Array of Skill IDs included in this role
- Can be empty array if role provides only MCPs and context
- Skills can be shared across multiple roles

**mcps** (required)
- Array of MCP server IDs included in this role
- Can be empty array if role provides only Skills and context
- MCPs can be shared across multiple roles

**context** (optional)
- Domain-specific contextual knowledge
- Freeform object structure
- Injected into Claude's system prompt when role is active

**inheritance** (optional)
- Configuration for extending other roles
- Supports single and multiple inheritance
- Override mechanism for customization

**metadata** (optional)
- Additional role information
- Difficulty level (beginner, intermediate, advanced, expert)
- Tags, icons, colors for organization

### Role-Skill Relationships (Many-to-Many)

A powerful feature of the framework is many-to-many relationships between roles and skills.

**One Skill, Many Roles**:
```
Skill: pdf
├─ Legal Counsel (reviewing contracts)
├─ HR Manager (processing applications)
├─ Financial Analyst (analyzing reports)
├─ Marketing Manager (creating materials)
└─ Security Analyst (examining documents)
```

**One Role, Many Skills**:
```
Role: Data Analyst
├─ xlsx (spreadsheet operations)
├─ pdf (document generation)
├─ data-viz (visualization)
└─ statistical-analysis (analysis)
```

**Benefits**:
- **Reusability**: Skills are loaded once, used by many roles
- **Efficiency**: No duplication of skill implementations
- **Flexibility**: Skills can be mixed and matched across domains
- **Cross-Domain**: A skill useful in Finance is also useful in Marketing

### Role-MCP Relationships (Many-to-Many)

MCP servers follow the same many-to-many pattern:

```
MCP: github
├─ Frontend Developer (UI repositories)
├─ Backend Developer (API repositories)
├─ DevOps Engineer (infrastructure repos)
├─ Technical Writer (documentation repos)
└─ Security Analyst (code audits)
```

Each role uses the same MCP server differently based on its context.

## Inheritance and Composition

The framework supports sophisticated inheritance and composition patterns.

### Single Inheritance

A role can extend a single parent role, inheriting all its capabilities.

```json
{
  "id": "financial-analyst",
  "name": "Financial Analyst",
  "domain": "finance",
  "inheritance": {
    "extends": ["base-analyst"]
  },
  "skills": ["financial-modeling", "forecasting"],
  "mcps": ["bloomberg", "quickbooks"]
}
```

**Inheritance Behavior**:
1. Financial Analyst inherits all skills from Base Analyst
2. Financial Analyst inherits all MCPs from Base Analyst
3. Financial Analyst inherits context from Base Analyst
4. Financial Analyst adds its own skills and MCPs
5. Result: Combined capabilities of both roles

**Real-World Analogy**: A Senior Developer extends Junior Developer by adding advanced skills while keeping foundational ones.

### Multiple Inheritance

A role can extend multiple parent roles, creating sophisticated compositions.

```json
{
  "id": "full-stack-developer",
  "name": "Full Stack Developer",
  "domain": "development",
  "inheritance": {
    "extends": ["frontend-developer", "backend-developer"]
  },
  "skills": ["system-architecture"],
  "mcps": ["kubernetes"]
}
```

**Inheritance Behavior**:
1. Inherits all skills from Frontend Developer
2. Inherits all skills from Backend Developer
3. Inherits all MCPs from both parents
4. Merges context from both parents
5. Adds system-architecture skill
6. Adds kubernetes MCP
7. Result: Complete full-stack capability set

**Conflict Resolution**: If both parents define the same skill, it's loaded once (no duplication). If both parents provide conflicting context, the merge strategy (defined in user preferences) determines the result.

### Override Mechanism

Child roles can override inherited properties for customization.

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
      },
      "mcps": {
        "remove": ["basic-charts"],
        "add": ["tableau"]
      }
    }
  }
}
```

**Override Operations**:
- **remove**: Exclude specific inherited skills or MCPs
- **add**: Include additional skills or MCPs
- **replace**: Completely replace inherited lists (rarely used)

### Composition by Activation

Users can compose roles at activation time without defining a new role.

```bash
# Activate two roles simultaneously
claude role activate "frontend-developer + security-analyst"
```

**Composition Behavior**:
- All skills from both roles are available
- All MCPs from both roles are active
- Context from both roles is merged
- No conflicts (additive composition)

**Use Cases**:
- Temporary need for combined capabilities
- Exploring role combinations before creating custom role
- Project-specific requirements

### Composition Strategies

When activating multiple roles, different merge strategies apply.

**Strategy 1: Merge (Default)**
```json
{
  "preferences": {
    "conflictResolution": "merge"
  }
}
```
- Combine all skills from all roles
- Combine all MCPs from all roles
- Merge context using concatenation
- No conflicts possible (additive)

**Strategy 2: Priority**
```json
{
  "preferences": {
    "conflictResolution": "priority",
    "rolePriority": ["frontend-developer", "security-analyst"]
  }
}
```
- When context conflicts, use priority order
- First role in priority list wins
- Skills and MCPs still merged (no conflicts)

**Strategy 3: Explicit**
```json
{
  "preferences": {
    "conflictResolution": "explicit"
  }
}
```
- User is prompted when conflicts detected
- Manual selection of which context to use
- Skills and MCPs still merged automatically

## Context Management

Context is what makes roles truly powerful. It's not just about which tools you have, but how you use them.

### What Is Context?

Context is domain-specific knowledge that influences how Claude responds when a role is active.

**Example: Frontend Developer Context**
```json
{
  "context": {
    "primaryLanguages": ["JavaScript", "TypeScript", "HTML", "CSS"],
    "frameworks": ["React", "Vue", "Angular", "Svelte"],
    "tools": ["Webpack", "Vite", "ESLint", "Prettier"],
    "responsibilities": [
      "Implement responsive user interfaces",
      "Ensure cross-browser compatibility",
      "Optimize frontend performance",
      "Collaborate with designers and backend developers"
    ],
    "bestPractices": [
      "Write semantic HTML",
      "Use CSS Grid for layouts",
      "Implement accessibility standards (WCAG 2.1)",
      "Optimize images and assets",
      "Use component-based architecture"
    ],
    "terminology": {
      "component": "Reusable UI element with encapsulated logic",
      "props": "Properties passed to components",
      "state": "Data that changes over component lifetime",
      "hook": "React function for using state and lifecycle"
    }
  }
}
```

### Context Structure

Context is a flexible JSON object. Common patterns include:

**Terminology Definitions**
```json
"terminology": {
  "sprint": "A time-boxed iteration in Agile development",
  "standup": "Daily team synchronization meeting",
  "retrospective": "Team reflection on process improvements"
}
```

**Tool Lists**
```json
"tools": ["Webpack", "Vite", "ESLint", "Prettier"],
"frameworks": ["React", "Vue", "Angular"]
```

**Responsibility Descriptions**
```json
"responsibilities": [
  "Implement responsive user interfaces",
  "Ensure cross-browser compatibility",
  "Optimize frontend performance"
]
```

**Best Practices**
```json
"bestPractices": [
  "Write semantic HTML",
  "Use CSS Grid for layouts",
  "Implement accessibility standards"
]
```

**Templates and Workflows**
```json
"templates": [
  "user-story-template.md",
  "bug-report-template.md"
],
"workflows": [
  "code-review-checklist",
  "deployment-process"
]
```

### Context Injection

When a role is activated, its context is injected into Claude's system prompt.

**Before Injection** (No active role):
```
You are Claude, an AI assistant.
```

**After Injection** (Frontend Developer role active):
```
You are Claude, acting as a Frontend Developer.

Your primary responsibilities include:
- Implement responsive user interfaces
- Ensure cross-browser compatibility
- Optimize frontend performance
- Collaborate with designers and backend developers

You work with these languages: JavaScript, TypeScript, HTML, CSS
You use these frameworks: React, Vue, Angular, Svelte
You have access to: github, npm-registry, figma, browser-devtools

Best practices you follow:
- Write semantic HTML
- Use CSS Grid for layouts
- Implement accessibility standards (WCAG 2.1)
```

This context shapes Claude's responses without the user needing to explain their role every time.

### Context Benefits

**Terminology Awareness**
Claude uses domain-appropriate terminology without explanation.

**Workflow Understanding**
Claude suggests workflows relevant to the role.

**Best Practice Application**
Claude applies role-specific best practices automatically.

**Reduced Repetition**
Users don't need to explain their context with every request.

## Activation and Lifecycle

Understanding how roles activate and behave during a session is key to using the framework effectively.

### Activation Methods

**Configuration-Based Activation**

Specify active roles in your configuration file:
```json
{
  "activeRoles": ["data-analyst"]
}
```

When Claude Code starts, it automatically loads the role.

**CLI-Based Activation**

Activate roles from the command line:
```bash
# Single role
claude role activate data-analyst

# Multiple roles
claude role activate "frontend-developer + security-analyst"
```

These activations are session-scoped by default.

### Activation Lifecycle

```
1. User activates role
   └─> "claude role activate frontend-developer"

2. Framework loads role metadata
   └─> Read frontend-developer.json (~1-5 KB)

3. Framework resolves inheritance
   └─> If role extends others, merge configurations

4. Framework prepares context
   └─> Compile context for system prompt injection

5. Role marked as active
   └─> Skills and MCPs ready for lazy loading

6. User makes request
   └─> "Build a login form"

7. Framework loads required skill
   └─> Load web-artifacts-builder skill (~50-500 KB)

8. Skill executes with role context
   └─> Context influences execution

9. Skill remains cached
   └─> Subsequent uses are instant
```

### Lazy Loading

Skills and MCPs are loaded on-demand to optimize performance:

**On Activation**:
- Role metadata loaded (~1-5 KB)
- Context prepared for injection
- Skills and MCPs registered but not loaded

**On First Use**:
- Skill implementation loaded (~50-500 KB)
- MCP connection established
- Cached for session duration

**On Subsequent Uses**:
- Use cached implementation
- No additional loading time

**Benefits**:
- Fast activation time
- Minimal memory footprint
- Only load what you use

### Session Scope

Role activations have different scope options:

**Session Scope (Default)**
```bash
claude role activate data-analyst
```
- Active for current Claude Code session only
- Deactivated when session ends
- Ideal for temporary or exploratory use

**Persistent Scope**
```bash
claude role activate data-analyst --persistent
```
- Saved to configuration file
- Active in all future sessions
- Ideal for your primary roles

**Project Scope**
```bash
claude role activate data-analyst --project
```
- Active only within current project directory
- Stored in `.claude/roles.json` in project root
- Ideal for project-specific role requirements
- Different projects can have different active roles

### Deactivation

Roles can be deactivated when no longer needed:

```bash
# Deactivate a specific role
claude role deactivate frontend-developer

# Deactivate all roles
claude role deactivate --all
```

**Deactivation Behavior**:
- Role context removed from system prompt
- Skills remain cached (for performance)
- MCPs remain connected (for performance)
- Can be reactivated instantly

## Schema and Validation

The framework uses JSON Schema for validation and consistency.

### Schema Benefits

**Consistency**
All role definitions follow the same structure.

**Validation**
Automatic checking prevents invalid configurations.

**Documentation**
Schema serves as formal specification.

**Tooling**
IDE autocomplete and validation support.

### Domain Schema

Key validation rules:
- `id` must be kebab-case
- `name` must be non-empty string
- `version` must be semantic version
- `roles` must contain at least one role ID
- Color must be valid hex code

### Role Schema

Key validation rules:
- `id` must be unique and kebab-case
- `domain` must reference valid domain
- `skills` must be array (can be empty)
- `mcps` must be array (can be empty)
- `version` must be semantic version
- `difficulty` must be: beginner, intermediate, advanced, or expert

### Validation in Practice

**During Role Creation**:
```bash
claude role create my-role --validate
```
Schema validation runs automatically.

**During Role Import**:
```bash
claude role import team-role.json
```
Invalid roles are rejected with helpful error messages.

**During Activation**:
```bash
claude role activate custom-role
```
Additional validation ensures all referenced skills and MCPs exist.

## Performance Considerations

The framework is designed to have minimal performance impact.

### Startup Time

**Without Roles** (baseline):
- Claude Code startup: 100-200ms

**With Roles**:
- Role metadata loading: 20-40ms
- Inheritance resolution: 10-30ms
- Context preparation: 10-20ms
- Total overhead: 50-100ms
- Claude Code startup: 150-250ms

**Impact**: Negligible for most use cases.

### Memory Footprint

**Role Metadata**:
- Per domain: ~1-5 KB
- Per role: ~2-10 KB
- 50 roles: ~100-500 KB total

**Skill Loading**:
- Only loaded when used
- Cached after first load
- ~50-500 KB per skill

**Total Impact**: Minimal. Roles are lightweight metadata.

### Caching Strategy

**Role Definitions**:
- Cached in memory for session duration
- No disk reads after initial load

**Skills**:
- Lazy loaded on first use
- Cached for session duration
- Shared across all roles using that skill

**MCPs**:
- Persistent connections maintained
- Connection pooling when multiple roles use same MCP

**Context**:
- Pre-compiled and cached
- Injected into system prompt once per activation

## Advanced Patterns

### Role Composition Patterns

**The Specialist Pattern**
```bash
# Base role provides foundation
# Specialized roles add expertise
claude role create security-frontend \
  --extends frontend-developer \
  --add-skill security-audit \
  --add-mcp owasp-zap
```

**The Generalist Pattern**
```bash
# Multiple roles for broad coverage
claude role activate "frontend + backend + devops"
```

**The Project Pattern**
```bash
# Project-specific role combining needed capabilities
claude role create project-alpha \
  --extends data-analyst \
  --add-skill custom-ml-models \
  --add-mcp company-data-warehouse
```

### Context Composition Patterns

**Terminology Merging**
When multiple roles define terminology, terms are merged with no conflicts.

**Best Practice Aggregation**
Best practices from all active roles are combined into a comprehensive list.

**Workflow Intersection**
Workflows that appear in multiple roles are highlighted as critical paths.

## Next Steps

Now that you understand the core concepts, explore:

1. **Use Cases** - See [03-use-cases.md](03-use-cases.md) for real-world examples across different domains.

2. **Implementation** - Ready to build? See [04-implementation.md](04-implementation.md) for developer guidelines.

3. **Examples** - Browse the `/examples` directory for complete role definitions.

## Summary

The Claude Role Framework architecture provides:

- **Three-tier hierarchy**: Domains → Roles → Skills
- **Many-to-many relationships**: Skills and MCPs shared across roles
- **Inheritance and composition**: Single, multiple, and override patterns
- **Context management**: Domain-specific knowledge injection
- **Lazy loading**: Optimal performance with on-demand loading
- **Flexible activation**: Session, persistent, and project scope
- **Schema validation**: Consistent and validated definitions

This architecture creates a powerful, flexible system for organizing Claude's capabilities while maintaining simplicity and performance.
