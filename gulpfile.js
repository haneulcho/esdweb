var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    include = require('gulp-file-include'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json');

var cssWatchPath = ['./src/css/*.scss', './src/css/**/*.scss'],
    cssInputPath = './src/css/style.scss',
    cssOutputPath = 'assets/css',
//     jsWatchPath = 'src/js/*.js',
//     jsInputPath = 'src/js/scripts.js',
//     jsOutputPath = 'app/assets/js',
    htmlWatchPath = [
        './src/html/index.html',
        './src/html/index_naver.html',
        './src/html/common/*.html',
        './src/html/community/*.html',
        './src/html/event/*.html',
        './src/html/guide/*/*.html',
        './src/html/help/*.html',
        './src/html/notice/*.html',
        './src/html/pds/*.html',
        './src/html/ranking/*.html',
        './src/html/ucc/*.html'
    ],
    htmlInputPath = [
        './src/html/index.html',
        './src/html/index_naver.html',
        './src/html/common/*.html',
        './src/html/community/*.html',
        './src/html/event/*.html',
        './src/html/guide/*/*.html',
        './src/html/help/*.html',
        './src/html/notice/*.html',
        './src/html/pds/*.html',
        './src/html/ranking/*.html',
        './src/html/ucc/*.html'
    ],
    htmlOuputPath = './html';

var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * 카피라이트 ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');

gulp.task('clean', function () {
    return gulp.src(['./html/*.html', './html/guide/character/*.html', './html/**/*.html', './assets/css/*.css', './assets/maps/*.map'], { read: false })

    .pipe(clean());
});

gulp.task('html', function () {
    gulp.src(htmlInputPath, {base: './src/html'})
    .pipe(include({
      prefix: '@@@',
      basepath: '@file'
    }))

    .pipe(gulp.dest(htmlOuputPath))
    .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(cssInputPath)

    .pipe(sourcemaps.init({largeFile: true}))    
    .pipe(sass({outputStyle: 'compact', errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    // .pipe(header(banner, { package : package })) // package.json에 있는 프로젝트 정보를 .min 파일 상단에 주석으로 넣어줌
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(cssOutputPath))

    .pipe(browserSync.stream());
});

gulp.task('cssnano', function () {
    return gulp.src(cssInputPath)

    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(sass({errLogToConsole: true}))
    .pipe(autoprefixer('last 4 version'))
    
    .pipe(cssnano()) // 압축해
    .pipe(rename({ suffix: '.min' })) // 뒤에 .min 이름 붙여
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(cssOutputPath))

    .pipe(browserSync.stream());
});

// gulp.task('js',function (){
//   gulp.src(jsInputPath)
//
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     // .pipe(header(banner, { package : package }))
//     .pipe(gulp.dest(jsOutputPath))
//
//     .pipe(uglify()) // 압축해
//     // .pipe(header(banner, { package : package }))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest(jsOutputPath))
//
//     .pipe(browserSync.stream());
// });

gulp.task('html-watch', ['html'], function (done) {
    browserSync.reload();
    done();
});
gulp.task('css-watch', ['css', 'cssnano'], function (done) {
    browserSync.reload();
    done();
});
// gulp.task('js-watch', ['js'], reload);

gulp.task('default', ['css', 'cssnano', 'html'], function () {
    browserSync.init({
        server: {
            baseDir: ["./html", "./"]
        }
    });
    gulp.watch(htmlWatchPath, ['html-watch']);
    gulp.watch(cssWatchPath, ['css-watch']);
    //gulp.watch(jsWatchPath, ['js-watch']);
});
