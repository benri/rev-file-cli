#!/usr/bin/env node
'use strict';
var meow = require('meow');
var revFile = require('rev-file');

var cli = meow({
  help: [
    'Usage',
    '  $ revfile <text>',
    '  $ cat <file> | hasha',
    '',
    'Examples',
    '  $ revfile unicorn ',
    '  1abcb33beeb811dca15f0ac3e47b88d9'
  ]
});

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
  console.log('Please specify a file to rev');
  process.exit(1);
}

if (input) {
  console.log(revFile(input));
} else {
  process.stdin.pipe(revFile.stream()).pipe(process.stdout);
}
