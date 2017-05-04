# rev-file-cli [![Build Status](https://travis-ci.org/benri/rev-file-cli.svg?branch=master)](https://travis-ci.org/benri/rev-file-cli)
This is a cli utlity for adding revision hashes to file names either by renaming the src file or copying it to a destination folder by using the option `-d`


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

## Piping stream output

Information about the files updated or copied will output as string streams. The format of the output will look like this:

```
[original_filepath_1]
[updated_filepath_1]
...
[original_filepath_n]
[updated_filepath_n]
```


## Related

- [rev-file](https://github.com/sindresorhus/rev-file) - API for this module


## License

MIT ©