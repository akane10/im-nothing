const path = require("path");

const joinPath = path.join;
const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(__dirname, `../../gitignore`);

const log = i => {
  console.log("log", i);
  return i;
};

const otherThanGitignore = i =>
  i !== "README.md" &&
  i !== "CONTRIBUTING.md" &&
  i !== "LICENSE" &&
  i !== ".travis.yml";

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
};

const errHandler = err => {
  console.error(err.message || err);
  process.exit(1);
};

module.exports = {
  CURR_DIR,
  sourceGitignore,
  log,
  otherThanGitignore,
  isThere,
  joinPath,
  errHandler
};
