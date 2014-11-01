sugar-glob
==========

Find files using glob with a little added sugar


![](https://raw.github.com/will123195/sugar-glob/glob.gif)


## Install

```
npm install sugar-glob
```


## Usage

```js
var glob = require('sugar-glob')
var scanner = glob({
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
