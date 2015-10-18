module.exports = function(sequelize, DataTypes){

    var ESCROW_STATUS = sequelize.define('escrow_status', {
        NAME: DataTypes.STRING
    },{
        timestamps    : false
      , tableName     : 'escrow_status'
      , classMethods  : {
            associate : function(models){
                ESCROW_STATUS.hasOne(models.escrow, {
                    foreignKey    : {
                        name      : 'STATUS'
                      , allowNull : false
                    }
                });
                ESCROW_STATUS.hasOne(models.escrow_notification, {
                    foreignKey    : {
                        name      : 'STATUS'
                      , allowNull : false
                    }
                });
            }
        }
    });

    return ESCROW_STATUS;
};
