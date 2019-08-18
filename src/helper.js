const path = require('path');

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);

const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(`../gitignore`);

// Language = String (node, java, etc)
// GitignoreFileName = String (node.gitignore, etc)
// searchFile :: [Language] -> GitignoreFileName -> Boolean
const searchFile = languages => file => {
  return languages.map(i => `${i}.gitignore`).includes(file.toLowerCase());
};

module.exports = {
  CURR_DIR,
  sourceGitignore,
  searchFile
};
