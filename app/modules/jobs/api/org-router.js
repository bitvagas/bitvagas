var express = require('express')
  , org     = require('../controllers/org-controller')
  , user    = require('../../users/controllers/user-controller')
  , router  = express.Router();

module.exports = function(app){

    router.route('/organizations')
    .all(user.ensureAuthenticated)
    .get(org.findByUser)
    .post(org.create);

    router.route('/organizations/:OrgID')
    .all(user.ensureAuthenticated)
    .get(org.read)
    .put(org.edit)
    .delete(org.delete);

    router.param('OrgID', org.findById);

    return router;
};
