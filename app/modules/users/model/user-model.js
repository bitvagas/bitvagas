'use strict';

module.exports = function(sequelize, DataTypes){

    var USER = sequelize.define('user', {
          NAME  : DataTypes.STRING
        , EMAIL : {
              type: DataTypes.STRING
            , allowNull : false
            , validades : {
                isEmail : true
            }
        }
        , PASSWORD : DataTypes.STRING
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
