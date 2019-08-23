const fs = require('fs');
const { sourceGitignore, otherThanGitignore } = require('./helper');
const getEditDistance = require('../ed');

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
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

  if (names.length === 0 && suggest.length === 0)
    return console.log(`
  nothing exists
  `);

  if (names.length > 0) {
    console.log(`
  "${names.join(', ')}" exist
    `);
  }

  if (notMatch.length > 0 && suggest.length > 0) {
    console.log(`
  "${notMatch.join(', ')}" doesnt exist, maybe you mean ${suggest.join(', ')}
    `);
  }

  if (notMatch.length > 0 && suggest.length === 0) {
    console.log(`
  "${notMatch.join(', ')}" doesnt exist
    `);
  }
}

module.exports = exist;
