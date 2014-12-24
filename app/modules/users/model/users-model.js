'use strict';
var Sequelize = require('sequelize');

module.exports = function(sequelize){

    var USER = sequelize.define('USER', {
        ID: {
            type: Sequelize.INTEGER,
            field: 'ID'
        }
        , NAME : Sequelize.STRING
        , EMAIL: {
              type: Sequelize.STRING
            , allowNull : false
            , validades : {
                isEmail : true
            }
        }
        , PASSWORD : Sequelize.STRING
        , ADMIN    : Sequelize.BOOLEAN
    }, {
       tableName: 'USERS'
    });
    return USER;
}
