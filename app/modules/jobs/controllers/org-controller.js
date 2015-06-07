var express = require('express')
  , db      = require('../../../models')
  , _       = require('lodash');

module.exports = {

    findAll: function(request, response){
        db.org.findAll().then(function(orgs){
            response.status(200).json(orgs);
        });
    }

    , findByUser: function(request, response){
        db.org.findAll({
            where : { USER_ID : request.user.id  }
        }).then(function(orgs){
            response.status(200).json(orgs);
        });
    }

    , read: function(request, response){
        response.json(request.org);
    }

    , create: function(request, response){
        if(request.user === undefined)
            return response.status(401).send('user invalid');

        request.body.USER_ID = request.user.id;
        db.org.create(request.body).then(function(org){
            response.status(201).json(org);
        }).catch(function(error){
            response.status(400).json(error);
        });
    }

    , edit: function(request, response){
        var org = request.org;
        org = _.extend(org, request.body);
        org.save().then(function(org){
            response.status(200).json(org);
        }).catch(function(error){
            response.status(400).json(error);
        });
    }

    , delete: function(request, response){
        var org = request.org;
        org.destroy().then(function(){
            return response.status(200).send('deleted');
        }).catch(function(error){
            return response.status(400).json(error);
        });
    }

    /*
     * Middleware for OrgID parameter
     */
    , findById: function(request, response, next, OrgID){
        db.org.find({ where : { id : OrgID }}).then(function(org){
            if(!org) response.status(404).json({ error : 'Org not Found' });
            request.org = org;
            next();
        }).catch(function(err){
            next(err);
        });
    }
};
