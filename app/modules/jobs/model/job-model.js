'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB = sequelize.define('job', {
          TITLE         : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
        , DESCRIPTION   : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
        , LOCATION      : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
        , APPLY_URL     : {
              type      : DataTypes.STRING
            , allowNull : true
            , validate  : {
                isUrl   : true
            }
        }
        , COMPANY_NAME  : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
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
