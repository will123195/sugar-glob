sugar-glob
==========

Find files using [glob](https://github.com/isaacs/node-glob) with a little added sugar


![](https://raw.githubusercontent.com/will123195/sugar-glob/master/glob.gif)


## Install

```
npm install sugar-glob
```


## Usage

```js
var scan = require('sugar-glob')
var scanner = scan({
  root: './my-folder' // relative to this file or absolute path
})
scanner.file('**/*.html', function(file) {
  console.log(file)
})
```

Outputs the following for each file matching the pattern:

```
{ name: 'abc/my-file.html',
  dir: 'abc',
  basename: 'my-file.html',
  dirname: '/Users/will123195/my-folder/abc',
  extname: '.html',
  filename: '/Users/will123195/my-folder/abc/my-file.html' }
```
