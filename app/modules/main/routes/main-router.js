var express = require('express');

module.exports = function(app){

    app.route('/')
    .get(function(request, response){
        response.render("index", { user : request.user });
    });

    app.route('/logout')
    .get(function(request, response){
        request.logout();
        response.redirect('/');
    });

};
