var assert    = require('assert')
  , should    = require('should')
  , db        = require('../../../models');

describe('Jobs modules api', function(){
    it('create categories', function(done){
        db.category.create({
            id   : 1
          , NAME : 'Development'
        }).then(function(category){
            category.should.be.instanceof(Object);
            done();
        })
    })
    it('create job types', function(done){
        db.job_type.bulkCreate([
          { NAME : 'FULL-TIME' }
        , { NAME : 'PART-TIME' }
        , { NAME : 'FREELANCE' }
        , { NAME : 'TEMPORARY' }
        ]).then(function(){
            return db.job_type.findAll();
        }).then(function(types){
            types.should.be.instanceof(Object).and.have.lengthOf(4);
            done();
        }).catch(function(err){
            done(err);
        });
    })
    it('create companies', function(done){
        db.company.create({
            NAME : 'bitvagas'
          , URL  : 'http://www.bitvagas.com'
        }).then(function(company){
            company.should.be.instanceof(Object);
            done();
        });
    })
    it('create job', function(done){
        db.job.create({
              TITLE       : 'Job Title Test'
            , DESCRIPTION : 'Lorem ipsum dolor sit amet'
            , EMAIL       : 'test@bitvagas.com'
            , LOCATION    : 'SP - São Paulo'
            , APPLY_BY    : null
            , BTC_ADDRESS : null
            , ACTIVE      : true
        }).then(function(job){
            job.should.be.ok;
            return job.setCategory({ id : 1 });
        }).then(function(job){
            job.should.be.ok;
            return job.setCompany({ id : 1 });
        }).then(function(job){
            job.should.be.ok;
            done();
        }).catch(function(err){
            done(err);
        });
    })
    it('find all jobs', function(done){
        db.job.findAll({ include : [db.category, db.company]})
        .then(function(jobs){
            jobs.should.be.ok;
            console.log('\nResults: '+JSON.stringify(jobs));
            done();
        });
    })
});
