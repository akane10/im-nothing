const fs = require('fs');
const CURR_DIR = process.cwd();

function getFile(ignore) {
  const f = ingore => file => {
    const x = ingore.filter(i => `${i}.gitignore` === file.toLowerCase());
    return x[0];
  };

  const files = fs.readdirSync(`${CURR_DIR}/gitignore`);
  const x = files.filter(f(ignore));
  return x;
}

function writing(sourceGitignore, files) {
  files.forEach(i => {
    const contents = fs.readFileSync(`${sourceGitignore}/${i}`, 'utf8');
    console.log(contents + '\n');
    fs.appendFileSync(
      '.gitignore',
      `\n# ${i.replace(/[.]/g, ' ')}\n` + contents + '\n'
    );
  });
}

(function main() {
  const sourceGitignore = `${CURR_DIR}/gitignore`;
  const x = ['ada', 'haskell', 'java'];
  const y = getFile(x);
  // console.log(y);
  writing(sourceGitignore, y);
})();
