# Forrest Protocol - Claude Skill Implementation Guide

## Quick Start

This is the **Claude Chat Skill** variant of Forrest Protocol - designed for regular Claude conversations (not CLI-based).

## What Makes This Different

Unlike the Claude Code plugin (which uses stop hooks), this skill operates through:
- **Natural language activation** - no special commands
- **Tool-based execution** - uses Read, Edit, Write, Bash, etc.
- **Transparent iteration** - shows work without overwhelming
- **Invisible persistence** - no visible counters or technical jargon

## Installation

### For Claude Code CLI

1. Copy the skill directory to your Claude Code skills location:
   ```bash
   cp -r implementations/claude-skill ~/.claude/skills/forrest-protocol
   ```

2. Restart Claude Code to load the skill

3. The skill will automatically activate when appropriate tasks are detected

### For Other Platforms

This skill is designed for Claude conversations. Adapt the `knowledge.md` file to your platform's skill format.

## How It Works

### Automatic Activation

The skill activates when Claude detects tasks that benefit from persistent completion:
- Multi-step processes requiring iteration
- Complex implementations needing refinement
- Tasks with clear, verifiable success criteria
- Greenfield projects or comprehensive refactors

### Manual Invocation (Optional)

If your platform supports skill commands, you can explicitly invoke it:
```
/forrest-protocol "your task with clear success criteria"
```

But natural language works just as well:
```
"Help me build a contact form with validation.
Keep working on it until it's fully functional."
```

## User Experience

### What Users See
- Clear progress updates
- Transparent reasoning about decisions
- Honest assessment of challenges
- Chain-of-thought explanations

### What Users DON'T See
- Iteration counters ("Attempt 3 of 5")
- Technical completion promise tags
- Max-iterations warnings
- Internal loop mechanics

The persistence mechanism is **invisible** - it just feels like Claude is being thorough and reliable.

## Implementation Details

### For Claude (Internal Behavior)

When this skill is active, follow this pattern:

#### 1. Task Understanding
- Parse the user's request
- Identify success criteria (explicit or implicit)
- Break down into logical steps

#### 2. Iterative Execution
```
WHILE not complete AND iterations < max_iterations:
  - Execute current step using appropriate tools
  - Check if success criteria met
  - If not met:
    * Analyze what's missing or broken
    * Adjust approach
    * Continue to next iteration
  - If met:
    * Confirm completion
    * BREAK
```

#### 3. Completion Detection

**Internal tracking** (invisible to user):
- Use `<promise>COMPLETION_SIGNAL</promise>` tags internally
- Track iteration count
- Monitor progress toward criteria

**User-facing communication**:
- "The contact form is now complete and fully tested"
- "All TypeScript errors have been fixed"
- "Test coverage is now at 85%"

#### 4. Safety Mechanisms

- **Default max iterations**: 15
- **Progress requirement**: Each iteration should show measurable progress
- **Stuck detection**: If attempting same fix 3 times, stop and ask for guidance
- **Transparency**: Always explain challenges honestly

### Example Internal Flow

**User Request**:
```
"Add comprehensive tests to the auth module until coverage is above 90%"
```

**Internal Execution** (invisible to user):
```
Iteration 1:
  - Scan auth module, identify testable functions
  - Create initial test suite
  - Run coverage check: 45%
  - <promise>COVERAGE_45_PERCENT</promise> [NOT DONE]

Iteration 2:
  - Add tests for authentication flows
  - Run coverage check: 68%
  - <promise>COVERAGE_68_PERCENT</promise> [NOT DONE]

Iteration 3:
  - Add edge case tests
  - Run coverage check: 87%
  - <promise>COVERAGE_87_PERCENT</promise> [NOT DONE]

Iteration 4:
  - Add error handling tests
  - Run coverage check: 92%
  - <promise>COVERAGE_92_PERCENT</promise> [DONE ✓]
```

**User-Facing Output**:
```
I've added comprehensive tests to the auth module.

Coverage progression:
- Initial test suite: 45%
- Authentication flows: 68%
- Edge cases: 87%
- Error handling: 92%

The auth module now has 92% test coverage, exceeding the 90% goal.
All tests are passing.
```

### Tool Usage Patterns

#### File Operations
- **Read**: Examine current state
- **Edit**: Make targeted changes
- **Write**: Create new files

#### Testing & Validation
- **Bash**: Run tests, linters, build processes
- **Grep/Glob**: Find files and patterns

#### Version Control
- **Bash (git)**: Only when explicitly requested by user

### Progress Communication

**Good Examples**:
```
✓ "I've created the initial form structure"
✓ "Adding validation logic..."
✓ "Testing the email sending functionality"
✓ "Fixed an issue with the error messages"
✓ "The contact form is now complete and tested"
```

**Avoid**:
```
✗ "Iteration 3 of 10"
✗ "Checking completion promise"
✗ "Max iterations not yet reached"
✗ "Executing loop cycle"
```

## Design Philosophy

### Invisible Persistence

The key innovation of this skill is making persistence **feel natural**:

- **NOT**: "I'm in a loop trying different approaches [Attempt 4/10]"
- **INSTEAD**: "I've refined the validation logic to handle edge cases better"

- **NOT**: "Completion promise not detected, continuing iteration"
- **INSTEAD**: "The form is working, but I noticed the error messages could be clearer. Let me improve that."

### Human-Like Iteration

Mirror how a human would approach the task:
- Work on it
- Test it
- Notice something could be better
- Refine it
- Verify it's complete

NOT like a robot:
- Execute step 1
- Execute step 2
- Check condition
- Loop back
- Increment counter

### Trust Building

Every interaction should build user confidence:
- **Transparency**: Show reasoning and decisions
- **Honesty**: Admit uncertainties and challenges
- **Competence**: Actually complete tasks reliably
- **Clarity**: Explain without overwhelming

## Success Criteria Examples

### Metric-Based
```
"until coverage is above 90%"
"until load time is under 2 seconds"
"while error count > 0"
```

### State-Based
```
"all tests pass"
"build succeeds"
"no linting errors"
```

### Completeness-Based
```
"every endpoint is documented"
"all photos are organized"
"each section has a README"
```

### Functionality-Based
```
"login works for all user types"
"form validates correctly"
"emails are being sent"
```

## Edge Cases

### When to Ask for Help

Stop iterating and ask the user if:
- Same approach failing 3+ times
- No clear path forward
- Ambiguous requirements
- External dependencies needed
- Destructive operations required

### When to Self-Correct

Continue iterating when:
- Clear alternative approach available
- Previous attempt showed progress
- Root cause identified
- Fix is straightforward

### When to Declare Complete

Mark task complete when:
- All explicit criteria met
- Verification confirms success
- No obvious improvements needed
- User satisfaction likely

## Platform Adaptations

### Claude Code CLI
Use this skill alongside the ralph-wiggum plugin:
- Plugin: Automatic loop with stop hooks
- Skill: Guidance and methodology

### Claude Chat (claude.ai)
Primary use case - natural conversation with invisible persistence.

### API Integration
Adapt the methodology for API-based implementations:
- Parse completion criteria from prompts
- Track state across API calls
- Return structured progress updates

### Custom Platforms
Use `knowledge.md` as reference for implementing Forrest Protocol in your platform.

## Testing the Skill

### Verification Tasks

Try these prompts to verify correct behavior:

#### Simple Task (Should NOT over-iterate)
```
"Fix the typo in README.md where it says 'teh' instead of 'the'"
```
Expected: Direct fix, no iteration needed

#### Complex Task (Should iterate)
```
"Build a form validation system that checks email format,
password strength, and required fields. Keep refining until
all edge cases are handled."
```
Expected: Multiple iterations, progressive refinement

#### Metric-Driven Task
```
"Add tests to the user service until coverage is at least 85%"
```
Expected: Iterate until metric achieved, show progress

## Troubleshooting

### Skill Not Activating
- Ensure knowledge.md is in correct location
- Check that task has clear success criteria
- Verify platform supports skills

### Over-Iteration
- Reduce max-iterations default
- Make completion criteria more explicit
- Add progress stagnation detection

### Under-Iteration
- Check completion detection logic
- Verify success criteria are challenging enough
- Ensure progress is being made

## Contributing

To improve this skill:
1. Test with diverse tasks
2. Refine completion detection
3. Improve user communication patterns
4. Add domain-specific knowledge

## Related Documentation

- `../../README.md` - Overall Forrest Protocol overview
- `../../docs/protocol-specification.md` - Formal specification
- `../../shared/examples/sample-prompts.md` - Example prompts
- `knowledge.md` - Skill knowledge base

---

*"I'm just going to keep on running"* - Forrest Gump

Simple persistence. Proven results. Invisible mechanics.
