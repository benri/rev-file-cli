#!/usr/bin/env node
'use strict';
var meow = require('meow');
var revFile = require('rev-file');

var cli = meow({
  help: [
    'Usage',
    '  $ revfile <text>',
    '',
    'Examples',
    '  $ revfile unicorn.js ',
    '  unicorn-d41d8cd98f.js'
  ]
});

var input = cli.input[0];

if (!input && process.stdin.isTTY) {
  console.log('Please specify a file to rev');
  process.exit(1);
}

if (input) {
  console.log(revFile.sync(input));
}
