# rev-file-cli [![Build Status](https://travis-ci.org/benri/rev-file-cli.svg?branch=master)](https://travis-ci.org/benri/rev-file-cli)
This is the cli for rev-file

> Get the revved file path of a file


## Install

```
$ npm install --save rev-file-cli
```


## Usage

```
$ hasha --help

  Usage
    $ hasha <text>
    $ cat <file> | hasha

  Options
    -a, --algorithm  Cipher algorithm: md5,sha1,sha256,sha512   [Default: sha512]
    -e, --encoding   Output encoding: hex,base64,buffer,binary  [Default: hex]

  Examples
    $ hasha unicorn --algorithm=md5
    1abcb33beeb811dca15f0ac3e47b88d9
```


## Related

- [rev-file](https://github.com/sindresorhus/rev-file) - API for this module


## License

MIT ©