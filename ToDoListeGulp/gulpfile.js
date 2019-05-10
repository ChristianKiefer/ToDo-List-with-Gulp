/// <binding AfterBuild='BUILD' ProjectOpened='watch' />
// npm-packages in Konstanten einlesen
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-csso');
const merge = require('merge-stream');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');

// Variablen
const minJavaScriptFile = 'site.min.js';
const minStyleSheetFile = 'style.min.css';


// Verzeichnisse im Order wwwroot aufräumen
gulp.task('cleanup', async () => {
    del(['wwwroot/css/*.*', 'wwwroot/img/*.*', 'wwwroot/js/*.*', 'wwwroot/lib/*.*'])
        .then(paths => {
            console.log('Deleted files:\n', paths.join('\n'));
        });
});

// alle LESS-Dateien in CSS-Dateien kompilieren
// alle CSS-Dateien mit vendor spezifischen Properties versehen (autoprefixer)
// alle CSS-Dateien zusammenfassen, minimieren und in den Ordner 'wwwroot/css' kopieren
gulp.task('build:less+css', async () => {
    console.log('convert less-files into css-files, minimize and bundle int ' + minStyleSheetFile + ' ...\n');

    return gulp.src('AppAssets/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('AppAssets/css/'))
        .pipe(gulp.src('AppAssets/css/*.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(concat(minStyleSheetFile))
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/css'));
});

// Alternative
gulp.task('build:lessAlternative', async () => {

    let lessStream = gulp.src('AppAssets/css/*.less')
        .pipe(less())
        .pipe(concat('less-files'));

    let cssStream = gulp.src('AppAssets/css/*.css')
        .pipe(concat('css-files'));

    return merge(lessStream, cssStream)
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.init())
        .pipe(concat(minStyleSheetFile))
        .pipe(cssmin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/css'));
});

// JavaScript-Dateien aus dem Verzeichnis „AppAssets/js“ zusammenfassen, 
// minimieren, mit einer sourcemap-Datei versehen
// und in den Ordner 'wwwroot/js' kopieren
gulp.task('build:js', async () => {
    console.log('create file: ' + minJavaScriptFile + ' ...\n');

    return gulp.src('AppAssets/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat(minJavaScriptFile))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('wwwroot/js'));
});

// die Dateien jquery.min.js und bootstrap.min.css aus dem Verzeichnis
// AppAssets/lib in das Verzeichnis wwwroot/lib kopieren
gulp.task('copy:lib', async () => {
    console.log('copy lib-files ...\n');

    return gulp.src('AppAssets/lib/*.*')
        .pipe(gulp.dest('wwwroot/lib'));
});

// die Gafiken aus dem Verzeichnis AppAssets/img in das Verzeichnis wwwroot/img kopieren
gulp.task('copy:img', async () => {
    console.log('copy img-files ...\n');

    return gulp.src('AppAssets/img/*.*')
        .pipe(gulp.dest('wwwroot/img'));
});


// Alle Tasks zusammenfassen
gulp.task('BUILD',
    gulp.series(
        'cleanup',
        gulp.parallel('build:js', 'build:less+css', 'copy:lib', 'copy:img')
    )
);


// JavaScript-Dateien im Verzeichnis "AppAssets/js" und die Datei gulpfile.js beobachten
// bei Änderungen Syntax überprüfen
gulp.task('jsLint', () => {
    return gulp.src('AppAssets/js/*.js', 'gulpfile.js')
        .pipe(eslint({ configFile: '.eslintrc' }))
        .pipe(eslint.format('table'))
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function () {
    gulp.watch(['AppAssets/js/*.js', 'gulpfile.js'], gulp.series('jsLint'));
});
