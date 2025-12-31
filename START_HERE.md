# Start Here

## Quick Context

You're working on the **Claude Role Framework** - a hierarchical system for organizing Claude Skills into job functions (like Data Analyst, Frontend Developer, Parent/Educator, etc.).

## Goal

Develop this concept into a formal proposal to submit to Anthropic.

## What's Already Done

- [x] Core concept defined (see conversation-log.md)
- [x] Project structure created
- [x] README.md written
- [x] Directory structure in place

## What's Next

Work through these in order to build towards an Anthropic submission:

### Phase 1: Core Documentation (Start Here)
1. **SPECIFICATION.md** - Formal technical specification
   - Define the data structures (Domain, Role, Skill)
   - Explain inheritance and composition
   - Document configuration format
   - Specify activation/deactivation behavior

2. **docs/01-introduction.md** - Getting started guide
3. **docs/02-core-concepts.md** - Deep dive into framework
4. **docs/03-use-cases.md** - Real-world examples
5. **docs/04-implementation.md** - Implementation guide

### Phase 2: Schema Definitions
1. **schemas/domain.schema.json** - JSON schema for domains
2. **schemas/role.schema.json** - JSON schema for roles
3. **schemas/config.schema.json** - JSON schema for configuration

### Phase 3: Example Roles (15-20 total)
**Work Domains:**
- Development: Frontend Dev, Backend Dev, DevOps, Full Stack
- Business: Data Analyst, Product Manager, Marketing Manager
- Security: Security Analyst, Pen Tester, Compliance Officer
- Operations: SRE, Cloud Architect, System Admin
- Finance: Financial Analyst, Controller, Accountant

**Life Domains:**
- Home & Family: Parent/Educator, Home Manager, Meal Planner
- Personal: Job Seeker, Student, DIY Enthusiast, Fitness Coach

### Phase 4: Proof of Concept
1. CLI tool prototype
2. Configuration validator
3. Demo video or walkthrough

### Phase 5: Anthropic Submission Package
1. Executive summary
2. Complete specification
3. Example implementations
4. Use case documentation
5. Community feedback (if gathered)

## How to Continue

**Prompt to use:**
```
I'm continuing work on the Claude Role Framework - a hierarchical system
for organizing Skills into job functions.

Please review:
1. README.md - Project overview
2. conversation-log.md - Full design discussion

We're working towards submitting this to Anthropic. Let's start with
creating SPECIFICATION.md - the formal technical specification.

Key requirements:
- No emojis in any documentation
- Professional, clean writing
- Both technical and accessible
- Cover work AND life domains
```

## Key Principles

1. **No emojis** - Keep documentation professional and clean
2. **Universal applicability** - Works for enterprise AND everyday users
3. **Natural mental model** - Mirrors how humans think about roles
4. **Composable** - Roles can inherit and combine
5. **Many-to-many** - Skills belong to multiple roles

## Resources

- **conversation-log.md** - Complete history of how we got here
- **TRANSITION-PLAN.md** - Migration strategy
- **README.md** - Project overview

## Questions to Keep in Mind

1. How do roles activate/deactivate?
2. How does inheritance work?
3. How do we validate configurations?
4. What's the CLI interface?
5. How does this integrate with existing Claude Code?
6. What's the migration path for current users?

---

**Ready to start?** Begin with SPECIFICATION.md and work through the phases systematically.
