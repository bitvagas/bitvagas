'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize){

    var CATEGORY = sequelize.define('CATEGORY', {
        ID: {
            type: Sequelize.INTEGER,
            field: 'ID'
        },
        NAME: Sequelize.STRING
    },{
        createdAt: false
      , updatedAt: false
      , tableName: 'CATEGORIES'
    });
    return CATEGORY;

}
