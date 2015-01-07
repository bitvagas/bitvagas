var gulp    = require('gulp')
  , nodemon = require('gulp-nodemon')
  , concat  = require('gulp-concat')
  , harp    = require('harp')
  , browserSync = require('browser-sync');

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "localhost:3000"
      , port: 9000
      , open: false
    });
});

gulp.task('nodemon', function(){
    nodemon({
        script: 'app.js'
      , env : { 'NODE_ENV': 'development'}
    })
    .on('restart', function () {
        setTimeout(function () {
            browserSync.reload({stream: true});
        }, 500);
    });
});

gulp.task('script', function(){
    return gulp.src('public/modules/**/*.js')
    .pipe(concat('app-build.js'))
    .pipe(gulp.dest('public'));
});


gulp.task('watch', function() {

    //Watch jade files
    gulp.watch(['app/views/**/*.jade', 'public/modules/**/*.jade'], function(){
        browserSync.reload('index.html', { stream: true });
    });
    //Watch sass files
    gulp.watch('public/css/*.sass', function(){
        browserSync.reload('bitvagas.css', { stream: true });
    });
    //Watch js files
    gulp.watch('public/modules/**/*.js',['script'], function(){
        browserSync.reload('app-build.js', { stream: true });
    });
});

gulp.task('default', ['browser-sync', 'watch']);
