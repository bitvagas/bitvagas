'use strict';

module.exports = function(sequelize, DataTypes){

    var Job = sequelize.define('Job', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            field: 'ID'
        }
        , TITLE:        Sequelize.STRING
        , DESCRIPTION:  Sequelize.STRING
        , LOCATION:     Sequelize.STRING
        , COMPANY_NAME: Sequelize.STRING
        , COMPANY_URL:  Sequelize.STRING
    }, {
        tableName: "JOBS"
    });
    return Job;
}
