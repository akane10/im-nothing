function help() {
  const message = `
  command :
  add <languages> (to generate gitignore)
  list (show all list language available)
  exist <languages> (to check whether the languages exist)
  help

  im-nothing <command>

  github: https://github.com/akane10/im-nothing
  `;
  console.log(message);
}

module.exports = help;
