const fs = require('fs');
const { sourceGitignore, isThere } = require('./helper/helper');
const findEditDistance = require('./helper/findEditDistance');

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const names = files
    .map(splitFileName)
    .map(toLower)
    .filter(isThere(languages));

  const isntThere = arr => i => !isThere(arr)(i);
  const notMatch = languages.filter(isntThere(names));
  const distance = findEditDistance(notMatch, files);

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
  "${distance.notMatch.join(', ')}" doesnt exist
    `);
  }
}

module.exports = exist;
