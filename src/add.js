const fs = require('fs');
const { CURR_DIR, sourceGitignore, searchFile } = require('./helper');

function appendContents(path_, contents) {
  contents.forEach(i => {
    fs.appendFileSync(path_, i.content);
  });
}

function isFileEmpty(path_) {
  try {
    const content = fs.readFileSync(path_, 'utf8');
    if (content.length === 0) return true;
    return false;
  } catch (e) {
    return false;
  }
}

function writing(files) {
  const pathToAppend = `${CURR_DIR}/.gitignore`;

  const readFolder = i => {
    const content = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    return {
      fileName: i,
      content
    };
  };
  const renameFile = i => {
    const fileName = i.fileName.replace(/[.]/g, ' ');
    return {
      fileName,
      content: i.content
    };
  };
  const commentContent = i => {
    const content = new Map([
      [true, `# ${i.fileName}\n${i.content}`],
      [false, `\n# ${i.fileName}\n${i.content}`]
    ]);
    const isEmpty = isFileEmpty(pathToAppend);
    return {
      fileName: i.fileName,
      content: content.get(isEmpty)
    };
  };

  const data = files
    .map(readFolder)
    .map(renameFile)
    .map(commentContent);

  appendContents(pathToAppend, data);

  const splitFileName = i => i.split(' ');
  const fileNames = data
    .map(i => i.fileName)
    .map(splitFileName)
    .map(([name]) => name.toLowerCase());

  const reportMessage = `
  ${fileNames.join(', ')} have been added
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
