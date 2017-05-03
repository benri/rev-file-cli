'use strict';
var childProcess = require('child_process');
var test = require('ava');
var revFile = require('rev-file');

test('main', function (t) {
  t.plan(1);

  childProcess.execFile('./cli.js', ['unicorn'], function (err, stdout) {
    
    t.is(stdout.trim(), revFile('unicorn'));
  });
});

test('stdin', function (t) {
  t.plan(1);

  childProcess.exec('printf unicorn | ./cli.js', function (err, stdout) {

    t.is(stdout.trim(), revFile('unicorn'));
  });
});
