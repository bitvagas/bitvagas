var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.JOB.findAll().success(function(jobs){
            response.json(jobs);
        });
    },

    create: function(request, response){
        db.JOB.create(request.body)
        .success(function(job){
            response.json(job);
        }).error(function(error){
            response.json(405, error);
        });
    }
};
