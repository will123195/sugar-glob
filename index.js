var glob = require('glob')
var path = require('path')
var callerPath = require('caller-path')

var scan = module.exports = function scan(opts) {
  if (!(this instanceof scan)) {
    return new scan(opts)
  }

  var caller = callerPath()
  var callerDir = caller.substring(0, caller.lastIndexOf(path.sep))

  this.root = path.normalize(callerDir + path.sep + opts.root)
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

