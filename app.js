var express = require('express'),
  config = require('./config/config'),
  db = require('./app/models');

var app = express();

require('./config/express')(app, config);

db.sequelize
  .sync({ force : true})
  .complete(function (err) {
    if(err){
      throw err[0];
    }else{
      app.listen(config.port);
    }
  });

