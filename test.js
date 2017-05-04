'use strict';
var childProcess = require('child_process');
var test = require('ava');
var fs = require('fs');

var hashes = {
	'test/fixtures/index.js': 'test/tmp/index-77981ed4bd.js',
	'test/fixtures/picture.png': 'test/tmp/picture-d41d8cd98f.png',
	'test/fixtures/styles.css': 'test/tmp/styles-d3fd849156.css',
};
var dest = 'test/tmp';

test.cb('rev a javascript file', function (t) {

	var file = 'test/fixtures/index.js';

  childProcess.execFile('./cli.js', [file, '-d', dest], function (err, stdout, stderr) {
    t.plan(2);

    var original = fs.statSync(file).size;
    t.is(fs.existsSync(hashes[file]), true)
    var revisioned = fs.statSync(hashes[file]).size;

    t.is(original, revisioned);
    t.end();
  });
  
});

test.cb('rev a css file', function (t) {

	var file = 'test/fixtures/picture.png';

  childProcess.execFile('./cli.js', [file, '-d', dest], function (err, stdout, stderr) {
    t.plan(2);

    var original = fs.statSync(file).size;
    t.is(fs.existsSync(hashes[file]), true)
    var revisioned = fs.statSync(hashes[file]).size;

    t.is(original, revisioned);
    t.end();
  });
  
});

test.cb('rev a png file', function (t) {

	var file = 'test/fixtures/styles.css';

  childProcess.execFile('./cli.js', [file, '-d', dest], function (err, stdout, stderr) {
    t.plan(2);

    var original = fs.statSync(file).size;
    t.is(fs.existsSync(hashes[file]), true)
    var revisioned = fs.statSync(hashes[file]).size;

    t.is(original, revisioned);
    t.end();
  });
  
});