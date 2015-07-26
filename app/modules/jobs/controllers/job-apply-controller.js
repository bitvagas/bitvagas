var db    = require(root + '/app/models')
  , users = require('../../users/controllers/user-controller');

module.exports = {

    apply: function(request, response){
        if(!request.job)
            return response.status(401).send('Job has not found');

        var apply = request.body;

        apply.JOB_ID = request.job.id;

        return db.sequelize.transaction(function(t){
            if(!request.user){
                return db.user.find({ where: { EMAIL: request.body.EMAIL }, transaction: t })
                .then(function(user){
                    if(user)
                        throw new Error('Email already registrated');

                    return users.invite(request, response, t);
                }).then(function(user){

                    apply.NAME = user.NAME;
                    apply.USER_ID = user.id;

                    request.user = user;
                    return db.job_apply.create(apply, { transaction: t });
                }).then(function(applied){
                    users.forgotPassword(request, response);
                    response.status(201).json(applied);
                });
            } else {

                apply.NAME = request.user.NAME;
                apply.USER_ID = request.user.id;

                return db.job_apply.create(apply, { transaction: t }).then(function(applied){
                    response.status(201).json(applied);
                });
            }
        }).catch(function(err){
            return response.status(401).send(err);
        });
    }

    , appliers: function(request, response){
        if(!request.job)
            return response.status(401).send('Job has not found');

        db.job_apply.find({ JOB_ID: request.job.id }).then(function(appliers){
            return response.status(200).json(appliers);
        });
    }
};
