const fs = require('fs');
const { sourceGitignore, searchFile } = require('./helper');

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const names = files
    .filter(searchFile(languages))
    .map(splitFileName)
    .map(toLower);

  if (names.length === 0)
    return console.log(`
  nothing exists
  `);

  console.log(`
  "${names.join(', ')}" exist
  `);
}

module.exports = exist;
