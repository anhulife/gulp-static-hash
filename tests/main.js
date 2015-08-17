/* global describe, it */

'use strict';

var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var path = require('path');
var staticHash = require('../index');

function getFile(filePath) {
	return new gutil.File({
		path: filePath,
		base: path.dirname(filePath),
		contents: fs.readFileSync(filePath)
	});
}

function getFixture(filePath) {
	return getFile(path.resolve('tests', 'fixtures', filePath));
}

function getExpected(filePath) {
	return getFile(path.resolve('tests', 'expected', filePath));
}

function compare(name, expectedName, stream, done) {
	stream.on('data', function (newFile) {
		assert.equal(String(getExpected(expectedName).contents), String(newFile.contents));
	});
	stream.on('end', function () {
		done();
	});

	stream.write(getFixture(name));
	stream.end();
}

describe('hash version', function () {
	it('does not append a hash when the file does not exist', function (done) {
		var stream = staticHash();
		compare('css/b.css', 'css/b.css', stream, done);
	});
	it('css', function (done) {
		var stream = staticHash({
			asset: './tests/expected'
		});

		compare('css/a.css', 'css/md5_version.css', stream, done);
	});

	it('html', function (done) {
		var stream = staticHash({
			asset: './tests/expected'
		});

		compare('html/a.html', 'html/md5_version.html', stream, done);
	});

	it('js', function (done) {
		var stream = staticHash({
			asset: './tests/expected'
		});

		compare('js/a.js', 'js/md5_version.js', stream, done);
	});
});

describe('md5 file', function () {
	it('css', function (done) {
		var stream = staticHash({
			asset: './tests/fixtures',
			md5BuildAsset: './tests/expected'
		});

		compare('css/a.css', 'css/md5_file.css', stream, done);
	});

	it('html', function (done) {
		var stream = staticHash({
			asset: './tests/fixtures',
			md5BuildAsset: './tests/expected'
		});

		compare('html/a.html', 'html/md5_file.html', stream, done);
	});

	it('js', function (done) {
		var stream = staticHash({
			asset: './tests/fixtures',
			md5BuildAsset: './tests/expected'
		});

		compare('js/a.js', 'js/md5_file.js', stream, done);
	});
});