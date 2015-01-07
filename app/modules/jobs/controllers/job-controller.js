var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.job.findAll().then(function(jobs){
            response.json(jobs);
        });
    },

    create: function(request, response){
        db.job.create(request.body)
        .then(function(job){
            response.json(job);
        }).catch(function(error){
            response.json(405, error);
        });
    }
};
