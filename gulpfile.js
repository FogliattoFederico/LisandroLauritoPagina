const gulp = require('gulp');
const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const { deleteAsync } = require('del');

const paths = {
  html: { src: 'src/*.html', dest: 'dist' },
  styles: { src: 'src/scss/**/*.scss', dest: 'dist/css' },
  scripts: { src: 'src/js/**/*.js', dest: 'dist/js' },
  img: { src: 'src/img/**/*', dest: 'dist/img' }
};

function clean() {
  return deleteAsync(['dist']);
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

function images() {
  return gulp.src(paths.img.src, { encoding: false })
    .pipe(gulp.dest(paths.img.dest));
}

function serve(cb) {
  browserSync.init({ server: { baseDir: 'dist' }, notify: false, open: false });
  cb();
}

function watchFiles() {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.img.src, images);
  gulp.watch('dist/**/*.html').on('change', browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(html, styles, scripts, images));
const dev = gulp.series(build, gulp.parallel(watchFiles, serve));

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.build = build;
exports.default = dev;
