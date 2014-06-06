var fs 		= require('fs');
var path 	= require('path');
var glob 	= require('glob');
var _ 		= require('lodash');
_.str 		= require('underscore.string');

_.mixin(_.str.exports());

var jsonMerge = function(globString) {
	var data = {};

	if (!globString) {
		return console.error('No glob string provided');
	}

	var files = glob.sync(globString);

	files.forEach(function(filePath) {
		var fileName = path.basename(filePath, '.json');
		var keyName = _.camelize(_.slugify(fileName));
		var file = fs.readFileSync(filePath, 'utf8');

		data[keyName] = JSON.parse(file);
	});

	return data;
}

module.exports = jsonMerge;