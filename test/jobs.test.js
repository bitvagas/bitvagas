var request  = require('supertest')
  , should   = require('should')
  , app      = require('../app')
  , db       = require('../app/models')
  , fixtures = require('sequelize-fixtures')
  , prefix   = '/api/'
  , org      = {}
  , job      = {}
  , user     = {}
  , post     = {};

describe('Jobs modules api', function(){

    before(function(){
        org  = { NAME: 'org-test', URL: 'http://test.org' };

        job  = { TITLE       : 'Job-Test'
              , DESCRIPTION : 'Description'
              , LOCATION    : 'SP'
              , APPLY_URL   : null
              , CATEGORY_ID : 1
              , TYPE_ID     : 1
        };

        user = {
            NAME: 'TestUser'
          , EMAIL: 'test@test.com'
          , PASSWORD: 'testpassword'
          , REPASSWORD: 'testpassword'
        };

        post = {
            EMAIL: 'testpost@gmail.com'
          , ORG_NAME: 'OrgPost'
          , URL: 'http://orgpost.org'
          , TITLE: 'Job Test'
          , TYPE_ID: '1'
          , DESCRIPTION: 'Description Test'
          , CATEGORY_ID: '1'
          , LOCATION: 'NY'
        };

        db.user.sync({ force: true })
        .then(function(){
            return db.job.sync({ force: true });
        }).then(function(){
            fixtures.loadFile(__dirname+"/../config/data/**.yml", require('../app/models'))
            .then(function(){
                request(app)
                .post('/signup')
                .send(user)
                .expect(201)
                .end(function(err, response){
                    if(err)
                        done(new Error(err));

                    request(app)
                    .post('/verify')
                    .send({ token: response.body.data.TOKEN })
                    .expect(201)
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .end(function(err, response){
                        if(err)
                            done(new Error(err));

                        request(app)
                        .post('/auth/login')
                        .send(user)
                        .expect(200)
                        .end(function(err, response){
                            if(err)
                                done(new Error(err));

                            token = response.body.token;
                            done();
                        });
                    });
                });
            });
        });
    });

    it('list jobs', function(done){
        request(app)
        .get(prefix+'jobs')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end(done);
    });

    it('create an organization without authorization header', function(done){
        request(app)
        .post(prefix+'organizations')
        .send(org)
        .expect(401, done);
    });

    it('create an organization and a job with authorization header', function(done){
        request(app)
        .post(prefix+'organizations')
        .set('Authorization', 'token ' + token)
        .send(org)
        .expect(201)
        .end(function(err, response){
            if(err)
                return done(new Error(err));

            job.ORG_ID = response.body.id;

            request(app)
            .post(prefix+'jobs')
            .set('Authorization', 'token ' + token)
            .send(job)
            .expect(201)
            .end(function(err, response){
                if(err)
                    return done(new Error(err));

                done();
            });
        });
    });

    it('post a job', function(done){
        request(app)
        .post('/api/jobs/post')
        .send(post)
        .expect(201)
        .end(done);
    });

    it('post a job and apply by an user', function(done){
        request(app)
        .post('/api/jobs/post')
        .send(post)
        .expect(201)
        .end(function(err, response){

            done();
        });
    });
});
