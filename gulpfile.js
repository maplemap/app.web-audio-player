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
        html: 'build/',
        favicon: 'build/',
        js: 'build/js',
        views: 'build/views',
        css: 'build/css',
        img: 'build/img',
        fonts: 'build/fonts'
    },
    src: { //path of source
        html: 'src/*.html',
        favicon: [
            'src/apple-touch-favicon.png',
            'src/favicon.png'
        ],
        js: [
                'bower_components/jquery/dist/jquery.js',
                'bower_components/underscore/underscore.js',
                'bower_components/backbone/backbone.js',
                'bower_components/twig.js/twig.js',
                'src/js/plugins/twigTemplater.js',
                'src/js/models/song.js',
                'src/js/views/player.js',
                'src/js/views/song.js',
                'src/js/app.js'
            ],
        views: 'src/views/**/*.*',
        css: 'src/css/main.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //see after
        html: 'src/**/*.html',
        favicon: 'src/**/*.png',
        js: 'src/js/**/*.js',
        views: 'src/views/**/*.*',
        css: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};


//html
gulp.task('html:build', function(){
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

//favicon
gulp.task('favicon:build', function(){
    gulp.src(path.src.favicon)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.favicon))
});

//js
gulp.task('js:build', function(){
    gulp.src(path.src.js)
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.js))
});

//views
gulp.task('views:build',function(){ // copy views from source to build
    gulp.src(path.src.views)
        .pipe(gulp.dest(path.build.views))
});

//css
gulp.task('css:build', function(){
    gulp.src(path.src.css)
        .pipe(less())
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
    'html:build',
    'favicon:build',
    'js:build',
    'views:build',
    'css:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function(event, cb){
    watch([path.watch.html], function(event, cb){
        gulp.start('html:build');
    });
    watch([path.watch.favicon], function(event, cb){
        gulp.start('favicon:build');
    });
    watch([path.watch.css], function(event, cb){
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb){
        gulp.start('js:build');
    });
    watch([path.watch.views], function(event, cb){
        gulp.start('views:build');
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

