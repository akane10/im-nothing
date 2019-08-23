const path = require('path');

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);

const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(`../gitignore`);

const log = i => console.log('log', i);

// Language = String (node, java, etc)
// GitignoreFileName = String (node.gitignore, etc)
// searchFile :: [Language] -> GitignoreFileName -> Boolean
const searchFile = languages => file => {
  return languages.map(i => `${i}.gitignore`).includes(file.toLowerCase());
};

const otherThanGitignore = i =>
  i !== 'README.md' &&
  i !== 'CONTRIBUTING.md' &&
  i !== 'LICENSE' &&
  i !== '.travis.yml';

module.exports = {
  CURR_DIR,
  sourceGitignore,
  log,
  searchFile,
  otherThanGitignore
};
