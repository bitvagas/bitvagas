'use strict';

module.exports = function(sequelize){

    var CATEGORIES = sequelize.define('CATEGORIES', {
        ID: {
            type: Sequelize.INTEGER,
            field: 'ID'
        },
        NAME: Sequelize.STRING
    },{
        createdAt: false,
        updatedAt: false
    });

}
