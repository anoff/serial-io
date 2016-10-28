# serial-io [![Build Status](https://travis-ci.org/anoff/serial-io.svg?branch=master)](https://travis-ci.org/anoff/serial-io) [![Coverage Status](https://coveralls.io/repos/github/anoff/serial-io/badge.svg?branch=master)](https://coveralls.io/github/anoff/serial-io?branch=master)

> serialport interface for batch style commands


## Install

```
$ npm install --save serial-io
```


## Usage

```js
const serialIo = require('serial-io');

serialIo('unicorns');
//=> 'unicorns & rainbows'
```


## API

### serialIo.devices()

### serialIo.send(device, content, {options})

### serialIo.connect(device, {options})

### connection.close()

### connection.send(content, {options})

### connection.state()

### connection.options({options})

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## License

MIT © [anoff](http://github.com/anoff)
