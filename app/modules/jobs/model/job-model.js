'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB = sequelize.define('job', {
          TITLE         : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
        , DESCRIPTION   : {
            type        : DataTypes.TEXT
          , allowNull   : false
        }
        , LOCATION      : {
            type        : DataTypes.STRING
          , allowNull   : false
        }
        , APPLY_BY      : {
              type      : DataTypes.STRING
            , allowNull : true
        }
        , BTC_ADDRESS   : {
            type        : DataTypes.STRING
        }
        , ACTIVE        : {
              type      : DataTypes.BOOLEAN
            , allowNull : false
            , defaultValue : false
        }
    }, {
        classMethods  : {
            associate : function(models) {
                JOB.hasMany(models.job_request, {
                    onDelete   : 'cascade'
                  , foreignKey : 'JOB_ID'
                });
                JOB.belongsTo(models.category, { foreignKey : 'CATEGORY_ID'});
                JOB.belongsTo(models.org,      { foreignKey : 'ORG_ID'});
                JOB.belongsTo(models.job_type, { foreignKey : 'TYPE_ID'});
                JOB.belongsTo(models.user,     { foreignKey : 'USER_ID'});
            }
        }
    });

    return JOB;
}
