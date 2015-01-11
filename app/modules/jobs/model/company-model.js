'use strict';

module.exports = function(sequelize, DataTypes){

    var COMPANY = sequelize.define('company', {
        NAME          : DataTypes.STRING
      , URL           : {
            type      : DataTypes.STRING
          , allowNull : true
          , validate  : {
              isUrl   : true
          }
      }
    },{
        updatedAt     : false
      , classMethods  : {
            associate   : function(models){
                COMPANY.hasMany(models.job, {
                      onDelete   : 'set null'
                    , foreignKey : 'COMPANY_ID'
                });
            }
      }
    });

    return COMPANY;

};
