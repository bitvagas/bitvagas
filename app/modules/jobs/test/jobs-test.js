var assert    = require('assert')
  , should    = require('should')
  , Sequelize = require('sequelize')
  , db        = require('../../../models');

describe('Jobs modules api', function(){
    it('find all jobs', function(done){
        db.JOB.findAll().success(function(jobs){
            console.log(JSON.stringify(jobs));
            jobs.should.be.ok;
            done();
        });
    });
});
