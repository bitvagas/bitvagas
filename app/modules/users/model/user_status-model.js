'use strict';

module.exports = function(sequelize, DataTypes){

    var user_status = sequelize.define('user_status', {
        NAME : DataTypes.STRING
      }, {
          timestamps   : false
        , tableName    : 'user_status'
        , classMethods : {
            associate  : function(models){
                user_status.hasOne(models.user, {
                    onDelete    : 'set null'
                  , foreignKey  : {
                      name      : 'USER_STATUS'
                    , allowNull : false
                    , defaultValue : 2
                  }
                });
            }
        }
    });

    return user_status;
};
