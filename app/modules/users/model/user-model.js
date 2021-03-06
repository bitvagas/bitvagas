'use strict';

module.exports = function(sequelize, DataTypes){

    var USER = sequelize.define('user', {
          NAME  : DataTypes.STRING
        , EMAIL : {
              type: DataTypes.STRING
            , allowNull : false
            , unique    : true
            , validate  : {
                isEmail : {
                    msg : 'Email is not valid'
                }
            }
        }
        , PASSWORD : {
              type: DataTypes.STRING
            , allowNull : false
        }
        , HEADLINE         : DataTypes.TEXT
        , SUMMARY          : DataTypes.TEXT
        , LOCATION         : DataTypes.STRING
        , POSITION         : DataTypes.STRING
        , PICTURE          : DataTypes.STRING
        , TOKEN            : DataTypes.STRING
        , RESETTOKEN       : DataTypes.STRING
        , RESETEXPIRES     : DataTypes.DATE
        , LINKEDIN_ID      : DataTypes.STRING
        , LINKEDIN_TOKEN   : DataTypes.STRING
        , LINKEDIN_PROFILE : DataTypes.STRING
        , NOTIFY_JOBS      : {
            type           : DataTypes.BOOLEAN
          , defaultValue   : true
        }
        , NOTIFY_APPLIES   : {
            type           : DataTypes.BOOLEAN
          , defaultValue   : true
        }
        , WALLET_ID        : {
            type           : DataTypes.STRING
          , unique         : true
        }
        , BALANCE          : {
            type           : DataTypes.DECIMAL(16,8)
        }
    }, {
        classMethods  : {
            associate : function(models){
                USER.hasMany(models.job_apply, {
                    foreignKey    : {
                        name      : 'USER_ID'
                      , allowNull : true
                    }
                });
                USER.hasMany(models.org, {
                    foreignKey    : {
                        name      : 'USER_ID'
                      , allowNull : false
                    }
                });
                USER.hasMany(models.job, {
                    onDelete    : 'cascade'
                  , foreignKey  : {
                      name      : 'USER_ID'
                    , allowNull : false
                    }
                });
                USER.belongsTo(models.user_status, { foreignKey : 'USER_STATUS' });
            }
      }
    });

    return USER;
};
