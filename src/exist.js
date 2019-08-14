const fs = require('fs');
const { sourceGitignore } = require('./helper');

function exist(languages) {
  const f = languages => file => {
    const x = languages.filter(i => `${i}.gitignore` === file.toLowerCase());
    return x[0];
  };

  const files = fs.readdirSync(sourceGitignore);
  const x = files.filter(f(languages));

  const names = x.map(i => {
    const x = i.split('.');
    const onlyName = x[0].toLowerCase();
    return onlyName;
  });

  if (names.length === 0) return console.log('nothing exists');

  console.log(`"${names.join(', ')}" exist`);
}

module.exports = exist;
