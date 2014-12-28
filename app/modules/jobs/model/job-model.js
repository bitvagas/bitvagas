'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB = sequelize.define('job', {
          TITLE         : DataTypes.STRING
        , DESCRIPTION   : DataTypes.TEXT
        , LOCATION      : DataTypes.STRING
        , APPLY_METHOD  : DataTypes.STRING
        , COMPANY_NAME  : DataTypes.STRING
        , COMPANY_URL   : {
              type      : DataTypes.STRING
            , allowNull : true
            , validate  : {
                isUrl   : true
            }
        }
    }, {
        classMethods  : {
            associate : function(models) {
                JOB.hasMany(models.job_request);
                JOB.belongsTo(models.category);
                JOB.belongsTo(models.job_type);
            }
        }
    });

    return JOB;
}
