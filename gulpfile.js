var fs = require('fs');
var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var vueSplit = require('gulp-vuesplit');

var path = {
    src: './src/',
    dest: './build/',
};

// apply custom config
vueify.compiler.applyConfig({
    // ...same as in vue.config.js
})

gulp.task('default', function() {
    return browserify(path.src + 'main.js')
        .transform(vueify)
        .plugin('vueify/plugins/extract-css', {
            out: path.dest + 'bundle.css'
        })
        .bundle()
        .pipe(fs.createWriteStream(path.dest + 'bundle.js'))
})

gulp.task('watch', function() {
    gulp.watch(['src/**'], ['default']);
})
