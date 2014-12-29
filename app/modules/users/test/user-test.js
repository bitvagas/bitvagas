var assert    = require('assert')
  , should    = require('should')
  , db        = require('../../../models');

describe('Users modules', function(){

    it('find all users', function(done){
        db.user.findAll().success(function(users){
            console.log(JSON.stringify(users));
            users.should.be.ok;
            done();
        })
    })
    it('create an user with email `test@bitvagas`', function(done){
        db.user.create({ NAME: 'User Test'
                       , EMAIL: 'test@bitvagas.com'
                       , PASSWORD: 'password'
                       , ADMIN: false
        }).success(function(user){
            console.log(JSON.stringify(user));
            user.should.be.ok;
            done();
        }).error(function(error){
            console.log('error: '+error);
            done();
        })
    })
    it('find user by email `test@bitvagas.com` ', function(done){
        db.user.find({ where: { EMAIL: 'test@bitvagas.com'}})
        .success(function(users){
            console.log(JSON.stringify(users));
            users.should.be.ok;
            done();
        })
    })
})
