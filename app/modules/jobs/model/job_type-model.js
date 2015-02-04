'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_TYPE = sequelize.define('job_type', {
        NAME : DataTypes.STRING
    }, {
        timestamps    : false
      , classMethods  : {
            associate : function(models){
                JOB_TYPE.hasOne(models.job, {
                    onDelete    : 'set null'
                  , foreignKey  : {
                      name      : 'TYPE_ID'
                    , allowNull : false
                    }
                });
            }
      }
    });

    return JOB_TYPE;
}
