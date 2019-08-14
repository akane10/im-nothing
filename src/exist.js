const fs = require('fs');
const { sourceGitignore, searchFile } = require('./helper');

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);
  const GitignoreFileNames = files.filter(searchFile(languages));

  const names = GitignoreFileNames.map(i => {
    const splited = i.split('.');

    const onlyName = splited[0].toLowerCase();
    return onlyName;
  });

  if (names.length === 0) return console.log('nothing exists');

  console.log(`"${names.join(', ')}" exist`);
}

module.exports = exist;
