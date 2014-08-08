'use strict';
var assert = require('assert');
var gulp = require('gulp');
var concatStream = require('concat-stream');
var staticHash = require('./');

describe('generate hash', function () {
	it('js', function (cb) {
		gulp.src('fixture/**/a.js')
			.pipe(staticHash({cwd: './fixture'}))
			.pipe(gulp.dest('./fixture/'))
			.pipe(concatStream(function(buf){
				buf.forEach(function(item){
					assert.notEqual(-1, item.contents.toString().indexOf('a9f2e1463b2e5f72027b2e9cd8501b2b'));
				});
				cb();
			}));
	});

	it('css', function (cb) {
		gulp.src('fixture/**/a.css')
			.pipe(staticHash({cwd: './fixture'}))
			.pipe(gulp.dest('./fixture/'))
			.pipe(concatStream(function(buf){
				buf.forEach(function(item){
					assert.notEqual(-1, item.contents.toString().indexOf('a9f2e1463b2e5f72027b2e9cd8501b2b'));
				});
				cb();
			}));
	});

	it('html', function (cb) {
		gulp.src('fixture/**/a.html')
			.pipe(staticHash({asset: './fixture'}))
			.pipe(gulp.dest('./fixture/'))
			.pipe(concatStream(function(buf){
				buf.forEach(function(item){
					assert.notEqual(-1, item.contents.toString().indexOf('a9f2e1463b2e5f72027b2e9cd8501b2b'));
				});
				cb();
			}));
	});
});