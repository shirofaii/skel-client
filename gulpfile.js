const gulp = require('gulp');
const webpack = require('webpack-stream');
const fs = require('fs');

gulp.task('client:js', function() {
    return gulp.src(['client/main.tsx'])
        .pipe(webpack({
            output: {filename: 'bundle.js'},
            devtool: "source-map",
            resolve: {
                extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },
            module: {
                loaders: [
                    { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
                ],
                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]
            },
            externals: {
                "react": "React",
                "react-dom": "ReactDOM"
            },
        }))
        .pipe(gulp.dest('build/wwwroot'));
});

gulp.task('www:copy', () => {
    return gulp.src('wwwroot/**').pipe(gulp.dest('build/wwwroot', {overwrite: true, mode: "0744"}))
})

gulp.task('default', ['client:js', 'www:copy'])
