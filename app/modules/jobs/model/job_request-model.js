'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_REQUEST = sequelize.define('job_request', {
          EMAIL  : {
            type : DataTypes.STRING
        , allowNull   : true
        , validate    : {
            isEmail   : true
        }
    }
        , DESCRIPTION : DataTypes.TEXT
    }, {
        updatedAt     : false
      , classMethods  : {
            associate : function(models){
                JOB_REQUEST.belongsTo(models.job,  { foreignKey : 'JOB_ID'  });
                JOB_REQUEST.belongsTo(models.user, {
                    onDelete   : 'cascade'
                  , foreignKey : 'USER_ID'
                });
            }
      }
    });

    return JOB_REQUEST;
};
