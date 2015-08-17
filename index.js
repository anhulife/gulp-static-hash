'use strict';

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var gutil = require('gulp-util');
var through = require('through2');
var url = require('url');

function sha1(filePath) {
	return crypto.createHash('md5')
		.update(fs.readFileSync(filePath))
		.digest('hex').slice(-7);
}

function buildMD5File(src) {
	var md5 = sha1(src),
		destFullPath = path.join(path.dirname(src), path.basename(src).replace(/\.[^\.]+$/, function(ext){
			return '_' + md5 + ext;
		}));

	if(!fs.existsSync(destFullPath)){
		fs.writeFileSync(destFullPath, fs.readFileSync(src));
	}

	return path.basename(destFullPath);
}

module.exports = function (options) {
	options = options || {};
	var contents, mainPath, reg, asset, md5BuildAsset;

	asset = options.asset || process.cwd();

	md5BuildAsset = options.md5BuildAsset;

	reg = new RegExp('["\'\\(]\\s*([\\w\\_\/\\.\\-]*\\.(' + (options.exts ? options.exts.join('|') : 'jpg|jpeg|png|gif|cur|js|css') + '))([^\\)"\']*)\\s*[\\)"\']', 'gim');

	return through.obj(function (file, enc, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-static-hash', 'Streams are not supported!'));
			return callback();
		}

		mainPath = path.dirname(file.path);

		contents = file.contents.toString().replace(reg, function (content, filePath, ext, other) {
			var fullPath;

			if (/^\//.test(filePath)) {
				fullPath = path.resolve(asset, filePath.slice(1));
			} else {
				fullPath = path.resolve(mainPath, filePath);
			}

			if (fs.existsSync(fullPath)) {
				if (md5BuildAsset) {

					fullPath = path.join(md5BuildAsset, path.relative(asset, fullPath));

					return content.replace(path.basename(filePath), buildMD5File(fullPath));
				} else {
					var hashURL = url.parse(filePath + other, true);
					hashURL.search = '';
					hashURL.query.v = sha1(fullPath);

					return content.replace(other, '').replace(filePath, url.format(hashURL));
				}
			} else {
				return content;
			}
		});

		file.contents = new Buffer(contents);

		this.push(file);
		return callback();
	});
};