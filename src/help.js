function help() {
  const message = `
  command :
  add <languages> (to generate gitignore)
  list (show all list language available)
  exist <languages>
  help

  im-nothing <command>
  `;
  console.log(message);
}

module.exports = help;
