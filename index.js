var glob = require('glob')
var path = require('path')
var callerPath = require('caller-path')

var scan = module.exports = function scan(opts) {
  opts = opts || {}
  if (!opts.caller) {
    opts.caller = callerPath()
  }

  if (!(this instanceof scan)) {
    return new scan(opts)
  }

  if (opts.root.substring(0, 1) === path.sep) {
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

}

scan.prototype.file = function(pattern, cb) {
  var self = this
  glob(pattern, {
    cwd: self.root
  }, function(err, files) {
    files.forEach(function(file) {
      var filename = self.root + path.sep + file
      cb({
        name: file,
        dir: path.dirname(file),
        basename: path.basename(file),
        dirname: path.dirname(filename),
        extname: path.extname(file),
        filename: filename
      })
    })
  })
}

