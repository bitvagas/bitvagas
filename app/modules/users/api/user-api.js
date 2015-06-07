var express    = require('express')
  , freelancer = require('../controllers/freelancer-controller')
  , router     = express.Router();

module.exports = function(app){

    router.route('/freelancer')
    .get(freelancer.list);

    router.route('/freelancer/:id')
    .get(freelancer.read);

    router.route('/freelancer/cv')
    .post(freelancer.getCV);

    router.param('id', freelancer.getFreelancerById);

    return router;
};
