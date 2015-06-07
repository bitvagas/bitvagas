var express = require('express')
  , org     = require('../controllers/org-controller')
  , router = express.Router();

module.exports = function(app){

    router.route('/organizations')
    .get(org.findByUser)
    .post(org.create);

    router.route('/organizations/:OrgID')
    .get(org.read)
    .put(org.edit)
    .delete(org.delete);

    router.param('OrgID', org.findById);

    return router;
};
