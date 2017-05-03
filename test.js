'use strict';
var childProcess = require('child_process');
var test = require('ava');
var revFile = require('rev-file');

test.cb('main', function (t) {

  childProcess.execFile('./cli.js', ['test.js'], function (err, stdout, stderr) {
    t.plan(1);

    t.is(stdout.trim(), revFile.sync('test.js'));
    t.end();
  });
  
});