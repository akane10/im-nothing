const fs = require('fs');
const { sourceGitignore } = require('./helper');

function list() {
  const files = fs.readdirSync(sourceGitignore);
  const f = files.filter(
    i =>
      i !== 'README.md' &&
      i !== '.github' &&
      i !== '.git' &&
      i !== 'CONTRIBUTING' &&
      i !== 'LICENSE' &&
      i !== '.travis.yml'
  );

  const names = f.map(i => {
    const x = i.split('.');
    const onlyName = x[0].toLowerCase();
    return onlyName;
  });
  console.log(names.join(', \n'));
}

module.exports = list;
