var assert    = require('assert')
  , should    = require('should')
  , db        = require('../../../models');

describe('Jobs modules api', function(){
    it('create categories', function(done){
        db.category.create({
            id   : 1
          , NAME : 'Development'
        }).then(function(category){
            console.log(JSON.stringify(category));
            category.should.be.ok;
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
            db.job_type.findAll().then(function(types){
                console.log(JSON.stringify(types));
                types.should.be.ok;
                done();
            });
        });
    })
    it('create job', function(done){
        db.job.create({
              TITLE : 'Job Title Test'
            , DESCRIPTION  : 'Lorem ipsum dolor sit amet,'+
                            'consectetur adipiscing elit'
            , EMAIL        : 'test@bitvagas.com'
            , LOCATION     : 'SP - São Paulo'
            , APPLY_BY     : null
            , COMPANY_NAME : 'BitVagas.com'
            , COMPANY_URL  : null
            , BTC_ADDRESS  : null
            , ACTIVE       : true
        }).then(function(job){
            job.setCategory({ id : 1 }).then(function(job){
                console.log(JSON.stringify(job));
                job.should.be.ok;
                done();
            });
        });
    })
    it('find all jobs', function(done){
        db.job.findAll({include : [db.category]}).then(function(jobs){
            console.log(JSON.stringify(jobs));
            jobs.should.be.ok;
            done();
        });
    })
});
