var assert    = require('assert')
  , config    = require('../config/config')
  , db        = require('../app/models');

describe('connection', function(){
    it("connected to database", function(done){
        db.sequelize.authenticate().complete(function(err){

            console.log(err ? 'Unable to connect to the database: ' + err :
                               'Connected has ben established succesfully');
            assert.equal(err, null);
            done();
        });
    })
    it("sync database", function(done){
        db.sequelize.sync({ force : true })
        .complete(function(err) {
            console.log(err ? 'error: '+err : 'Database Synchronized');
            assert.equal(err, null);
            done();
        })
    })
});
