var assert    = require('assert')
  , should    = require('should')
  , bcrypt    = require('bcryptjs')
  , db        = require('../../../models');

describe('Users modules', function(){

    it('create an user with email `test@bitvagas`', function(done){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync('password', salt);
        db.user.create({ NAME: 'User Test'
                       , EMAIL: 'test@bitvagas.com'
                       , PASSWORD: hash
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
    it('apply job', function(done){
        db.job_request.create({
            DESCRIPTION : 'i want this job'
        }).then(function(job_request){
            job_request.setUser({ id : 1 });
            job_request.setJob({ id : 1 });
            console.log(JSON.stringify(job_request));
            job_request.should.be.ok;
            done();
        })
    })
    it('find all users', function(done){
        db.user.findAll().success(function(users){
            console.log(JSON.stringify(users));
            users.should.be.ok;
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
