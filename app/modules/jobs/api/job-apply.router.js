var express = require('express')
  , user    = require('../../users/controllers/user-controller')
  , jobs    = require('../controllers/job-controller')
  , apply   = require('../controllers/job-apply-controller')
  , router  = express.Router();


module.exports = function(app){

    router.route('/jobs/:id/apply')
    .get(apply.appliers)
    .post(user.checkAuthentication, apply.apply);

    router.param('id', jobs.findById);

    return router;
};
