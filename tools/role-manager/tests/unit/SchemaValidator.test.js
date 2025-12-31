const SchemaValidator = require('../../lib/core/SchemaValidator');

describe('SchemaValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new SchemaValidator();
  });

  test('should validate a valid domain', () => {
    const validDomain = {
      id: "development",
      name: "Development",
      description: "Software development roles",
      version: "1.0.0",
      roles: ["frontend-developer", "backend-developer"]
    };
    const result = validator.validateDomain(validDomain);
    expect(result.valid).toBe(true);
  });

  test('should fail on invalid domain', () => {
    const invalidDomain = {
      id: "development",
      // missing name, description, etc.
      version: "1.0.0"
    };
    const result = validator.validateDomain(invalidDomain);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
  });

  test('should validate a valid role', () => {
    const validRole = {
      id: "frontend-developer",
      name: "Frontend Developer",
      domain: "development",
      description: "Builds UI",
      version: "1.0.0",
      skills: ["react", "css"],
      mcps: ["github"]
    };
    const result = validator.validateRole(validRole);
    expect(result.valid).toBe(true);
  });
});
