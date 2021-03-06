var express        = require('express')
  , favicon        = require('serve-favicon')
  , logger         = require('morgan')
  , cookieParser   = require('cookie-parser')
  , bodyParser     = require('body-parser')
  , compress       = require('compression')
  , methodOverride = require('method-override')
  , harp           = require('harp')
  , passport       = require('passport')
  , session        = require('express-session')
  , cors           = require('cors')
  , glob           = require('glob');

module.exports = function(app, config) {

    app.set('views', './app/views');
    app.set('view engine', 'jade');

    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors({ origin: false }));
    app.use(cookieParser());
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());
    app.use(passport.initialize());
    app.disable('x-powered-by');
    app.use(require('prerender-node').set('prerenderToken', process.env.PRERENDER));

    //Initialize HarpJS
    app.use(harp.mount(config.root + "/public"));

    var api    = glob.sync(config.root + "/app/modules/**/api/*.js");
    var routes = glob.sync(config.root + "/app/modules/**/routes/*.js");
    routes.forEach(function(route){
        require(route)(app);
    });

    api.forEach(function(route){
        //get api name prefix
        app.use('/api', require(route)(app));
    });

    app.get('*', function(request, response) {
        response.render("index", { user : request.user });
    });
};
