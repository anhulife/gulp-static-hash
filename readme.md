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
		.pipe(staticHash({asset: 'static'}))
		.pipe(gulp.dest('dest'));
});
```

#### Input:

```html
<link rel="stylesheet" href="main.min.css">
<script src="main.min.js"></script>
<img src="main.png" />
<!-- sub version -->
<img src="main.png?sv=20140808" />
```

#### Output:

```html
<link rel="stylesheet" href="main.min.css?v=a9f2e1463b2e5f72027b2e9cd8501b2b">
<script src="main.min.js?v=a9f2e1463b2e5f72027b2e9cd8501b2b"></script>
<img src="main.png?v=a9f2e1463b2e5f72027b2e9cd8501b2b" />
<!-- sub version -->
<img src="main.png?v=a9f2e1463b2e5f72027b2e9cd8501b2b&sv=20140808" />
```

### Options

##### asset: 'static'

The path to assets in your project

##### exts: ['js', 'css', 'png']

The extension list need add hash version

#### md5BuildAsset: 'static'