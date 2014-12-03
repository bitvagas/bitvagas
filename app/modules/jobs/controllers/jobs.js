var express = require('express'),
    router  = require('../routes/jobs'),
    db      = require('../../../models');

module.exports = {

    findAll: function(resquest, response){
        // db.Article.findAll().success(function (articles) {
        response.render('index', {
            title: 'BitVagas',
            // articles: articles
        });
     //});
    }
};
