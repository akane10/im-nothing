const fs = require('fs');
const { sourceGitignore, searchFile } = require('./helper');

function exist(languages) {
  const files = fs.readdirSync(sourceGitignore);
  const GitignoreFileNames = files.filter(searchFile(languages));

  const names = GitignoreFileNames.map(i => {
    const [name] = i.split('.');
    return name.toLowerCase();
  });

  if (names.length === 0) return console.log('nothing exists');

  console.log(`"${names.join(', ')}" exist`);
}

module.exports = exist;
