const fs = require('fs');

// const CURR_DIR = process.cwd();

function list(sourceGitignore) {
  const files = fs.readdirSync(sourceGitignore);
  const f = files.filter(
    i =>
      i !== 'README.md' ||
      i !== '.github' ||
      i !== '.git' ||
      i !== 'CONTRIBUTING' ||
      i !== 'LICENSE' ||
      i !== '.travis.yml'
  );
  f.forEach(i => {
    const x = i.split('.');
    console.log(x[0].toLowerCase());
  });
}

module.exports = list;
