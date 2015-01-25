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
        , ADMIN    : {
            type   : DataTypes.BOOLEAN
          , defaultValue : false
        }
    }, {
        classMethods  : {
            associate : function(models){
                USER.hasMany(models.job_request, {
                    foreignKey : 'JOB_ID' 
                });
                USER.hasMany(models.job, {
                    onDelete   : 'cascade'
                  , foreignKey : 'USER_ID'
                });
            }
      }
    });

    return USER;
}
