'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_REQUEST = sequelize.define('job_request', {
          DATE   : DataTypes.DATE
        , EMAIL  : {
            type : DataTypes.STRING
        , allowNull : true
        , validate  : {
            isEmail   : true
        }
    }
        , DESCRIPTION : DataTypes.TEXT
    }, {
        classMethods  : {
            associate : function(models){
                JOB_REQUEST.belongsTo(models.job);
                JOB_REQUEST.belongsTo(models.user);
            }
      }
    });

    return JOB_REQUEST;
};
