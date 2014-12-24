var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , config    = require('../../config/config')
  , glob      = require('glob')
  , root      = path.normalize(__dirname + '/../..')
  , db        = {};

var sequelize = new Sequelize(config.db, config.username, config.password, {
    dialect : 'postgres'
  , host    : 'localhost'
  , port    : 5433
});

/*
 * get all models files from model folders
 */
var modules = glob.sync('app/modules/**/model/*.js');
modules.forEach(function(module){
    var modelName  = path.basename(module)
      , modelPath  = path.join(root, module)
      , model      = sequelize.import(modelPath);
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
