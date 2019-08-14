const fs = require('fs');
const { sourceGitignore } = require('./helper');

function list() {
  const files = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();
  const otherThanGitignore = i =>
    i !== 'README.md' &&
    i !== '.github' &&
    i !== '.git' &&
    i !== 'CONTRIBUTING' &&
    i !== 'LICENSE' &&
    i !== '.travis.yml';

  const names = files
    .filter(otherThanGitignore)
    .map(splitFileName)
    .map(toLower);

  console.log(names.join(', \n'));
}

module.exports = list;
