'use strict';

module.exports = function(sequelize, DataTypes){

    var Job = sequelize.define('Job', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
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
        tableName: "JOBS"
    });
    return Job;
}
