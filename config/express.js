var express        = require('express')
  , favicon        = require('serve-favicon')
  , logger         = require('morgan')
  , cookieParser   = require('cookie-parser')
  , bodyParser     = require('body-parser')
  , compress       = require('compression')
  , methodOverride = require('method-override')
  , harp           = require('harp');

module.exports = function(app, config) {

  app.set('views', './app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  //Initialize HarpJS
  app.use(harp.mount(config.root + "/public"));

  //Routes
  var jobs = require(config.root + '/app/modules/jobs/routes/job-router')
    , main = require(config.root + '/app/modules/main/routes/main-router');

  app.use('/',main);
  app.use('/jobs',jobs);

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
