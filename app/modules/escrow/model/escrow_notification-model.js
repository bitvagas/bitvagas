'use strict';

module.exports = function(sequelize, DataTypes){

    var ESCROW_NOTIFICATION = sequelize.define('escrow_notification', {
        TX_ID       : DataTypes.STRING
      , TITLE       : DataTypes.STRING
      , DESCRIPTION : DataTypes.TEXT
    },{
        classMethods  : {
            associate : function(models){
                ESCROW_NOTIFICATION.belongsTo(models.escrow, { foreignKey: 'ESCROW_ID' });
                ESCROW_NOTIFICATION.belongsTo(models.escrow_status, { foreignKey: 'STATUS' });
            }
        }
    });

    return ESCROW_NOTIFICATION;
};
