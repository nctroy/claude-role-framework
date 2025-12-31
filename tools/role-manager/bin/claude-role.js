#!/usr/bin/env node

const { Command } = require('commander');
const pkg = require('../package.json');
const list = require('../lib/commands/list');
const show = require('../lib/commands/show');
const activate = require('../lib/commands/activate');
const validate = require('../lib/commands/validate');

const program = new Command();

program
  .name('claude-role')
  .description('Claude Role Framework Manager')
  .version(pkg.version);

program.command('list')
  .description('List available domains and roles')
  .option('-d, --domain <domainId>', 'List roles in specific domain')
  .action(list);

program.command('show')
  .description('Show details for a specific role')
  .argument('<roleId>', 'Role ID')
  .option('--json', 'Output as JSON')
  .action(show);

program.command('activate')
  .description('Activate a role (or composition of roles)')
  .argument('<roleIds>', 'Role ID or "role1+role2"')
  .option('--dry-run', 'Simulate activation without outputting context')
  .action(activate);

program.command('validate')
  .description('Validate a domain or role JSON file')
  .argument('<file>', 'Path to JSON file')
  .option('-v, --verbose', 'Show detailed error messages')
  .action(validate);

program.parse();
