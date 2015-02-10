var fs            = require('fs');
var path          = require('path');
var glob          = require('glob');
var stripComments = require('strip-json-comments');
var _             = require('lodash');
_.str             = require('underscore.string');

_.mixin(_.str.exports());

var jsonMerge = function(globString, opt) {
  var data = {};
  var opt = opt || {};
  var config = _.extend({
    nameType: 'underscored'
  }, opt);

  if (!globString) {
    return new Error('No glob string provided');
  }

  var files = glob.sync(globString);
  files.forEach(function(filePath) {
    var fileName = path.basename(filePath, '.json');
    var keyName = (config.nameType !== false) ? _[config.nameType](fileName) : fileName;
    var file = fs.readFileSync(filePath, 'utf8');

    data[keyName] = JSON.parse(stripComments(file));
  });

  return data;
}

module.exports = jsonMerge;