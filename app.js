'use strict';

var express  = require('express')
  , env      = require('dotenv').load()
  , config   = require('./config/config')
  , db       = require('./app/models');

var app = express();

require('./config/express')(app, config);

db.sequelize
// Uncomment this line to force regenerate database;
// .sync({ force : true })
.sync({ logging: false })
.then(function() {
        app.listen(process.env.PORT || 3000);
});

exports = module.exports = app;
