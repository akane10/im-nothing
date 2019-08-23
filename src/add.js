const fs = require('fs');
const {
  CURR_DIR,
  sourceGitignore,
  isThere,
  findEditDistance
} = require('./helper');

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
    return true;
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

  return data;
}

function reporting(data, languages) {
  const splitFileName = i => i.split(' ');
  const fileNames = data
    .map(i => i.fileName)
    .map(splitFileName)
    .map(([name]) => name.toLowerCase());

  const distance = findEditDistance(data, languages);

  if (fileNames.length === 0 && distance.suggest.length === 0)
    return console.log(`
  nothing added
  `);

  if (fileNames.length > 0) {
    console.log(`
  "${fileNames.join(', ')}" have been added
  `);
  }

  if (distance.notMatch.length > 0 && distance.suggest.length > 0) {
    console.log(`
  "${distance.notMatch.join(
    ', '
  )}" doesnt exist, maybe you mean ${distance.suggest.join(', ')}
    `);
  }

  if (distance.notMatch.length > 0 && distance.suggest.length === 0) {
    console.log(`
  "${distance.notMatch.join(', ')}" doesnt exist
    `);
  }
}

function add(languages) {
  if (languages.length === 0) return console.log('no language defined');

  const filesInFolder = fs.readdirSync(sourceGitignore);

  const splitFileName = i => i.split('.');
  const toLower = ([name]) => name.toLowerCase();

  const files = filesInFolder
    .map(splitFileName)
    .map(toLower)
    .filter(isThere(languages));

  const data = writing(files);
  reporting(data, languages);
}

module.exports = add;
