/**
 * Created by Me on 1/12/2016.
 * build processor
 */

var paths = {
    index: "app/index.html",
    html: "app/**/*.html",
    scripts: "app/**/*.ts",
    assets: "app/assets/**/*",
    less: "app/styles/main.less",
    tsconfig: "app/tsconfig.json"
};
var gulp = require('gulp');
//var ts = require('gulp-typescript');
//var watch = require('gulp-watch');
var source = require('vinyl-source-stream');
//var connect = require('gulp-connect');
var bowerF = require('main-bower-files');
var amdOptimize = require('amd-optimize');
var plugins = require('gulp-load-plugins')({pattern: 'gulp-*'});
var tsProject = plugins.typescript.createProject(paths.tsconfig);

var pipes = {};

pipes.orderedVendorScripts = function() {
    return plugins.order(['lodash.js', 'math.js', 'require.js']);
};

pipes.builtVendorScripts = function() {
    return gulp.src(bowerF( "**/*.js"))
        .pipe(pipes.orderedVendorScripts())
        .pipe(plugins.filelog())
        .pipe(plugins.concat('vendor.js'))
        .pipe(gulp.dest('./dist/lib'))
        .pipe(plugins.notify({message: 'Vendor JS compiled!'}))
};

pipes.compiledAppModules = function() {
    var tsResult = tsProject.src().pipe(plugins.typescript(tsProject));
    return tsResult.js.pipe(gulp.dest('app'));
};

pipes.bundledAppModules = function (){
    return pipes.compiledAppModules()
        .pipe(amdOptimize('app/main'))
        .pipe(plugins.concat('amd-bundle.js'))
        .pipe(plugins.insert.append('require(["app/main"]);'))
        .pipe(gulp.dest('./dist'))
};

pipes.bundledApp = function () {
    return gulp.src(["./dist/lib/vendor.js", "dist/amd-bundle.js"])
        .pipe(plugins.concat('sheet-music-generator.js', {
            newLine:';'
        }))
        //.pipe($.uglify())
        .pipe(gulp.dest('./dist'))
};

gulp.task('compilebower', function() {
    return pipes.builtVendorScripts();
});

gulp.task('bundleAMD',[], function () {
    return pipes.bundledAppModules();
});

gulp.task('bundleCombine', ['compilebower','bundleAMD'], function () {
    return pipes.bundledApp();
});

/*
 compile typescript
 use ES5 and commonJS module
 */
gulp.task('typescript', function() {
    var tsResult = tsProject.src().pipe(plugins.typescript(tsProject));
    return tsResult.js.pipe(gulp.dest('app'));
});

gulp.task('build', ['bundleCombine']);
/*
 copy all html files and assets
 */
gulp.task('copy', function() {
    gulp.src(paths.html).pipe(gulp.dest('dist'));
    gulp.src(paths.assets).pipe(gulp.dest('dist/assets'));
});
/*
 compile less files
 */
gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
});
/*
 browserify
 now is only for Javascript files
 */
gulp.task('bundler', ['bundleCombine'], function() {
    //browserify('./dist/js/main.js').bundle().pipe(source('main.js')).pipe(gulp.dest('dist/js'));
    return pipes.bundledAppModules();
});
/*
 Web server to test app
 */
gulp.task('webserver', function() {
    plugins.connect.server({
        livereload: true,
        root: ['.', 'dist']
    });
});
/*
 Automatic Live Reload
 */
gulp.task('livereload', function() {
    plugins.notify({message: 'Warning. This is not currently working properly. Please just use gulp build'});
    gulp.src(['dist/styles/*.css', 'dist/js/*.js'])
        .pipe(plugins.watch(['dist/styles/*.css', 'dist/js/*.js']))
        .pipe(plugins.connect.reload());
     });
    /*
     Watch typescript and less
     */
    gulp.task('watch', function() {
        plugins.watch(paths.less, ['less']);
        plugins.watch(paths.scripts, ["bundleAMD"], function (){
            return pipes.bundledApp();
        });
        plugins.watch(paths.html, ['copy']);
        plugins.watch(paths.assets, ['copy']);
    });
    /*
     default task
     */
    //gulp.task('default',['less', 'typescript', 'bundler', 'copy', 'webserver', 'livereload', 'watch']);
gulp.task('default', ['build']);