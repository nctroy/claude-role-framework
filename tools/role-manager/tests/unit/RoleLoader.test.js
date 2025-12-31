const RoleLoader = require('../../lib/core/RoleLoader');
const path = require('path');

describe('RoleLoader', () => {
  let loader;

  beforeEach(() => {
    loader = new RoleLoader();
  });

  test('should load all examples without error', async () => {
    const { domains, roles } = await loader.loadAll();
    
    // Check we loaded something
    expect(domains.length).toBeGreaterThan(0);
    expect(roles.length).toBeGreaterThan(0);
    
    // Specific check for success criteria
    // Expecting at least 8 domains and 26 roles
    expect(domains.length).toBeGreaterThanOrEqual(8);
    expect(roles.length).toBeGreaterThanOrEqual(26);
    
    // Check specific role exists
    const frontend = loader.getRole('frontend-developer');
    expect(frontend).toBeDefined();
    expect(frontend.id).toBe('frontend-developer');
  });
});
