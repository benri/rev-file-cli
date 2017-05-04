# rev-file-cli [![Build Status](https://travis-ci.org/benri/rev-file-cli.svg?branch=master)](https://travis-ci.org/benri/rev-file-cli)
This is the cli for rev-file

> Get the revved file path of a file


## Install

```
$ npm install --save rev-file-cli
```


## Usage

```
$ revfile --help

	Usage: revfile <path> [<path> ...]

	  Renames a file with rev hash

	Options:

	  -h, --help   Display this usage info
	  -d, --dest   Specify destination directory (if specified, will copy instead of replace)

	Examples
	  $ revfile unicorn.js 
	  unicorn-d41d8cd98f.js

```


## Related

- [rev-file](https://github.com/sindresorhus/rev-file) - API for this module


## License

MIT ©