gulp-static-hash
=============

> A gulp plugin for cache files by adding a hash version append their name(like a.js?v=hash).

## Install

```
npm install --save-dev gulp-static-hash
```


## Examples

### Default

```js
var gulp = require('gulp');
var staticHash = require('gulp-static-hash');

gulp.task('static-hash-css', function () {
	gulp.src('static/**/*.css')
		.pipe(staticHash({cwd: 'static'}))
		.pipe(gulp.dest('dest'));
});
```

#### Input:

```html
<link rel="stylesheet" href="main.min.css">
<script src="main.min.js"></script>
<img src="main.png" />
```

#### Output:

```html
<link rel="stylesheet" href="main.min.css?v=a9f2e1463b2e5f72027b2e9cd8501b2b">
<script src="main.min.js?v=a9f2e1463b2e5f72027b2e9cd8501b2b"></script>
<img src="main.png?v=a9f2e1463b2e5f72027b2e9cd8501b2b" />
```

### Options

##### cwd: 'static'

The path to assets in your project

##### exts: ['js', 'css', 'png']

The extension list need add hash version