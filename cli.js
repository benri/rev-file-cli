#!/usr/bin/env node
'use strict';
var argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var Readable = require('readable-stream').Readable;
var through = require('through2').obj;
var mv = require('mv');
var mkdirp = require('mkdirp');
var revFile = require('rev-file');

var help = argv.h || argv.help;

if (help || argv._.length === 0) {
  var log = help ? console.log : console.error;
  log('Usage: revfile <path> [<path> ...]');
  log('');
  log('  Renames a file with rev hash');
  log('');
  log('Options:');
  log('');
  log('  -h, --help   Display this usage info');
  log('  -d, --dest   Specify destination directory (if specified, will copy instead of replace)');
  log('');
  log('Examples');
  log('  $ revfile unicorn.js ');
  log('  unicorn-d41d8cd98f.js');
  process.exit(help ? 0 : 1);
}

function toStream(array) {
  var length = array.length;
  var i = 0;
  var rs = new Readable({objectMode: true});
  rs._read = function () {
    rs.push(array[i++]);
    if (i >= length) {
      rs.push(null);
    }
  }
  return rs;
}

var outDir = argv.d || argv.dest || false;

toStream(argv._)
  .pipe(through(function (pathName, enc, next) {
    var self = this;
    glob(pathName, {}, function (err, paths) {
      if (err) {
        return next(err);
      }
      paths.forEach(function (unglobbedPath) {
        self.push(unglobbedPath);
      });
      next();
    });
  }))
  .pipe(through(function (pathName, enc, next) {
    var self = this;
    fs.stat(pathName, function (err, pathStat) {
      if (err) {
        return next(err);
      }
      if (pathStat.isDirectory()) {
        return next();
      }
      if (!pathStat.isFile()) {
        return next(new Error('path is neither file or folder'));
      }

      function done(pathName, outName) {
        self.push({
          oldPath: pathName,
          newPath: outName,
          copy: true
        });
        next();
      }
      
      revFile(pathName).then(function (revPathName) {
        if (outDir) {
          var outName = path.join(outDir, path.basename(revPathName));
          fs.stat(outName, function (err) {
            if (err) {
              if (err.code === 'ENOENT') {
                // file does not exist
                mkdirp(path.dirname(outName), function (err) {
                  if (err) {
                    return next(err);
                  }
                  done(pathName, outName);
                });
              } else {
                next(err);
              }
            } else {
              // file exists
              done(pathName, outName);
            }
          });
        } else {
          self.push({
            oldPath: pathName,
            newPath: revPathName,
            copy: false
          });
          next();
        }
      }).catch(function (err) {
        next(err);
      });
    });
  }))
  .pipe(through(function (pathsObj, enc, next) {
    if (pathsObj.copy) {
      fs.createReadStream(pathsObj.oldPath)
        .pipe(fs.createWriteStream(pathsObj.newPath))
        .on('error', next)
        .on('finish', next);
    } else {
      mv(pathsObj.oldPath, pathsObj.newPath, function (err) {
        if (err) {
          next(err);
        }
      });
      next();
    }
  }))
  .on('error', function (err) {
    console.error(err);
  });
