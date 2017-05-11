/* gulpfile.js */
var
    gulp = require('gulp');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;
    minifyHTML = require('gulp-minify-html');
    imagemin = require('gulp-imagemin');
    // del = require('del');
    sitemap = require('gulp-sitemap');


// source and distribution folder
var paths = {
  source: 'src/',
  dest: 'dist/',
  sass: 'src/scss/',
  imgSrc: 'src/images/',
  imgDest: 'dist/'
};



//------------- tasks for development -------------
// Our scss source folder: .scss files
var scss = {
    in: paths.source + 'scss/**/*.scss',
    out: paths.dest + 'css/',
    watch: paths.source + 'scss/**/*.scss',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [paths.sass + 'assets/stylesheets']
    }
};

// compile scss
gulp.task('sass', function () {
    return gulp.src(scss.in)
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out))
        .pipe(reload({ stream: true }));
});

// push html files to dist folder
gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(reload({ stream: true }));
});

// push images to dist folder
gulp.task('img', function() {
  return gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(imagemin())
});

// push js to dist folder
gulp.task('js', function() {
  return gulp.src(['src/js/**.*'])
    .pipe(gulp.dest('dist/js/'))
    .pipe(reload({ stream: true }));
});

// Rerun the required task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch(paths.imgSrc, ['img']);
});

// initialize browser-sync
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// generate sitemap
gulp.task('sitemap', function () {
    gulp.src('src/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: '/'
        }))
        .pipe(gulp.dest('dist/'));
});

// del existing files before posting the new ones
// gulp.task('clean', () => del(['dist/']))

gulp.task('default', ['sass', 'html', 'img', 'js', 'sitemap', 'watch','browser-sync']);
