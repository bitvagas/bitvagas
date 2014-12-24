'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes){

    var JOB = sequelize.define('JOB', {
        ID: {
            type: Sequelize.INTEGER,
            field: 'ID'
        }
        , TITLE        : Sequelize.STRING
        , DESCRIPTION  : Sequelize.TEXT
        , LOCATION     : Sequelize.STRING
        , COMPANY_NAME : Sequelize.STRING
        , COMPANY_URL  : {
              type: Sequelize.STRING
            , allowNull : true
            , validate  : {
                isUrl   : true
            }
        }
    }, {
        tableName: 'JOBS'
    });
    return JOB;
}
