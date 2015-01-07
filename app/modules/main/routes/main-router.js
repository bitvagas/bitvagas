var express = require('express')
  , router  = express.Router();

router.get('/', function(request, response){
    response.render("index", { user : request.user });
});

router.get('/logout', function(request, response){
    request.logout();
    response.redirect('/');
});

module.exports = router;
