const fs = require('fs');
const {
  CURR_DIR,
  sourceGitignore,
  searchFile,
  otherThanGitignore,
  log
} = require('./helper');
const getEditDistance = require('../ed');

// isThere :: [String] -> String -> Boolean
const isThere = languages => file => {
  return languages.includes(file.toLowerCase());
};

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
  const files = fs.readdirSync(sourceGitignore);

  const toLower = ([name]) => name.toLowerCase();

  const splitFileName = i => i.split(' ');
  const fileNames = data
    .map(i => i.fileName)
    .map(splitFileName)
    .map(([name]) => name.toLowerCase());

  const isntThere = names => i => !isThere(names)(i);

  const failed = languages.filter(isntThere(fileNames));

  const safeFilter = i => {
    if (i && i.distance <= 3 && i.suggest !== '') {
      return i;
    }
    return null;
  };

  const getDistance = i => {
    return files
      .filter(otherThanGitignore)
      .map(i => i.split('.'))
      .map(toLower)
      .map(ii => {
        return {
          language: i,
          suggest: ii,
          distance: getEditDistance(i, ii)
        };
      })
      .sort((a, b) => a.distance - b.distance)
      .map(safeFilter)
      .filter(Boolean);
  };

  const getSuggest = ([i]) => {
    if (i) return i.suggest;
    return null;
  };

  const suggest = failed
    .map(getDistance)
    .map(getSuggest)
    .filter(Boolean);
  // .map(log);

  if (fileNames.length === 0 && suggest.length === 0)
    return console.log(`
  nothing added
  `);

  if (fileNames.length > 0) {
    console.log(`
  "${fileNames.join(', ')}" have been added
  `);
  }

  // console.log(reportMessage);
  // console.log(`  maybe you mean ${suggest.join(', ')}`);

  if (failed.length > 0 && suggest.length > 0) {
    console.log(`
  "${failed.join(', ')}" doesnt exist, maybe you mean ${suggest.join(', ')}
    `);
  }

  if (failed.length > 0 && suggest.length === 0) {
    console.log(`
  "${failed.join(', ')}" doesnt exist
    `);
  }
}

function add(languages) {
  if (languages.length === 0) return console.log('no language defined');

  const filesInFolder = fs.readdirSync(sourceGitignore);

  const files = filesInFolder.filter(searchFile(languages));
  const data = writing(files);
  reporting(data, languages);
}

module.exports = add;
