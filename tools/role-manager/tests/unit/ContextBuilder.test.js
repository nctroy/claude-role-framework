const ContextBuilder = require('../../lib/core/ContextBuilder');

describe('ContextBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = new ContextBuilder();
  });

  test('builds context string', () => {
    const role = {
      name: 'Tester',
      description: 'Tests things',
      skills: ['test-skill'],
      mcps: ['test-mcp'],
      context: {
        responsibilities: ['Write tests', 'Run tests'],
        primaryLanguages: ['JavaScript'],
        tools: ['Jest']
      }
    };

    const result = builder.buildContext(role);
    
    expect(result).toContain('You are acting as a Tester');
    expect(result).toContain('Tests things');
    expect(result).toContain('Your primary responsibilities include:');
    expect(result).toContain('- Write tests');
    expect(result).toContain('Primary Languages: JavaScript');
    expect(result).toContain('Active Skills: test-skill');
  });
});
