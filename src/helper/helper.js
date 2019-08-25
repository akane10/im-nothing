const path = require('path');

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);
const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(`../../gitignore`);

const log = i => {
  console.log('log', i);
  return i;
};

const otherThanGitignore = i =>
  i !== 'README.md' &&
  i !== 'CONTRIBUTING.md' &&
  i !== 'LICENSE' &&
  i !== '.travis.yml';

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
};

module.exports = {
  CURR_DIR,
  sourceGitignore,
  log,
  otherThanGitignore,
  isThere
};
