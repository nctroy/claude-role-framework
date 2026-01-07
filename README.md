# Claude Role Framework

> **CURRENT STATUS: Phase 1 Complete (CLI Implemented)**
> See [PHASE1-STATUS.md](PHASE1-STATUS.md) for details on the current build and how to resume.

> **A hierarchical system for organizing Claude Skills into job functions, making AI assistance intuitive for work and life**

## Vision

Just as people organize their capabilities into roles (Teacher, Chef, Developer, Organizer), Claude's abilities can be grouped into meaningful job functions. This framework makes AI assistance more discoverable, composable, and relatable for everyone - from enterprise teams to everyday users.

## The Big Idea

### Current State
Skills and MCPs are listed individually. Users must:
- Browse 50+ individual skills
- Manually configure each one
- Figure out which combinations make sense
- No organization or context

### With Role Framework
Skills are organized into roles by domain:
```
Domains (Life Areas)
    ↓
Roles (Job Functions)
    ↓
Skills (Specific Capabilities)
```

**Example:**
```
Domain: Home & Family
  └─ Role: Parent/Educator
      ├─ Skills: activity-planner, worksheet-creator, schedule-organizer
      └─ MCPs: educational-resources, calendar, pinterest

Domain: Professional
  └─ Role: Data Analyst
      ├─ Skills: xlsx, pdf, data-viz, statistical-analysis
      └─ MCPs: postgres, bigquery, tableau
```

## Why This Matters

### For Everyone
- **Discoverability**: "I need a meal planner" → Gets relevant skills automatically
- **Mental Model**: Mirrors how humans already think about capabilities
- **Simplicity**: Select a role, not 10 individual skills

### For Work
- **Enterprise Ready**: Map to actual job functions
- **Team Collaboration**: Shared role definitions across organization
- **Onboarding**: New team members activate pre-configured roles

### For Life
- **Everyday Tasks**: Parent, Chef, Organizer, Planner roles
- **Projects**: DIY, Event Planning, Home Management
- **Personal Growth**: Learning, Fitness, Creative roles

## Quick Example

### Instead of This:
```bash
# Manual configuration (confusing!)
claude install pdf
claude install xlsx
claude install data-viz
claude config mcp add postgres
claude config mcp add bigquery
# ...what else do I need?
```

### Do This:
```bash
# Role-based (intuitive!)
claude role activate data-analyst

# Claude automatically has:
# - Skills: xlsx, pdf, data-viz, statistical-analysis
# - MCPs: postgres, bigquery, tableau
# - Context: Data analysis workflows
```

## Real-World Roles

### Work Domains

**Development**
- Frontend Developer
- Backend Developer
- DevOps Engineer
- Full Stack Developer

**Business**
- Data Analyst
- Product Manager
- Marketing Manager
- Sales Representative

**Creative**
- Content Creator
- Graphic Designer
- Video Producer
- UX Designer

### Life Domains

**Home & Family**
- Parent/Educator
- Home Manager
- Meal Planner
- Event Coordinator

**Personal**
- Job Seeker
- Student/Learner
- DIY Enthusiast
- Fitness Coach

**Community**
- Volunteer Coordinator
- Fundraiser
- Community Organizer
- Tutor/Mentor

## Key Features

### 1. Hierarchical Organization
```
Domain → Role → Skills
└─ Many-to-many relationships
   └─ Skills belong to multiple roles
      └─ Roles combine across domains
```

### 2. Composability
```bash
# Single role
claude role activate frontend-developer

# Multiple roles
claude role activate "frontend-developer + security-analyst"

# Custom combo
claude role create "my-role" --extends "data-analyst" --add "pptx,docx"
```

### 3. Context Awareness
Each role has domain-specific knowledge:
- HR role knows HR terminology and templates
- Developer role understands code patterns
- Parent role has age-appropriate activity ideas

### 4. Inheritance
```yaml
base_analyst:
  skills: [xlsx, pdf, data-viz]

financial_analyst:
  extends: base_analyst
  skills: [financial-modeling, forecasting]

marketing_analyst:
  extends: base_analyst
  skills: [campaign-analysis, ab-testing]
```

## Project Status

**Phase 1 Complete - Ready for Anthropic Submission**

- [x] Concept developed
- [x] Initial documentation
- [x] Formal specification (SPECIFICATION.md - 1,250 lines)
- [x] Schema definitions (3 JSON schemas)
- [x] Example role configurations (26 roles across 8 domains)
- [x] CLI tool prototype (fully functional)
- [x] All tests passing (15/15 - 100%)
- [x] Quality review complete (96/100 score)
- [x] Submission package ready
- [ ] Community feedback
- [ ] Official proposal to Anthropic

## Installation

### Prerequisites
- Node.js 16+ (for CLI tool)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/nctroy/claude-role-framework.git
cd claude-role-framework

# Install CLI dependencies
cd tools/role-manager
npm install

# Run tests to verify installation
npm test

# Try the CLI
node bin/claude-role.js list
```

## Usage

### CLI Commands

```bash
# List all available roles and domains
node bin/claude-role.js list

# Show details of a specific role
node bin/claude-role.js show frontend-developer

# Activate a single role (shows combined context)
node bin/claude-role.js activate frontend-developer

# Activate multiple roles (composition)
node bin/claude-role.js activate "frontend-developer+security-analyst"

# Validate a role definition
node bin/claude-role.js validate examples/development/frontend-developer.json
```

### Example Output

```bash
$ node bin/claude-role.js show full-stack-developer

┌─────────────────────┬──────────────────────────────────────────┐
│ Full Stack Developer                                            │
├─────────────────────┼──────────────────────────────────────────┤
│ ID                  │ full-stack-developer                      │
│ Domain              │ Development                               │
│ Extends             │ frontend-developer, backend-developer     │
│ Skills              │ 6 total (canvas-design, web-artifacts-   │
│                     │ builder, mcp-builder, etc.)              │
│ MCPs                │ 9 total (github, npm-registry, docker,   │
│                     │ postgres, redis, etc.)                   │
└─────────────────────┴──────────────────────────────────────────┘
```

## Project Structure

```
claude-role-framework/
├── README.md                    # This file
├── SPECIFICATION.md             # Formal technical spec
├── conversation-log.md          # Design discussion history
├── docs/
│   ├── 01-introduction.md       # Getting started
│   ├── 02-core-concepts.md      # Deep dive into concepts
│   ├── 03-use-cases.md          # Real-world examples
│   └── 04-implementation.md     # How to build with this
├── schemas/
│   ├── domain.schema.json       # Domain definition schema
│   ├── role.schema.json         # Role definition schema
│   └── config.schema.json       # Configuration schema
├── examples/
│   ├── development/             # Dev roles (Frontend, Backend, etc.)
│   ├── hr/                      # HR roles (Recruiter, Manager, etc.)
│   ├── security/                # Security roles (Analyst, Pen Tester, etc.)
│   ├── operations/              # Ops roles (DevOps, SRE, etc.)
│   └── finance/                 # Finance roles (Analyst, Controller, etc.)
├── tools/
│   └── role-manager/            # CLI tool (planned)
└── reference-implementations/
    └── prototypes/              # Proof-of-concept code
```

## Getting Started

### For Anthropic Reviewers
**Start here:** [SUBMISSION-PACKAGE.md](SUBMISSION-PACKAGE.md)
- Executive summary (2-minute read)
- Quick demo instructions (5 minutes)
- Evaluation guide (1 hour deep dive)
- Quality assessment and metrics

### For Concept Learners
1. Read [docs/01-introduction.md](docs/01-introduction.md) - User-friendly introduction
2. Review example roles in [examples/](examples/)
3. Explore the use cases in [docs/03-use-cases.md](docs/03-use-cases.md)
4. See [conversation-log.md](conversation-log.md) for how this idea evolved

### For Technical Reviewers
1. Read [SPECIFICATION.md](SPECIFICATION.md) - Complete technical design (1,250 lines)
2. Review [PHASE1-REVIEW.md](PHASE1-REVIEW.md) - Quality assessment (96/100 score)
3. Study [schemas/](schemas/) - JSON Schema definitions
4. Try the CLI tool (see Installation above)
5. Run tests: `cd tools/role-manager && npm test`

### For Contributors
1. Review [SPECIFICATION.md](SPECIFICATION.md) for technical foundation
2. Study existing roles in [examples/](examples/)
3. Read [docs/04-implementation.md](docs/04-implementation.md) for implementation guide
4. Propose new roles or domains via GitHub issues

## How It Compares

### Multi-Agent Systems (CrewAI, AutoGen)
- **Similar:** Specialized agents for tasks
- **Different:** Separate agents vs. single Claude with role context

### RBAC (AWS IAM, Kubernetes)
- **Similar:** Grouping permissions into roles
- **Different:** Security/access vs. capabilities/skills

### Job Architectures in HR
- **Similar:** Organizing competencies by job function
- **Different:** AI capabilities vs. human skills

## Analogies

### For Non-Technical Users
> "Think of roles like hiring someone. You don't say 'I need someone with Microsoft Word, Excel, and email skills.' You say 'I need an Administrative Assistant.' Roles bundle the skills you need."

### For Technical Users
> "Roles are to Skills what IAM roles are to permissions, or what classes are to methods - organized groupings with inheritance and composition."

## Contributing

This is an open exploration! We welcome:
- **Role definitions** for new domains
- **Use cases** we haven't considered
- **Technical implementations**
- **Feedback** on the concept

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Questions?

- **Is this already a thing?** We haven't found a formal role-based framework specifically for Claude Skills
- **Will Anthropic adopt this?** Unknown - Phase 1 PoC is complete and ready for submission
- **Can I use this now?** Yes! The CLI tool is fully functional (see Installation above)
- **How can I help?** Try the CLI, provide feedback via GitHub issues, suggest new roles, or contribute code

## License

MIT - Free to use, modify, and build upon

## Acknowledgments

Born from a conversation about making Claude Skills more accessible and discoverable. Special thanks to the Claude community and everyone exploring new ways to organize AI capabilities.

---

**Status:** Phase 1 Complete | **Version:** 1.0.0-poc | **Last Updated:** 2025-12-30
