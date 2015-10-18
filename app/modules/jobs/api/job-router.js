var express = require('express')
  , jobs = require('../controllers/job-controller')
  , user = require('../../users/controllers/user-controller')
  , router = express.Router();

module.exports = function(app){

    router.route('/jobs')
    .get(jobs.findAll)
    .post(user.ensureAuthenticated, jobs.create);

    router.route('/jobs/:id')
    .get(jobs.read);

    router.route('/jobs/post')
    .post(user.findByEmail, jobs.post);

    router.route('/jobs/:id/active')
    .post(jobs.findById, jobs.active);

    router.route('/jobs/premium/callback')
    .post(user.ensureAuthenticated, jobs.premium);

    router.param('id', jobs.findById);

    return router;
};
