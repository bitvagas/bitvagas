'use strict';

module.exports = function(sequelize, DataTypes){
    var ESCROW = sequelize.define('escrow', {
        WALLET_ID       : DataTypes.STRING
      , WALLET_SELLER   : DataTypes.STRING
      , VALUE_SATOSHI   : {
            type        :  DataTypes.INTEGER
          , defaultValue: 0
        }
      , VALUE_PAID      : {
            type        : DataTypes.INTEGER
          , defaultValue: 0
        }
      , TOKEN           : DataTypes.STRING
      , KEY_BUYER       : DataTypes.TEXT
      , KEY_SELLER      : DataTypes.TEXT
    }, {
        classMethods    : {
            associate   : function(models){
                ESCROW.hasMany(models.escrow_notification, {
                    foreignKey: {
                        name: 'ESCROW_ID'
                      , allowNull: false
                    }
                });
                ESCROW.belongsTo(models.user, { foreignKey: {
                        name: 'BUYER'
                      , allowNull: false
                    }
                });
                ESCROW.belongsTo(models.user, { foreignKey: {
                        name: 'SELLER'
                      , allowNull: false
                      }
                });
                ESCROW.belongsTo(models.escrow_status, { foreignKey: {
                    name: 'STATUS'
                  , allowNull: false
                  , defaultValue: 1
                  }
                });
            }
        }
    });

    return ESCROW;
};
