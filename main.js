const list = require('./src/list');
const add = require('./src/add');
const help = require('./src/help');

(function main() {
  const [_, __, command, ...args] = process.argv;

  if (command === '-add') return add(args);
  if (command === '-list') return list();
  if (command === '-help') return help();

  console.log(`
  command ${command} doesn't exist

  valid commands are -add, -list, -help
  `);
})();
