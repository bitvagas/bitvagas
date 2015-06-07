'use strict';

var express  = require('express')
  , config   = require('./config/config')
  , db       = require('./app/models')
  , fixtures = require('sequelize-fixtures');

var app = express();

require('./config/express')(app, config);

db.sequelize
// Uncomment this line to force regenerate database;
// .sync({ force : true })
.sync()
.then(function () {
        fixtures.loadFile("config/data/job-type-data.json", db);
        fixtures.loadFile("config/data/category-data.json", db);
        fixtures.loadFile("config/data/user-status-data.json", db);
        app.listen(process.env.PORT || 3000);
});

exports = module.exports = app;
