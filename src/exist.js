const fs = require('fs');
const { sourceGitignore, searchFile } = require('./helper');
const getEditDistance = require('../ed');

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
};

const otherThanGitignore = i =>
  i !== 'README.md' &&
  i !== 'CONTRIBUTING.md' &&
  i !== 'LICENSE' &&
  i !== '.travis.yml';

const isFile = i => {
  try {
    const stats = fs.statSync(`${sourceGitignore}/${i}`);
    return stats.isFile();
  } catch (e) {
    return false;
  }
};

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const names = files
    // .filter(searchFile(languages))
    .map(splitFileName)
    .map(toLower)
    .filter(isThere(languages));

  const isntThere = names => i => !isThere(names)(i);

  const notMatch = languages.filter(isntThere(names));

  const saveFilter = i => {
    if (i && i.distance <= 2) {
      return i;
    }
    return {};
  };

  const getDistance = i => {
    return files
      .filter(isFile)
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
      .map(saveFilter);
  };

  const suggestL = notMatch
    .map(getDistance)
    .map(([i]) => i.suggest)
    .filter(Boolean)
    .reduce((acc, val) => acc.concat(val), []);
  // console.log(suggestL);

  if (names.length === 0 && suggestL.length === 0)
    return console.log(`
  nothing exists
  `);

  if (names.length > 0) {
    console.log(`
  "${names.join(', ')}" exist
    `);
  }

  if (notMatch.length > 0) {
    console.log(`
  "${notMatch.join(', ')}" doesnt exist, maybe you mean ${suggestL.join(', ')}
    `);
  }
}

module.exports = exist;
