const path = require('path');
const fs = require('fs');
const getEditDistance = require('../ed');

const joinPath = pathArg => path.join(`${__dirname}`, `${pathArg}`);

const CURR_DIR = process.cwd();
const sourceGitignore = joinPath(`../gitignore`);

const log = i => console.log('log', i);

const otherThanGitignore = i =>
  i !== 'README.md' &&
  i !== 'CONTRIBUTING.md' &&
  i !== 'LICENSE' &&
  i !== '.travis.yml';

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
};

// findEditDistance :: [String] -> [String] -> {key: [String], key: [String]}
function findEditDistance(names, languages) {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const isntThere = names => i => !isThere(names)(i);

  const notMatch = languages.filter(isntThere(names));

  const safeFilter = i => {
    if (i && i.distance <= 3 && i.suggest !== '') {
      return i;
    }
    return null;
  };

  const getDistance = i => {
    return files
      .filter(otherThanGitignore)
      .map(splitFileName)
      .map(toLower)
      .map(ii => {
        return {
          language: i,
          suggest: ii,
          distance: getEditDistance(i, ii)
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .map(safeFilter)
      .filter(Boolean);
  };

  const getSuggest = ([i]) => {
    if (i) return i.suggest;
    return null;
  };

  const suggest = notMatch
    .map(getDistance)
    .map(getSuggest)
    .filter(Boolean);

  return { suggest: suggest || [], notMatch: notMatch || [] };
}

module.exports = {
  CURR_DIR,
  sourceGitignore,
  log,
  otherThanGitignore,
  findEditDistance,
  isThere
};
