# Forrest Protocol

## Portable Persistent Task Completion System

*"I'm just going to keep on running"* - Forrest Gump

---

## What is Forrest Protocol?

Forrest Protocol is a portable, multi-context system that brings persistent task completion to AI agents. Inspired by Forrest Gump's simple, unwavering persistence, this protocol enables AI assistants to iteratively work through complex tasks until completion - seeing their previous work, learning from it, and building upon it.

## Why "Forrest"?

The protocol is named after Forrest Gump because he embodies:

✅ **Simple, unwavering persistence** - "I'm running" without overthinking
✅ **Actual completion** - Unlike characters who perpetually fail, Forrest *accomplishes things*
✅ **Innocent optimism** - Similar charm to other persistent characters but with proven results
✅ **No ironic baggage** - Straightforward metaphor without conflicting associations
✅ **Straightforward execution** - No complexity, just "keep moving forward"

### Character Selection Process

We considered several archetypes:
- ❌ **Ralph Wiggum** - Known for failure, not completion
- ❌ **Don Quixote** - Never accepts reality, perpetual failure loop
- ❌ **Captain Ahab** - Dies still chasing, represents obsession not completion
- ✅ **Odysseus** - Strong fit but conflicts with Troy's name (destroys Troy)
- ✅ **Malala Yousafzai** - Unwavering commitment, real-world inspiration
- ✅ **Forrest Gump** - WINNER: Completes things, simple persistence, no baggage

**The "Troy Problem"**: Since the creator is named Troy, using Odysseus (who destroyed Troy) creates ironic friction. Forrest avoids all such complications.

## Project Origins

Forrest Protocol abstracts the "Ralph Wiggum" persistence technique from the Claude Code plugin into a portable, system-agnostic implementation. While the Ralph Wiggum plugin remains a delightful Claude Code-specific tool, Forrest Protocol is the conceptual abstraction that scales across:

- ✅ CLI-based agents (Claude Code, Aider, etc.)
- ✅ General-purpose AI agents (OpenAI, Gemini, etc.)
- ✅ Chat environments (Claude.ai, ChatGPT, etc.)
- ✅ Multi-agent orchestration systems (Sentinel)

## Core Concept

### The Loop Mechanism

```
1. AI receives task instruction
2. AI executes work, modifying files/state
3. AI sees its previous work in the codebase
4. Same instruction is fed again (automatically or manually)
5. AI improves/continues based on what it sees
6. Process repeats until completion signal or max iterations
```

**Key Insight**: The "loop" doesn't mean the AI talks to itself - it means the same prompt is repeated while the AI's work persists in files, creating a self-referential improvement cycle.

### Completion Detection

Tasks complete when:
- **Completion promise detected**: AI outputs a specific signal phrase
- **Success criteria met**: Tests pass, coverage reached, errors fixed, etc.
- **Max iterations reached**: Safety valve prevents infinite loops

## Repository Structure

```
forrest-protocol/
├── README.md                          # This file
├── docs/
│   ├── protocol-specification.md      # Formal protocol definition
│   ├── architecture.md                # System architecture
│   ├── completion-promise-spec.md     # How completion detection works
│   ├── implementation-patterns.md     # Common implementation patterns
│   └── use-cases.md                   # When to use Forrest Protocol
├── python/
│   ├── core/
│   │   ├── forrest_loop.py           # Core loop implementation
│   │   └── completion_detector.py    # Completion signal detection
│   └── requirements.txt
├── implementations/
│   ├── claude-code/                  # Claude Code plugin variant
│   ├── claude-skill/                 # Claude chat skill (this)
│   │   └── knowledge.md             # Skill knowledge base
│   ├── cli-agents/                   # Generic CLI agent wrapper
│   └── general-purpose/              # System-agnostic implementation
├── shared/
│   ├── examples/
│   │   └── sample-prompts.md        # Example task prompts
│   ├── schemas/
│   │   ├── completion-promise-format.md
│   │   └── loop-config-schema.md
├── tests/
└── .gitignore
```

## Implementations

### 1. Claude Code Plugin (Original)
The Ralph Wiggum plugin for Claude Code CLI - uses stop hooks to automatically re-inject prompts.

**Interface**:
```bash
/ralph-loop "Add tests" --completion-promise "TESTS COMPLETE" --max-iterations 10
```

**How it works**:
- User starts loop with command
- Claude works on task
- Stop hook intercepts exit
- Same prompt re-injected automatically
- Repeats until completion promise or max iterations

### 2. Claude Chat Skill (This Implementation)
For use in regular Claude chat environments (not CLI-based).

**Interface**:
Natural language - no special commands!
```
"Help me refactor the auth module and make sure all tests pass"
```

**How it works**:
- Claude detects task needs persistent completion
- Executes work using tools (Read, Edit, Write, Bash)
- Shows progress transparently
- If completion criteria not met, retries with adjusted approach
- Repeats until done
- Mirrors reasoning-model chain-of-thought transparency

**Key Insight for AI Literacy**: Hide the technical machinery.
- No visible `--max-iterations`
- No "Attempt 3 of 5" callouts
- Just feels like "Claude is being thorough"
- Persistence is *invisible* to the user

### 3. CLI Agent Wrapper
Generic wrapper script for any CLI-based AI agent.

**Interface**:
```bash
forrest-loop "prompt" --agent aider --completion-promise "DONE" --max-iterations 15
```

### 4. System-Agnostic Implementation
Portable protocol that any AI system can implement.

## Technology Stack

### Languages
- **Python**: Core protocol, Sentinel integration, CLI tools
- **TypeScript/JavaScript**: Web/browser compatibility, Claude skill, broader ecosystem reach

### Rationale
- Python for backend/orchestration systems
- TypeScript for chat-based and web integrations
- Each implementation is idiomatic to its platform
- Avoids reinventing the wheel

## Design Principles

### 1. Parallel Thinking Over Sequential
Python + TypeScript development in parallel demonstrates modern AI-assisted development patterns.

### 2. Abstraction Over Implementation
The core protocol lives independent of any single platform or agent.

### 3. User-Centric Design
The chat skill hides complexity while maintaining power - perfect for non-technical users.

### 4. Optionality
Multiple implementations ensure users aren't locked into one ecosystem.

## Target Audience

### Primary: AI Literacy Training (Adults 45+)
Troy is building this for his AI Literacy training service. The Forrest Protocol project demonstrates 2026 best practices:
- Parallel thinking over sequential approaches
- Abstraction over rigid implementation
- User-centric design that hides complexity
- Platform optionality and portability

### Secondary: Developers & Power Users
Anyone needing persistent task completion across different AI tools and environments.

## Use Cases

### Good For:
- ✅ Well-defined tasks with clear success criteria
- ✅ Tasks requiring iteration and refinement
- ✅ Greenfield projects building from scratch
- ✅ Debugging and fixing issues
- ✅ Comprehensive test coverage
- ✅ Code refactoring with validation

### Not Good For:
- ❌ Tasks requiring human judgment
- ❌ One-shot operations
- ❌ Unclear success criteria
- ❌ Production debugging requiring immediate intervention

## Getting Started

### For Users (Non-Technical)
Just talk to Claude naturally! Describe what you want accomplished and include clear success criteria:

```
"Organize my photo library by date and event, making sure every photo is categorized"

"Help me build a contact form that validates email addresses and sends notifications"

"Fix all the errors in my project and make sure the tests pass"
```

Claude will apply Forrest Protocol automatically when needed.

### For Developers
Choose your implementation:

#### Claude Code (CLI)
```bash
/plugin install ralph-wiggum@anthropics
/ralph-loop "your task" --completion-promise "DONE" --max-iterations 10
```

#### Claude Chat Skill
The skill is automatically available - just describe your task with clear completion criteria.

#### Generic CLI Agent
```bash
# Install
npm install -g forrest-protocol

# Use
forrest-loop "your task" --agent <agent-name> --completion-promise "DONE"
```

## Key Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Character archetype | Forrest Gump | Actually completes tasks, innocent persistence, no ironic baggage |
| Naming | Forrest Protocol / Forrest [Mode/Agent/Skill] | Captures simplicity + proven completion |
| Languages | Python + TypeScript/JavaScript parallel | Sentinel integration + user optionality + 2026 mindset |
| Repository structure | Single mono-repo with subdirectories | Easier cross-implementation learning; avoid premature splitting |
| Development approach | AI-assisted parallel development | Model the 2026 thinking paradigm for AI Literacy cohort |
| Chat skill design | Invisible persistence, tool-based execution | Perfect for 45+ non-technical users in AI Literacy program |

## Interface Specification

### Generic Format
```bash
forrest-loop "<task prompt>" --completion-promise "<signal>" --max-iterations <n>
```

### Parameters
- `<task prompt>` - Core instruction/task description
- `--completion-promise` - Success signal phrase (e.g., "Done", "Tests Complete")
- `--max-iterations` - Safety valve (maximum retry attempts)

### How It Works
1. AI executes work
2. Attempts to exit
3. Loop hook stops execution if completion-promise not met
4. Refeeds same prompt + failure feedback
5. Repeats until completion-promise string appears in output OR max-iterations reached

## Benefits

### For Users
- ✅ Tasks actually get completed
- ✅ No manual "try again" iterations
- ✅ Transparent progress without overwhelm
- ✅ Builds trust in AI assistance

### For Developers
- ✅ Portable across different AI agents
- ✅ Clear completion detection
- ✅ Safety limits prevent runaway loops
- ✅ Idiomatic to each platform

### For Organizations
- ✅ Consistent task completion methodology
- ✅ Works across different tools in tech stack
- ✅ Teachable pattern for non-technical staff
- ✅ Scales from individual use to orchestration systems

## Project Status

**Current Phase**: Initial implementation and abstraction

✅ Character selection and naming complete
✅ Protocol specification drafted
✅ Claude chat skill implementation created
🚧 Python core implementation in progress
🚧 CLI agent wrapper in progress
⏳ Sentinel integration planned
⏳ Testing and validation planned

## Contributing

This project is in early development. We welcome:
- Implementation feedback
- Use case examples
- Integration suggestions
- Documentation improvements

## Roadmap

### Phase 1: Core Implementations ✅
- [x] Protocol specification
- [x] Claude chat skill
- [ ] Python core library
- [ ] CLI agent wrapper

### Phase 2: Integration & Testing 🚧
- [ ] Sentinel multi-agent integration
- [ ] Cross-platform testing
- [ ] User testing with AI Literacy cohort
- [ ] Documentation refinement

### Phase 3: Ecosystem Growth ⏳
- [ ] Additional agent integrations
- [ ] Community contributions
- [ ] Best practices library
- [ ] Tutorial content

## Philosophy

The Forrest Protocol is built on these principles:

### Simplicity
Like Forrest's "I'm running" - straightforward, no overthinking.

### Completion
Unlike perpetually failing characters, Forrest actually accomplishes things.

### Invisibility
For non-technical users, the persistence mechanism should feel natural, not mechanical.

### Optionality
Users shouldn't be locked into one tool or platform.

### Trust
Reliable execution builds confidence in AI assistance.

## FAQ

### Q: Why not just keep using "Ralph Wiggum"?
**A**: Ralph Wiggum is great for the Claude Code plugin, but the character is known for failing, not completing tasks. Forrest Gump better represents successful persistence. Plus, we wanted a name that works across all platforms, not just one plugin.

### Q: Do I need to learn special commands?
**A**: Not for the chat skill! Just describe your task naturally with clear success criteria. The CLI implementations have command syntax, but the chat variant is pure natural language.

### Q: What if the task is impossible?
**A**: Forrest Protocol includes max-iteration safety limits and will ask for help if stuck after several attempts.

### Q: Can I use this with other AI agents?
**A**: Yes! That's the point. We're creating implementations for multiple agents and a system-agnostic protocol anyone can implement.

### Q: How is this different from just asking Claude to "keep trying"?
**A**: The protocol provides structure: completion detection, progress tracking, safety limits, and consistency across different tools. It's the difference between ad-hoc persistence and a reliable methodology.

## Quote to Remember

*"I'm just going to keep on running"* - Forrest Gump

Simple persistence. Proven results. No ironic baggage.

---

## License

TBD - Project in early development

## Contact

Troy - Cloud Security Architect, Photography Business Owner, AI Literacy Educator

---

**Note**: The Ralph Wiggum plugin remains a delightful implementation detail for Claude Code. Forrest Protocol is the conceptual abstraction that scales.
