var gulp    = require('gulp'),
    jade    = require('gulp-jade'),
    sass    = require('gulp-sass'),
    coffee  = require('gulp-coffee'),
    inject  = require('gulp-inject'),
    del     = require('del'),
    bowerFiles = require('main-bower-files');

var paths = {
  src: {
    scripts   : './src/scripts/**/*.coffee',
    styles    : './src/styles/**/*.sass',
    templates : './src/templates/**/*.jade'
  },
  tmp: {
    scripts   : './.tmp/scripts',
    styles    : './.tmp/styles',
    libs      : './.tmp/libs',
    templates : './.tmp',
    index     : './.tmp/index.html'
  }
}

gulp.task('clean', function() {
  del([
    '.tmp'
  ]);
})

gulp.task('templates', function() {
  return gulp.src(paths.src.templates)
  .pipe(jade())
  .pipe(gulp.dest(paths.tmp.templates));
});

gulp.task('styles', function() {
  return gulp.src(paths.src.styles)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(paths.tmp.styles));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src.scripts)
  .pipe(coffee())
  .pipe(gulp.dest(paths.tmp.scripts));
});

gulp.task('bower', function() {
  return gulp.src(bowerFiles())
  .pipe(gulp.dest(paths.tmp.libs));
});

gulp.task('default', ['bower', 'styles', 'scripts', 'templates'], function() {
  var sources = gulp.src([
    paths.tmp.styles + '/**/*.css',
    paths.tmp.scripts + '/**/*.js',
    paths.tmp.libs + '/**/*.*'
  ], {read: false});

  return gulp.src(paths.tmp.index
    ).pipe(
      inject(sources, {relative: true})
    ).pipe(
      gulp.dest(paths.tmp.templates)
    );
});
