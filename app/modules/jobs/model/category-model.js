'use strict';

module.exports = function(sequelize, DataTypes){

    var CATEGORY = sequelize.define('category', {
        NAME: DataTypes.STRING
    }, {
        timestamps    : false
      , classMethods  : {
            associate : function(models){
                CATEGORY.hasMany(models.job);
            }
      }
    });

    return CATEGORY;
}
