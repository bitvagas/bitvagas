'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_TYPE = sequelize.define('job_type', {
        NAME : DataTypes.STRING
    }, {
        timestamps    : false
      , classMethods  : {
            associate : function(models){
                JOB_TYPE.hasMany(models.job, {
                    onDelete   : 'set null'
                  , foreignKey : 'TYPE_ID'
                });
            }
      }
    });

    return JOB_TYPE;
};
