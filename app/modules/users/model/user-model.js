'use strict';

module.exports = function(sequelize, DataTypes){

    var USER = sequelize.define('user', {
          NAME  : {
              type: DataTypes.STRING
            , allowNull : false
        }
        , EMAIL : {
              type: DataTypes.STRING
            , allowNull : false
            , validate  : {
                isEmail : true
            }
        }
        , PASSWORD : {
              type: DataTypes.STRING
            , allowNull : false
        }
        , ADMIN    : DataTypes.BOOLEAN
    }, {
        classMethods  : {
            associate : function(models){
                USER.hasMany(models.job);
                USER.hasMany(models.job_request);
            }
      }
    });

    return USER;
}