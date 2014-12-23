'use strict';

module.exports = function(sequelize){

    var USERS = sequelize.define('USERS', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            field: 'ID'
        }
        , NAME : Sequelize.STRING
        , EMAIL: {
            , type: Sequelize.STRING
            , allowNull : false
            , validades : {
                isEmail : true
            }
        }
        , PASSWORD : Sequelize.STRING
        , ADMIN    : Sequelize.BOOLEAN
    });
}
