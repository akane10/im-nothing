const fs = require('fs');
const { sourceGitignore } = require('./helper');

function list() {
  const files = fs.readdirSync(sourceGitignore);
  const filtered = files.filter(
    i =>
      i !== 'README.md' &&
      i !== '.github' &&
      i !== '.git' &&
      i !== 'CONTRIBUTING' &&
      i !== 'LICENSE' &&
      i !== '.travis.yml'
  );

  const names = filtered.map(i => {
    const splited = i.split('.');
    const onlyName = splited[0].toLowerCase();
    return onlyName;
  });
  console.log(names.join(', \n'));
}

module.exports = list;
