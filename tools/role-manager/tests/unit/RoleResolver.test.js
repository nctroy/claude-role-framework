const RoleResolver = require('../../lib/core/RoleResolver');

// Mock Loader
const mockLoader = {
  roles: {
    'base': {
      id: 'base',
      skills: ['base-skill'],
      context: { framework: ['base-fw'] }
    },
    'child': {
      id: 'child',
      inheritance: { extends: ['base'] },
      skills: ['child-skill'],
      context: { framework: ['child-fw'] }
    },
    'grandchild': {
      id: 'grandchild',
      inheritance: { extends: ['child'] },
      skills: ['grandchild-skill']
    },
    'overrider': {
      id: 'overrider',
      inheritance: {
        extends: ['base'],
        overrides: {
          skills: { remove: ['base-skill'] }
        }
      }
    },
    'circular-a': {
      id: 'circular-a',
      inheritance: { extends: ['circular-b'] }
    },
    'circular-b': {
      id: 'circular-b',
      inheritance: { extends: ['circular-a'] }
    }
  },
  getRole: (id) => mockLoader.roles[id]
};

describe('RoleResolver', () => {
  let resolver;

  beforeEach(() => {
    resolver = new RoleResolver(mockLoader);
  });

  test('resolves simple inheritance', () => {
    const role = resolver.resolveRole('child');
    expect(role.skills).toContain('base-skill');
    expect(role.skills).toContain('child-skill');
    expect(role.context.framework).toContain('base-fw');
    expect(role.context.framework).toContain('child-fw');
  });

  test('resolves deep inheritance', () => {
    const role = resolver.resolveRole('grandchild');
    expect(role.skills).toContain('base-skill');
    expect(role.skills).toContain('child-skill');
    expect(role.skills).toContain('grandchild-skill');
  });

  test('handles overrides', () => {
    const role = resolver.resolveRole('overrider');
    expect(role.skills).not.toContain('base-skill');
  });

  test('detects circular dependency', () => {
    expect(() => {
      resolver.resolveRole('circular-a');
    }).toThrow(/Circular dependency/);
  });

  test('composes multiple roles', () => {
      const composed = resolver.composeRoles(['base', 'child']);
      expect(composed.skills).toContain('base-skill');
      expect(composed.skills).toContain('child-skill');
  });
});
