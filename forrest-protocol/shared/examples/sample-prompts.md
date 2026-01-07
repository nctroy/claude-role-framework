# Forrest Protocol - Sample Prompts & Use Cases

## Table of Contents
- [Development & Coding](#development--coding)
- [File Organization](#file-organization)
- [Testing & Quality](#testing--quality)
- [Debugging & Fixing](#debugging--fixing)
- [Documentation](#documentation)
- [Data Processing](#data-processing)
- [Non-Technical Use Cases](#non-technical-use-cases)

---

## Development & Coding

### Building New Features

#### Contact Form with Validation
```
Help me create a contact form that:
- Validates email addresses
- Checks for required fields
- Sends email notifications
- Shows success/error messages
Keep working on it until it's fully functional and tested.
```

**Why Forrest Protocol?**
- Multiple components need integration
- Validation requires iteration to get right
- Testing reveals issues that need fixing
- Clear completion: form works end-to-end

#### API Integration
```
Integrate with the Stripe API for payment processing.
Set up webhooks, handle errors, and add comprehensive logging.
Make sure all payment flows work correctly before finishing.
```

**Why Forrest Protocol?**
- External API requires careful integration
- Error handling needs testing
- Multiple endpoints to implement
- Clear completion: payments process successfully

#### Dashboard Component
```
Build a dashboard component that shows real-time analytics.
Include charts for user activity, revenue, and engagement.
Keep refining until it's fully functional and properly styled.
```

**Why Forrest Protocol?**
- Visual component needs iteration
- Multiple data sources to integrate
- Styling requires refinement
- Clear completion: dashboard displays correctly

### Refactoring

#### Dependency Injection
```
Refactor the user service to use dependency injection.
Update all the places that use it, and make sure all tests still pass
when you're done.
```

**Why Forrest Protocol?**
- Changes affect multiple files
- Tests verify correctness
- May need iterations to fix broken references
- Clear completion: tests all pass

#### Code Organization
```
Reorganize the API routes into logical groups.
Separate concerns properly, update imports, and ensure
nothing breaks in the process.
```

**Why Forrest Protocol?**
- Structural changes require careful coordination
- Import updates need verification
- Tests must continue passing
- Clear completion: organization complete, tests pass

---

## File Organization

### Photo Library
```
Help me organize my digital photo library by date and event.
Create folders for each year and month, and move photos accordingly.
Make sure every photo gets categorized and nothing is lost.
```

**Why Forrest Protocol?**
- Large number of files to process
- Edge cases (missing dates, duplicates)
- Verification needed
- Clear completion: all photos organized

### Project Structure
```
Organize my project files into a clean structure.
Separate source code, tests, documentation, and configuration.
Create a README for each major section explaining what's there.
```

**Why Forrest Protocol?**
- Multiple types of files to categorize
- Documentation creation needed
- Structure needs validation
- Clear completion: logical organization with docs

### Archive Old Files
```
Go through my Documents folder and archive anything older than 2 years.
Create organized archives by year and topic.
Make sure nothing important gets archived that shouldn't.
```

**Why Forrest Protocol?**
- Large number of files to review
- Needs judgment and verification
- Multiple archive creation steps
- Clear completion: old files properly archived

---

## Testing & Quality

### Test Coverage
```
Create a comprehensive test suite for the API endpoints.
Cover happy paths, error cases, and edge conditions.
Keep adding tests until coverage is at least 80%.
```

**Why Forrest Protocol?**
- Multiple test scenarios to write
- Coverage threshold to meet
- May discover missing cases
- Clear completion: 80% coverage reached

### Fix Linting Errors
```
Fix all the ESLint errors in the src directory.
Update code to follow the style guide, and make sure
no new errors are introduced.
```

**Why Forrest Protocol?**
- Multiple files may have errors
- Fixes might reveal new issues
- Style guide compliance verification needed
- Clear completion: zero ESLint errors

### End-to-End Testing
```
Write end-to-end tests for the checkout flow.
Cover the complete user journey from cart to confirmation.
Make sure all scenarios work correctly.
```

**Why Forrest Protocol?**
- Complex user flow to test
- Multiple scenarios to cover
- Integration points to verify
- Clear completion: checkout flow fully tested

---

## Debugging & Fixing

### Authentication Issues
```
The authentication is broken - users can't log in.
Debug the issue, fix it, and verify that login works
for all user types.
```

**Why Forrest Protocol?**
- Root cause may take investigation
- Fix might need refinement
- Testing required to verify
- Clear completion: login works

### Performance Problems
```
The dashboard is loading slowly.
Profile the code, identify bottlenecks, and optimize
until load time is under 2 seconds.
```

**Why Forrest Protocol?**
- Investigation needed
- Multiple optimizations may be required
- Performance testing to verify improvements
- Clear completion: sub-2-second load time

### Build Failures
```
Fix all the TypeScript errors preventing the build.
Update types, fix imports, and make sure the project
builds cleanly.
```

**Why Forrest Protocol?**
- Multiple errors may be interconnected
- Fixing one may reveal others
- Build verification needed
- Clear completion: clean build

---

## Documentation

### API Documentation
```
Create comprehensive API documentation for all our endpoints.
Include request/response examples, error codes, and usage notes.
Make sure every endpoint is documented.
```

**Why Forrest Protocol?**
- Multiple endpoints to document
- Examples need creation
- Completeness verification
- Clear completion: all endpoints documented

### User Guide
```
Write a user guide for the admin dashboard.
Include screenshots, step-by-step instructions, and troubleshooting tips.
Cover all major features.
```

**Why Forrest Protocol?**
- Multiple features to document
- Screenshots need capturing
- Comprehensive coverage needed
- Clear completion: all features documented

### Code Comments
```
Add comprehensive comments to the auth module.
Explain the security model, key decisions, and complex logic.
Make sure future developers can understand it easily.
```

**Why Forrest Protocol?**
- Multiple files to comment
- Complex areas need explanation
- Clarity verification
- Clear completion: well-commented codebase

---

## Data Processing

### Data Migration
```
Migrate user data from the old database schema to the new one.
Preserve all relationships, handle missing data gracefully,
and verify that nothing is lost in the migration.
```

**Why Forrest Protocol?**
- Complex data transformation
- Edge cases to handle
- Verification required
- Clear completion: all data migrated correctly

### Report Generation
```
Generate monthly reports from our analytics data.
Create summaries, charts, and trend analysis.
Make sure all metrics are accurate and properly formatted.
```

**Why Forrest Protocol?**
- Multiple data sources to combine
- Calculations need verification
- Formatting requires refinement
- Clear completion: accurate, formatted reports

### Data Cleanup
```
Clean up our customer database.
Remove duplicates, fix inconsistent formatting, and
standardize phone numbers and addresses.
```

**Why Forrest Protocol?**
- Many records to process
- Pattern matching and fixes
- Validation needed
- Clear completion: clean, consistent data

---

## Non-Technical Use Cases

### Email Organization
```
Help me organize my email inbox.
Create folders for different projects and clients,
set up filters, and archive old conversations.
Make sure important emails are easy to find.
```

**Why Forrest Protocol?**
- Large volume to process
- Multiple organizational steps
- Verification of important items
- Clear completion: organized, accessible inbox

### Meeting Notes Compilation
```
Go through my meeting notes from last quarter.
Create a summary document with key decisions,
action items, and follow-ups needed.
```

**Why Forrest Protocol?**
- Multiple documents to review
- Information extraction and synthesis
- Organization into coherent structure
- Clear completion: comprehensive summary

### Research Compilation
```
Research best practices for remote team management.
Compile findings into a practical guide with
recommendations and examples.
```

**Why Forrest Protocol?**
- Multiple sources to investigate
- Information synthesis needed
- Practical recommendations creation
- Clear completion: actionable guide

---

## Pattern Recognition

### Common Elements in Effective Prompts

1. **Clear Task Description**
   - What needs to be done
   - Why it's being done (context)

2. **Success Criteria**
   - Explicit: "until coverage is 80%"
   - Implicit: "make sure it works"
   - Verifiable: "all tests pass"

3. **Scope Boundaries**
   - What files/areas to work in
   - What should not be changed

4. **Quality Expectations**
   - "comprehensive", "thoroughly"
   - "make sure nothing breaks"
   - "properly formatted"

### Completion Signals

Effective prompts include signals that indicate when done:

- **Metric-based**: "until coverage is 80%"
- **State-based**: "all tests pass"
- **Completeness-based**: "every endpoint is documented"
- **Functionality-based**: "login works for all user types"
- **Quality-based**: "load time under 2 seconds"

---

## Anti-Patterns

### What NOT to Use Forrest Protocol For

#### Simple One-Step Tasks
```
❌ "Fix the typo in README.md"
```
**Why not?** Single, straightforward fix doesn't need iteration.

#### Unclear Goals
```
❌ "Make the code better"
```
**Why not?** No clear definition of "done" or success criteria.

#### Judgment-Heavy Decisions
```
❌ "Decide what color scheme looks best"
```
**Why not?** Requires human aesthetic judgment, not iteration.

#### Emergency Fixes
```
❌ "Production is down, fix it now"
```
**Why not?** Needs immediate human intervention, not iterative process.

---

## Prompt Templates

### For Development
```
Build/Create/Implement [FEATURE]
that [SPECIFIC REQUIREMENTS].
Keep working on it until [SUCCESS CRITERIA].
```

### For Refactoring
```
Refactor [CODE/MODULE] to [IMPROVEMENT GOAL].
Update [DEPENDENCIES/RELATED CODE],
and make sure [VERIFICATION CRITERIA].
```

### For Fixing
```
Fix [PROBLEM/ISSUE] in [LOCATION].
Debug the root cause, implement a solution,
and verify that [EXPECTED BEHAVIOR].
```

### For Organization
```
Organize [FILES/DATA] by [CRITERIA].
Create [STRUCTURE], handle [EDGE CASES],
and make sure [COMPLETENESS CRITERIA].
```

### For Testing
```
Create [TEST TYPE] for [COMPONENT/FEATURE].
Cover [SCENARIOS], and keep adding tests
until [COVERAGE GOAL].
```

---

## Advanced Patterns

### Conditional Success
```
Optimize the database queries in the user service.
If optimization doesn't improve performance by 50%,
try a different approach like caching or indexing.
Keep iterating until load time is under 1 second.
```

### Multi-Phase Tasks
```
First, audit all API endpoints for security issues.
Then fix any vulnerabilities you find.
Finally, add tests to prevent regression.
Make sure all three phases are complete.
```

### Exploratory Tasks
```
Investigate why memory usage keeps growing.
Profile the application, identify leaks,
and implement fixes for any issues you discover.
```

---

## Tips for Writing Effective Forrest Protocol Prompts

1. **Be Specific About Success**
   - Define what "done" looks like
   - Include measurable criteria when possible

2. **Provide Context**
   - Explain why the task matters
   - Mention constraints or requirements

3. **Set Boundaries**
   - Specify what should/shouldn't change
   - Identify files or areas to work in

4. **Trust the Process**
   - Let Claude iterate without micromanaging
   - Define the goal, not every step

5. **Use Natural Language**
   - No special commands needed
   - Conversational tone works best

---

## Skill Activation Examples

These prompts naturally trigger Forrest Protocol behavior:

```
"Help me build a user registration system with email verification,
password strength checking, and proper error handling.
Keep refining until it's production-ready."

"Go through the codebase and add proper error handling everywhere.
Make sure all edge cases are covered and errors are logged correctly."

"Create a complete set of integration tests for the payment flow.
Cover success cases, failures, refunds, and edge conditions.
Keep adding tests until we have comprehensive coverage."

"Organize my project documentation into a clear structure.
Create README files, API docs, and a contributor guide.
Make sure everything is easy to find and understand."
```

Each of these:
- ✅ Describes a clear task
- ✅ Includes success criteria
- ✅ Requires iteration to complete
- ✅ Benefits from persistent work
- ✅ Has verifiable completion

---

## Conclusion

Forrest Protocol shines when:
- Tasks have clear, verifiable completion criteria
- Multiple iterations may be needed to get it right
- Work builds upon previous attempts
- Success can be validated programmatically or visually

Just like Forrest's run - simple, persistent, and actually gets somewhere.

*"I'm just going to keep on running"*
