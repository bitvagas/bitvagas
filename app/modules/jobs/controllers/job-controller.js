var express = require('express')
  , org     = require('./org-controller')
  , user    = require('../../users/controllers/user-controller')
  , db      = require(root + '/app/models');

module.exports = {

    findAll: function(request, response){
        db.job.findAll({
            include : [
                db.job_type
              , db.category
              , db.org
            ]
        }).then(function(jobs){
            response.json(jobs);
        });
    }

    , findById: function(request, response){
        var id = request.params.id;
        db.job.find({
            where   : { id : id }
          , include : [
              db.job_type
            , db.category
            , db.org
          ]
        }).then(function(job){
            response.json(job);
        });
    }

    , create: function(request, response){

        return db.job.create(request.body)
        .then(function(job){
            response.json(job);
        }).catch(function(error){
            response.json(400, error);
        });
    }

    /**
     * Invite an user and insert an organizations and a job.
     */
    , post : function(request, response){
        //begin transaction
        return db.sequelize.transaction(function(t){

            //invite an user
            return user.invite(request, response, t)
            .then(function(user){
                //create an organization
                request.body.USER_ID = user.id;
                //removes ambiguity between organization.name and user.name
                request.body.NAME = request.body.ORG_NAME;
                return db.org.create(request.body,{ transaction : t});
            })
            .then(function(org){
                //create a job
                request.body.ORG_ID = org.id;
                return db.job.create(request.body, { transaction : t})
            }).catch(function(err){
                response.json(400, err);
                //throw an error to rollback
                throw new Error(err);
            });

        }).then(function(result){
            //Transaction commited
            user.forgotPassword(request, response);
            return response.json(result);
        }).catch(function(err){
            //Trasaction rollbacked
            response.json(400, err);
        });
    }
};
