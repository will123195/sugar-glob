var glob = require('glob')
var path = require('path')
var callerPath = require('caller-path')
var clone = require('clone')

var scan = module.exports = function scan(opts) {
  opts = opts || {}
  if (!opts.caller) {
    opts.caller = callerPath()
  }

  if (!(this instanceof scan)) {
    return new scan(opts)
  }

  this.doneFn = function() {}

  if (path.resolve(opts.root) === opts.root) {
    // absolute path specified
    this.root = opts.root
  } else {
    // relative path specified
    var caller = opts.caller
    var callerDir =
      caller.substring(0, caller.lastIndexOf(path.sep))

    this.root = path.normalize([
      callerDir,
      opts.root
    ].join(path.sep))
  }

  this.wildcard = opts.wildcard

}

scan.prototype.file = function(pattern, cb) {
  var self = clone(this)
  self.cb = cb
  var isDirSearch = (pattern.slice(-1) === '/')
  glob(pattern, {
    cwd: self.root,
    mark: true
  }, function(err, files) {
    // filenames containing wildcard char go to the bottom
    if (self.wildcard) {
      var filtered = []
      var unfiltered = []
      files.forEach(function(file) {
        if (file.indexOf(self.wildcard) > -1) {
          return filtered.push(file)
        }
        unfiltered.push(file)
      })
      files = unfiltered.concat(filtered)
    }

    files.forEach(function(file) {
      if (isDirSearch) {
        var isDir = (file.slice(-1) === '/')
        if (!isDir) return
        return cb({
          name: '.',
          dir: file.substring(0, file.length - 1)
        })
      }
      var filename = self.root + path.sep + file
      self.cb({
        name: file,
        dir: path.dirname(file),
        basename: path.basename(file),
        dirname: path.dirname(filename),
        extname: path.extname(file),
        filename: filename
      })
    })
    self.doneFn()
  })
  return self
}

scan.prototype.done = function(cb) {
  this.doneFn = cb
}