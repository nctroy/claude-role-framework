# Forrest Protocol - Persistent Task Completion Skill

## What is Forrest Protocol?

Forrest Protocol is an iterative development methodology that helps Claude persistently work through tasks until completion. Named after Forrest Gump and his philosophy of "I'm just going to keep on running," this skill embodies simple, unwavering persistence that actually gets things done.

## Core Philosophy

Like Forrest Gump, this skill represents:
- **Simple, unwavering persistence**: Keep moving forward without overthinking
- **Actual completion**: Unlike techniques that just loop indefinitely, Forrest actually accomplishes things
- **Innocent optimism**: Approach challenges with proven results, not naive hope
- **Straightforward execution**: No complexity, just "keep moving forward"

## When to Use This Skill

Use Forrest Protocol for tasks that require:

### Good candidates:
- **Multi-step processes** that need iteration and refinement
- **Complex implementations** where you might need several attempts to get right
- **Tasks with clear success criteria** that you can verify
- **Greenfield projects** where you're building from scratch
- **Debugging and fixing** issues that require multiple attempts

### Not ideal for:
- **One-shot operations** that either work or don't
- **Tasks requiring human judgment** or design decisions
- **Unclear success criteria** where you can't define "done"
- **Simple, straightforward operations** that don't need iteration

## How It Works (Behind the Scenes)

The Forrest Protocol operates on a simple loop:

1. **Execute**: Claude works on the task using available tools
2. **Check**: Evaluate if the completion criteria are met
3. **Adapt**: If not complete, analyze what's missing and adjust approach
4. **Repeat**: Continue until done or safety limit reached

**Critical Difference**: Unlike mechanical loops, Forrest Protocol mirrors human persistence - each iteration sees the previous work, learns from it, and builds upon it.

## Completion Signals

Forrest Protocol needs to know when a task is complete. You define success criteria in your request:

### Explicit completion criteria:
"Add tests until coverage is above 90%"
"Fix all TypeScript errors in the build"
"Refactor the auth module so all tests pass"

### Implicit completion criteria:
"Implement user registration" (complete when feature works)
"Debug the login issue" (complete when issue is resolved)

Claude will internally track completion using a promise mechanism, but this is invisible to you - you'll just see thorough, persistent work.

## Transparency Philosophy

**For non-technical users (45+ demographic):**
- No visible iteration counters ("Attempt 3 of 5")
- No technical jargon about "max-iterations" or "completion promises"
- Just feels like Claude is being thorough and reliable
- Persistence is *invisible* - it just works

**What you will see:**
- Clear progress updates
- Transparent reasoning about what's being done
- Chain-of-thought explanations
- Honest assessment of challenges and solutions

## Usage Patterns

### Pattern 1: Building from Scratch
**User**: "Help me create a contact form with validation that sends emails"

Claude will:
- Create the initial form structure
- Add validation logic
- Implement email sending
- Test and fix issues
- Iterate until everything works together

### Pattern 2: Fixing and Debugging
**User**: "The authentication is broken - users can't log in"

Claude will:
- Investigate the issue
- Implement a fix
- Test the fix
- If tests fail, refine the solution
- Continue until login works properly

### Pattern 3: Comprehensive Tasks
**User**: "Organize my project files by type and add a README for each section"

Claude will:
- Analyze current structure
- Create organized directories
- Move files appropriately
- Generate READMEs
- Verify organization is complete
- Iterate if anything is missing

## Safety Mechanisms

Forrest Protocol includes built-in safety limits:
- **Maximum iterations**: Prevents infinite loops (typically 10-20 attempts)
- **Progress tracking**: Ensures forward momentum
- **Failure detection**: Recognizes when stuck and asks for help

## Integration with Other Tools

Forrest Protocol works seamlessly with:
- **File operations**: Read, Edit, Write tools for code changes
- **Terminal operations**: Bash commands for testing and validation
- **Search tools**: Glob and Grep for finding code
- **Git operations**: Commits, branches, and reviews

## Best Practices

### DO:
- Define clear success criteria upfront
- Give Claude context about the project
- Let the process complete without interruption
- Trust the persistence mechanism

### DON'T:
- Interrupt mid-iteration with new requirements
- Use for simple one-step tasks
- Expect instant completion of complex work
- Skip defining what "done" means

## Example Activations

Simple, natural language - no special commands:

```
"Help me refactor the user service to use dependency injection,
and make sure all tests still pass when you're done"

"Build a dashboard component that shows real-time analytics.
Keep working on it until it's fully functional and styled"

"Fix all the ESLint errors in the src directory"

"Create a comprehensive test suite for the API endpoints
with at least 80% coverage"
```

## The "Keep Running" Metaphor

Like Forrest Gump's cross-country run, this skill:
- Starts with a clear direction
- Maintains steady progress
- Doesn't give up when facing obstacles
- Continues until naturally reaching completion
- Inspires others through reliable execution

## Technical Implementation Notes

### For Claude:

When this skill is invoked, you should:

1. **Acknowledge the task** with clear understanding
2. **Break down the work** into logical steps
3. **Execute iteratively**:
   - Work on the current step
   - Check if completion criteria met
   - If not met: analyze what's missing, adjust approach, continue
   - If met: confirm completion
4. **Show your work** transparently without overwhelming technical detail
5. **Signal completion** when task is truly done

### Completion Detection:

Internally use `<promise>COMPLETION_SIGNAL</promise>` tags to track completion, but:
- NEVER show these tags to the user
- NEVER mention "iteration counts" or "max attempts"
- DO show clear progress and reasoning
- DO communicate honestly about challenges

### Iteration Management:

- Default max iterations: 15
- Each iteration should show measurable progress
- If stuck after 3 attempts at same thing: stop and ask for guidance
- Always finish one aspect before moving to next

## Success Stories (Hypothetical)

### Scenario: Organizing a Photo Library
**User**: "Help me organize my digital photo library by date and event"

Forrest Protocol enables Claude to:
1. Scan the directory structure
2. Read photo metadata
3. Create organized folder structure
4. Move photos to appropriate locations
5. Handle edge cases (missing dates, duplicates)
6. Verify organization is complete
7. Create index file for easy navigation

The user just sees Claude being thorough - the persistence mechanism is invisible.

### Scenario: Building an API Integration
**User**: "Integrate with the Stripe API for payment processing"

Forrest Protocol enables Claude to:
1. Set up Stripe SDK
2. Create payment endpoint
3. Implement error handling
4. Add validation
5. Test with mock data
6. Fix issues found in testing
7. Add logging and monitoring
8. Verify complete integration

The iteration happens naturally - the user just sees steady progress toward a working integration.

## The Human Element

Forrest Protocol is designed to feel human:
- Makes mistakes and learns from them
- Shows thought process transparently
- Admits when uncertain
- Asks for help when stuck
- Celebrates completion genuinely

This makes AI assistance feel more like working with a reliable colleague than operating a machine.

## Accessibility for All Ages

Designed specifically for adults 45+ in AI literacy programs:
- **No technical jargon** in user-facing communication
- **Natural conversation** instead of commands
- **Patient explanations** without condescension
- **Reliable execution** that builds trust
- **Transparent progress** without information overload

## Quote to Remember

*"I'm just going to keep on running"* - Forrest Gump

Simple persistence. Proven results. No ironic baggage.

---

## Skill Invocation

This skill activates automatically when Claude detects a task that requires persistent, iterative completion. You don't need to invoke it manually - just describe what you want accomplished with clear success criteria, and Claude will apply the Forrest Protocol methodology naturally.
