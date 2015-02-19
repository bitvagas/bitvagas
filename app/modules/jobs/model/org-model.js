'use strict';

module.exports = function(sequelize, DataTypes){

    var ORG = sequelize.define('org', {
        NAME          : {
            type      : DataTypes.STRING
          , allowNull : false
        }
      , URL           : {
            type      : DataTypes.STRING
          , allowNull : true
          , validate  : {
              isUrl   : true
          }
      }
    },{
        updatedAt     : false
      , tableName     : 'organizations'
      , classMethods  : {
            associate : function(models){
                ORG.hasMany(models.job, {
                      onDelete    : 'set null'
                    , foreignKey  : {
                        name      : 'ORG_ID'
                      , allowNull : false
                      }
                });
            }
      }
    });

    return ORG;

};
