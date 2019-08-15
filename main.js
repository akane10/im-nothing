#!/usr/bin/env node

const list = require('./src/list');
const add = require('./src/add');
const help = require('./src/help');
const exist = require('./src/exist');

function unique(arr) {
  return [...new Set(arr)];
}

(function main() {
  const [_, __, command, ...args] = process.argv;

  const languages = unique(args.map(i => i.toLowerCase()));

  if (command === 'add') return add(languages);
  if (command === 'list') return list();
  if (command === 'help') return help();
  if (command === 'exist') return exist(languages);

  console.log(`
  command ${command} doesn't exist

  valid commands are add, list, exist, help
  `);
})();
