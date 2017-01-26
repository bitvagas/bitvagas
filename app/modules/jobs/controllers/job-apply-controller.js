var db     = require(root + '/app/models')
  , mailer = require(root + '/config/mail')
  , users  = require('../../users/controllers/user-controller');

module.exports = {

    apply: function(request, response){
        if(!request.job)
            return response.status(400).send('errorMessage.job.not.found');

        var applier = {};
        var apply   = request.body;

        apply.JOB_ID = request.job.id;

        return db.sequelize.transaction(function(t){

            if(!request.user) {
                return db.user.find({ where: { EMAIL: request.body.EMAIL }, transaction: t })
                .then(function(user){
                    if(user)
                        throw new Error('errorMessage.email.already.registered');

                    return users.invite(request, response, t);
                }).then(function(user){

                    apply.NAME = user.NAME;
                    apply.USER_ID = user.id;

                    applier = user;
                    request.user = user;
                    mailer.sendWelcomeApplier(request.job, user);
                    users.forgotPassword(request, response);
                    return db.job_apply.create(apply, { transaction: t });
                })
            } else {

                applier = request.user;

                apply.NAME = applier.NAME;
                apply.USER_ID = applier.id;

                return db.job_apply.create(apply, { transaction: t });
            }
        }).then(function(result){
            // Transaction Commited
            apply = result;
            return db.job.find({ include: [ db.user ], where: { id: result.JOB_ID }});
        }).then(function(job){

            if(job.user.NOTIFY_APPLIES)
                mailer.sendApplierNotification(job.user.EMAIL, job, applier, apply);

            return response.status(201).json(apply);
        }).catch(function(err){
            // Transaction Rollback
            return response.status(400).send(err.message);
        });
    }

    , appliers: function(request, response){
        if(!request.job)
            return response.status(401).send('errorMessage.job.not.found');

        db.job_apply.findAll({ JOB_ID: request.job.id }).then(function(appliers){
            return response.status(200).json(appliers);
        });
    }
};
