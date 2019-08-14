const path = require('path');

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);

const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(`../gitignore`);

// Language = String (node, java, etc)
// GitignoreFileName = String (node.gitignore, etc)
// searchFile :: [Language] -> [GitignoreFileName] -> [GitignoreFileName]
const searchFile = languages => file => {
  const filtered = languages.filter(
    i => `${i}.gitignore` === file.toLowerCase()
  );

  return filtered[0];
};

module.exports = {
  CURR_DIR,
  sourceGitignore,
  searchFile
};
