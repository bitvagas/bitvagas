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
        }).then(function(user){
            user.should.be.ok;
            done();
        }).catch(function(err){
            done(err);
        })
    })
    it('apply job', function(done){
        db.job_request.create({
            DESCRIPTION : 'i want this job'
        }).then(function(job_request){
            job_request.should.be.ok;
            return job_request.setUser(1);
        }).then(function(job_request){
            job_request.should.be.ok;
            return job_request.setJob(1);
        }).then(function(job_request){
            job_request.should.be.ok;
            done();
        }).catch(function(err){
            done(err);
        });
    })
    it('find user by email `test@bitvagas.com` ', function(done){
        db.user.find({ where: { EMAIL: 'test@bitvagas.com'}})
        .then(function(users){
            users.should.be.ok;
            done();
        })
    })
    it('find all users', function(done){
        db.user.findAll({ include : [db.job_request] })
        .then(function(users){
            users.should.be.ok;
            console.log('\nResults: '+JSON.stringify(users));
            done();
        })
    })
})
