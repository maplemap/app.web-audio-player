'use strict';

var gulp = require('gulp'),
    minifyCSS = require('gulp-cssnano'), // minify css
    prefixer = require('gulp-autoprefixer'), // prefix for browsers (-o, -moz)
    rename = require("gulp-rename"), // rename files
    concat = require('gulp-concat'), // concat js
    uglify = require('gulp-uglify'), // minify js
    imagemin = require('gulp-imagemin'), //minify img
    importCss = require('gulp-import-css'), //import css one to one css
    pngquant = require('imagemin-pngquant'), // minify for png files
    rimraf = require('rimraf'), //deleting files
    less = require('gulp-less'), //less compilation
    uncss = require('gulp-uncss'),//delete unused styles
    watch = require('gulp-watch'); // tracking changes to files

var path = {
    build: { //path of build
        js: './dist/js',
        css: './dist/css',
        img: './dist/img',
        fonts: './dist/fonts'
    },
    src: { //path of source
        js: {
            webPlayer: [
                './src/js/config.js',
                './src/js/modules/tmpEngine.js',
                './src/js/views/track.js',
                './src/js/models/track.js',
                './src/js/models/file.js',
                './src/js/collections/track.js',
                './src/js/collections/file.js',
                './src/js/views/player.js',
                './src/js/views/playlist.js',
                './src/js/views/playlist-info.js',
                './src/js/views/modal-window.js',
                './src/js/views/track-list.js',
                './src/js/views/tools.js',
                './src/js/views/file-uploader.js',
                './src/js/views/file-list.js',
                './src/js/views/file.js',
                './src/js/modules/getFiles.js',
                './src/js/modules/ID3Tags.js',
                './src/js/plugins/id3-minimized.js',
                './src/js/app.js'
            ],
            dependencies: [
                './bower_components/jquery/dist/jquery.js',
                './bower_components/jquery-ui/jquery-ui.js',
                './bower_components/underscore/underscore.js',
                './bower_components/backbone/backbone.js',
                './bower_components/twig.js/twig.js'
            ]
        },
        css: './src/css/web-player.less',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    watch: { //start watching
        js: './src/js/**/*.js',
        css: './src/css/**/*.less',
        img: './src/img/**/*.*',
        fonts: './src/fonts/**/*.*'
    },
    clean: './dist'
};


//js
gulp.task('js:build', function(){
    gulp.src(path.src.js.webPlayer)
        .pipe(concat('web-player.js'))
        .pipe(gulp.dest(path.build.js))
        //.pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.js))
});

//css
gulp.task('css:build', function(){
    gulp.src(path.src.css)
        .pipe(less())
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
});

//image
gulp.task('img:build', function(){
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
});

//fonts
gulp.task('fonts:build',function(){ // copy fonts from source to build
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [ // building task
    'js:build',
    'css:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function(event, cb){
    watch([path.watch.js], function(event, cb){
        gulp.start('js:build');
    });
    watch([path.watch.css], function(event, cb){
        gulp.start('css:build');
    });
    watch([path.watch.img], function(event, cb){
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb){
        gulp.start('fonts:build');
    });
});

gulp.task('clean', function(cb){ // gulp clean
    rimraf(path.clean, cb);
});