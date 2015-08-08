var request  = require('supertest')
  , should   = require('should')
  , app      = require('../app')
  , db       = require('../app/models')
  , fixtures = require('sequelize-fixtures')
  , prefix   = '/api/'
  , user     = {};

describe('Users modules', function(){

    before(function(done){
        user = {
            NAME: 'TestUser'
          , EMAIL: 'test@test.com'
          , PASSWORD: 'testpassword'
          , REPASSWORD: 'testpassword'
        };
        db.user.sync({ force: true }).then(function(){
            fixtures.loadFile(__dirname+"/../config/data/*.yml", require('../app/models')).then(function(){
                done();
            });
        });
    });

    it('list user status', function(done){
        db.user_status.findAll().then(function(status){
            status.should.have.length(4);
            done();
        });
    });

    it('create an user with email `test@bitvagas`', function(done){
        request(app)
        .post('/signup')
        .send(user)
        .expect(201)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, response){
            if(err)
                done(new Error(err));

            response.status.should.be.exactly(201);

            user.id = response.body.data.id;
            user.TOKEN = response.body.data.TOKEN;
            var token = {
                token: user.TOKEN
            };
        });
    });

    it('should create an user and verify', function(done){
        request(app)
        .post('/verify')
        .send(token)
        .end(function(err, response){
            if(err)
                done(new Error(err));

            response.status.should.be.exactly(201);
            response.body.USER_STATUS.should.be.exactly(3);
            done();
        });
    });
});
