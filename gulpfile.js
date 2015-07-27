var gulp        = require('gulp')
  , nodemon     = require('gulp-nodemon')
  , concat      = require('gulp-concat')
  , bower       = require('main-bower-files')
  , fixtures    = require('sequelize-fixtures')
  , mocha       = require('gulp-mocha')
  , browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init(__dirname, {
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
    .on('restart', function(){
        setTimeout(function(){
            browserSync.reload({stream: true});
        }, 500);
    });
});

gulp.task('bower', function(){
    return gulp.src(bower(), {
        base: 'public/components'
    })
    .pipe(concat('components.min.js'))
    .pipe(gulp.dest('public/dest'));
});

gulp.task('script', ['bower'], function(){
    return gulp.src('public/modules/**/*.js')
    .pipe(concat('app-build.js'))
    .pipe(gulp.dest('public/dest'));
});

gulp.task('fixtures', function(){
    require('dotenv').load();
    fixtures.loadFile("config/data/**.yml", require('./app/models'));
});

gulp.task('test', function(){
    process.env.NODE_ENV = 'test';
    return gulp.src('test/*.test.js', { read: false })
    .pipe(mocha())
    .once('error', function(){
        process.exit(1);
    }).once('end', function(){
        process.exit();
    });
});

gulp.task('watch', function(){

    //Watch jade files
    gulp.watch(['app/views/**/*.jade', 'public/modules/**/*.jade'], function(){
        browserSync.reload('index.html', { stream: true });
    });
    //Watch sass files
    gulp.watch('public/css/*.sass', function(){
        browserSync.reload('bitvagas.css', { stream: true });
    });
    //Watch js files
    gulp.watch('public/modules/**/*.js', ['script'], function(){
        browserSync.reload('app-build.js', { stream: true });
    });
});

gulp.task('build', ['script']);

gulp.task('default', ['browser-sync','script', 'watch']);
