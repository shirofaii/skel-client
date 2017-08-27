const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const webserver = require('gulp-webserver');

// TODO: fix this
gulp.task('client:ts', () => {
    const tsProject = ts.createProject('tsconfig.json')
    const result = gulp.src(['src/**/*.ts', 'src/**/*.tsx'])
        .pipe(sourcemaps.init())
        .pipe(tsProject(ts.reporter.fullReporter()))
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js/'))
})

gulp.task('www:copy', () => {
    return gulp.src('wwwroot/**').pipe(gulp.dest('build/', {overwrite: true, mode: "0744"}))
})

gulp.task('www:libs', () => {
    const libs = [
        "node_modules/react/dist/*.min.js",
        "node_modules/react-dom/dist/*.min.js",
        "node_modules/react-redux/dist/*.min.js",
        "node_modules/immutable/dist/*.min.js",
        "bower_components/lodash/dist/*.min.js",
        "node_modules/redux/dist/*.min.js",
        "node_modules/socket.io-client/dist/*.min.js",
        "node_modules/antd/dist/*.min.js",
        "node_modules/socket.io-client/dist/*.slim.js"
    ]
    return gulp.src(libs).pipe(gulp.dest('build/lib/', {overwrite: true, mode: "0744"}))
})

gulp.task('www:css', () => {
    const libs = [
        "node_modules/antd/dist/*.css"
    ]
    return gulp.src(libs).pipe(gulp.dest('build/css/', {overwrite: true, mode: "0744"}))
})

gulp.task('webserver', () => {
    gulp.src('build/').pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true,
        port: 80
    }));
});

gulp.task('default', ['client:ts', 'www:copy', 'www:libs', 'www:css', 'webserver'])
