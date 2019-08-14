const fs = require('fs');
const { CURR_DIR, sourceGitignore } = require('./helper');

function getFile(languages) {
  const f = ingore => file => {
    const x = ingore.filter(i => `${i}.gitignore` === file.toLowerCase());
    return x[0];
  };

  const files = fs.readdirSync(sourceGitignore);
  const x = files.filter(f(languages));
  return x;
}

function writing(files) {
  files.forEach(i => {
    const contents = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    fs.appendFileSync(
      `${CURR_DIR}/.gitignore`,
      `\n# ${i.replace(/[.]/g, ' ')}\n` + contents
    );
  });
}

function add(languages) {
  if (languages.length === 0) return console.log('no language');

  const files = getFile(languages);
  writing(files);
}

module.exports = add;
