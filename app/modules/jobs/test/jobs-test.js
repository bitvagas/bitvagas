var assert    = require('assert')
  , should    = require('should')
  , db        = require('../../../models');

describe('Jobs modules api', function(){
    it('find all jobs', function(done){
        db.job.findAll().success(function(jobs){
            console.log(JSON.stringify(jobs));
            jobs.should.be.ok;
            done();
        });
    })
    it('create job', function(done){
        db.job.create({
              TITLE : 'Job Title Test'
            , DESCRIPTION : 'Lorem ipsum dolor sit amet,'+
                            'consectetur adipiscing elit'
            , EMAIL     : 'test@bitvagas.com'
            , LOCATION  : 'SP - São Paulo'
            , APPLY_URL : null
            , COMPANY_NAME : 'BitVagas.com'
            , COMPANY_URL  : null
            , BTC_ADDRESS  : null
            , ACTIVE       : true
        }).success(function(job){
            console.log(JSON.stringify(job));
            job.should.be.ok;
            done();
        });
    })
});
