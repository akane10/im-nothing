const fs = require('fs');
const { sourceGitignore, otherThanGitignore } = require('./helper');

function list() {
  const files = fs.readdirSync(sourceGitignore);

  const isFile = i => {
    try {
      const stats = fs.statSync(`${sourceGitignore}/${i}`);
      return stats.isFile();
    } catch (e) {
      return false;
    }
  };
  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const names = files
    .filter(isFile)
    .filter(otherThanGitignore)
    .map(splitFileName)
    .map(toLower);

  const msg = names.join(' | ');
  console.log(msg);
}

module.exports = list;
