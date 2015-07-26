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
        , VALUE         : {
            type        : DataTypes.ENUM('None', 'Less than 1BTC', '1BTC - 10 BTCs', '11BTCs - 25BTCs', 'More than 25BTCs', 'Negotiable')
          , allowNull   : 'Negotiable'
        }
        , APPLY_URL     : {
              type      : DataTypes.STRING
            , allowNull : true
            , validate  : {
                isUrl   : {
                    msg : 'URL is not valid'
                }
            }
        }
        , PREMIUM        : {
            type         : DataTypes.BOOLEAN
          , allowNull    : false
          , defaultValue : false
        }
        , TAGS           : DataTypes.ARRAY(DataTypes.STRING)
        , ACTIVE         : {
            type         : DataTypes.BOOLEAN
          , allowNull    : false
          , defaultValue : false
        }
    }, {
        classMethods  : {
            associate : function(models) {
                JOB.hasMany(models.job_apply, {
                    onDelete   : 'cascade'
                  , foreignKey : 'JOB_ID'
                });
                JOB.hasMany(models.job_transaction, {
                    onDelete   : 'restrict'
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
};
