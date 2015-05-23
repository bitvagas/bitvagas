'use strict';

module.exports = function(sequelize, DataTypes){

    var JOB_TRANSACTION = sequelize.define('job_transaction', {

        BTC_ADDRESS   : {
            type      : DataTypes.STRING
          , allowNull : false
          , unique    : true
        }
      , TRANSACTION   : {
            type      : DataTypes.STRING
          , allowNull : false
          , unique    : true
      }
      , VALUE         : {
            type      : DataTypes.DECIMAL(16,8)
          , allowNull : false
      }
    }, {
        classMethods  : {
            associate : function(models) {
                JOB_TRANSACTION.belongsTo(models.job, { foreignKey : 'JOB_ID' });
            }
        }
    });

    return JOB_TRANSACTION;
};
