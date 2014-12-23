var assert    = require('assert')
  , Sequelize = require('sequelize');

var sequelize = new Sequelize('bitvagas'
                            , process.env.user
                            , process.env.password,{
    dialect: 'postgres'
  , host:    'localhost'
  , port:    5433
});

describe('connection', function(){
    it("connected to database", function(done){
        sequelize.authenticate().complete(function(err){
            assert.equal(err, null);
            done();
        });
    });
});
