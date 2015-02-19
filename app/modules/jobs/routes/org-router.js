var express = require('express')
  , org     = require('../controllers/org-controller')
  , router  = express.Router();

router.get('/', function(request, response){
    org.findByUser(request, response);
});

router.get('/:OrgID' , function(request, response){
    org.findById(request, response);
});

router.post('/', function(request, response){
    org.create(request, response);
});

router.put('/:OrgID', function(request, response){
    org.edit(request, response);
});

router.delete('/:OrgID', function(request, response){
    org.delete(request, response);
});

module.exports = router;
