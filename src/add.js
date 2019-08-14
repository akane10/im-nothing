const fs = require('fs');
const { CURR_DIR, sourceGitignore, searchFile } = require('./helper');

function writing(files) {
  const report = [];

  const pathToAppend = `${CURR_DIR}/.gitignore`;
  const appendContents = (path_, contents) =>
    fs.appendFileSync(path_, contents);

  files.forEach(i => {
    const contents = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    const replaceDotWithSpace = i.replace(/[.]/g, ' ');
    const commentContent = `\n# ${replaceDotWithSpace}\n` + contents;

    appendContents(pathToAppend, commentContent);

    const [language] = i.split('.');
    report.push(language.toLowerCase());
  });

  const reportMessage = `
  ${report.join()} have been added
  `;
  console.log(reportMessage);
}

function add(languages) {
  if (languages.length === 0) return console.log('no language defined');

  const filesInFolder = fs.readdirSync(sourceGitignore);

  const files = filesInFolder.filter(searchFile(languages));
  writing(files);
}

module.exports = add;
