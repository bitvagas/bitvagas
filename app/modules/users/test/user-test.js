var assert    = require('assert')
  , should    = require('should')
  , Sequelize = require('sequelize')
  , db        = require('../../../models');

describe('Users modules', function(){
    it('find all users', function(done){
        db.USER.findAll().success(function(users){
            console.log(JSON.stringify(users));
            users.should.be.ok;
            done();
        })
    })
});
