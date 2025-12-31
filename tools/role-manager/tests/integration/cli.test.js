const list = require('../../lib/commands/list');
const show = require('../../lib/commands/show');
const activate = require('../../lib/commands/activate');
const validate = require('../../lib/commands/validate');
const path = require('path');

// Mock console.log and console.error
const originalLog = console.log;
const originalError = console.error;
const originalExit = process.exit;

describe('CLI Integration', () => {
  let output = [];
  let errors = [];

  beforeEach(() => {
    output = [];
    errors = [];
    console.log = (msg) => output.push(msg || ''); // handle empty logs
    console.error = (msg) => errors.push(msg || '');
    process.exit = jest.fn();
  });

  afterEach(() => {
    console.log = originalLog;
    console.error = originalError;
    process.exit = originalExit;
  });

  test('list command lists domains', async () => {
    await list({});
    const fullOutput = output.join('\n');
    expect(fullOutput).toContain('Available Domains');
    // Expect development domain to be present (based on real examples)
    expect(fullOutput).toMatch(/development/i);
  });

  test('show command displays role details', async () => {
    await show('frontend-developer', {});
    const fullOutput = output.join('\n');
    expect(fullOutput).toContain('Frontend Developer');
    expect(fullOutput).toContain('Skills:');
  });

  test('activate command builds context', async () => {
    await activate('frontend-developer', {});
    const fullOutput = output.join('\n');
    expect(fullOutput).toContain('Context Injection');
    expect(fullOutput).toContain('You are acting as a Frontend Developer');
  });

  test('activate command composes roles', async () => {
    await activate('frontend-developer+backend-developer', {});
    const fullOutput = output.join('\n');
    // Resolver uses "Composed Role" as name for composition
    expect(fullOutput).toContain('Composed Role'); 
  });

  test('validate command checks file', async () => {
    // Need a real file path relative to CWD when running test
    // We are running from tools/role-manager usually
    const filePath = '../../examples/development/frontend-developer.json';
    await validate(filePath, {});
    const fullOutput = output.join('\n');
    expect(fullOutput).toContain('Valid Role definition');
  });
});
