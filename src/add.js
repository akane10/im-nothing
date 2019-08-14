const fs = require('fs');
const { CURR_DIR, sourceGitignore, searchFile } = require('./helper');

function getFile(languages) {
  const filesInFolder = fs.readdirSync(sourceGitignore);
  return filesInFolder.filter(searchFile(languages));
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

  const reportMessage = `
  ${report.join()} have been added
  `;
  console.log(reportMessage);
}

function add(languages) {
  if (languages.length === 0) return console.log('no language defined');

  const files = getFile(languages);
  writing(files);
}

module.exports = add;
