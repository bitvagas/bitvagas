var gulp    = require('gulp')
  , nodemon = require('gulp-nodemon')
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
      , env : 'development'
    })
    .on('restart', function () {
        setTimeout(function () {
            browserSync.reload({stream: true});
        }, 500);
    });
});

gulp.task('watch', function() {

    //Watch jade files
    gulp.watch('app/views/**/*.jade', function(){
        browserSync.reload('index.html', { stream: true });
    });
    //Watch sass files
    gulp.watch('public/css/*.sass', function(){
        browserSync.reload('bitvagas.css', { stream: true });
    });
});

gulp.task('default', ['browser-sync', 'watch']);
