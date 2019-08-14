const fs = require('fs');

function getFile(sourceGitignore, languages) {
  const f = ingore => file => {
    const x = ingore.filter(i => `${i}.gitignore` === file.toLowerCase());
    return x[0];
  };

  const files = fs.readdirSync(sourceGitignore);
  const x = files.filter(f(languages));
  return x;
}

function writing(sourceGitignore, files) {
  if (files.length === 0) return console.log('no language');

  files.forEach(i => {
    const contents = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    fs.appendFileSync(
      '.gitignore',
      `\n# ${i.replace(/[.]/g, ' ')}\n` + contents
    );
  });
}

function add(sourceGitignore, languages) {
  const y = getFile(sourceGitignore, languages);
  writing(sourceGitignore, y);
}

module.exports = add;
