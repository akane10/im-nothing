const fs = require('fs');
const { CURR_DIR, sourceGitignore } = require('./helper');

function getFile(languages) {
  const f = languages => file => {
    const x = languages.filter(i => `${i}.gitignore` === file.toLowerCase());
    return x[0];
  };

  const files = fs.readdirSync(sourceGitignore);
  const x = files.filter(f(languages));
  return x;
}

function writing(files) {
  const report = [];
  files.forEach(i => {
    const contents = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    const replaceDotWithSpace = i.replace(/[.]/g, ' ');
    fs.appendFileSync(
      `${CURR_DIR}/.gitignore`,
      `\n# ${replaceDotWithSpace}\n` + contents
    );

    const x = i.split('.');
    report.push(x[0].toLowerCase());
  });

  const x = `
  ${report.join()} has been added
  `;
  console.log(x);
}

function add(languages) {
  if (languages.length === 0) return console.log('no language');

  const files = getFile(languages);
  writing(files);
}

module.exports = add;
