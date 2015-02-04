'use strict';

module.exports = function(sequelize, DataTypes){

    var CATEGORY = sequelize.define('category', {
        NAME: DataTypes.STRING
    }, {
        timestamps    : false
      , classMethods  : {
            associate : function(models){
                CATEGORY.hasOne(models.job, {
                    onDelete    : 'set null'
                  , foreignKey  : {
                      name      : 'CATEGORY_ID'
                    , allowNull : false
                    }
                });
            }
      }
    });

    return CATEGORY;
}
