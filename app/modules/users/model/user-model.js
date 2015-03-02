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
        , TOKEN          : DataTypes.STRING
        , RESETTOKEN     : DataTypes.STRING
        , RESETEXPIRES   : DataTypes.DATE
        , LINKEDIN_ID    : DataTypes.STRING
        , LINKEDIN_TOKEN : DataTypes.STRING
    }, {
        classMethods  : {
            associate : function(models){
                USER.hasMany(models.job_request, {
                    foreignKey    : {
                        name      : 'JOB_ID'
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
}
