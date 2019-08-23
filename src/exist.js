const fs = require('fs');
const { sourceGitignore, findEditDistance, isThere } = require('./helper');

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const names = files
    // .filter(searchFile(languages))
    .map(splitFileName)
    .map(toLower)
    .filter(isThere(languages));

  const distance = findEditDistance(names, languages);

  if (names.length === 0 && distance.suggest.length === 0)
    return console.log(`
  nothing exists
  `);

  if (names.length > 0) {
    console.log(`
  "${names.join(', ')}" exist
    `);
  }

  if (distance.notMatch.length > 0 && distance.suggest.length > 0) {
    console.log(`
  "${distance.notMatch.join(
    ', '
  )}" doesnt exist, maybe you mean ${distance.suggest.join(', ')}
    `);
  }

  if (distance.notMatch.length > 0 && distance.suggest.length === 0) {
    console.log(`
  "${notMatch.join(', ')}" doesnt exist
    `);
  }
}

module.exports = exist;
