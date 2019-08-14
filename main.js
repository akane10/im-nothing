// const fs = require('fs');
const list = require('./src/list');
const add = require('./src/add');

const CURR_DIR = process.cwd();

(function main() {
  const sourceGitignore = `${CURR_DIR}/gitignore`;
  const [_, __, command, ...args] = process.argv;

  if (command === '-add') return add(sourceGitignore, args);
  if (command === '-list') return list(sourceGitignore);

  console.log('command not found');
  // console.log(y);
})();
