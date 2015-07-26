'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_APPLY = sequelize.define('job_apply', {
          NAME   : {
            type : DataTypes.STRING
          , allowNull : false
        }
        , EMAIL  : {
            type : DataTypes.STRING
          , allowNull : false
          , unique    : true
          , validate  : {
            isEmail   : {
                msg   : 'Email is not valid'
            }
        }
    }
        , LINKS       : DataTypes.STRING
        , DESCRIPTION : DataTypes.TEXT
        , APPLIED     : {
            type      : DataTypes.BOOLEAN
          , defaultValue : false
        }
    }, {
        updatedAt     : false
      , tableName     : 'job_appliers'
      , name          : {
        plural        : 'job_appliers'
      }
      , classMethods  : {
            associate : function(models){
                JOB_APPLY.belongsTo(models.job,  { foreignKey : 'JOB_ID'  });
                JOB_APPLY.belongsTo(models.user, {
                    onDelete   : 'cascade'
                  , foreignKey : 'USER_ID'
                });
            }
      }
    });

    return JOB_APPLY;
};
