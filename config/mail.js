var nodemailer = require('nodemailer')
  , smtp       = require('nodemailer-smtp-transport')
  , handleBar  = require('nodemailer-express-handlebars')
  , config     = require('./config');

module.exports = {

    auth      : {
        user  : config.mailer.email
      , pass  : config.mailer.pass
    }

    , sendWelcome : function(user){

        var subject   = 'Welcome to BitVagas';

        var template = 'welcome';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
        }

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendForgotPassword : function(user){

        var subject = 'Reset your password';

        var template = 'reset';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
          , token : user.RESETTOKEN
        }

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendEmailVerification : function(user){

        var subject = 'Verify your email address';

        var template = 'verify';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
          , token : user.TOKEN
        }

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendMail : function(to, subject, template, context){

        if(!this.auth.user)
            return console.log('email not configurated');

        var mailOptions = {
            to       : to
          , from     : this.auth.email
          , subject  : subject
          , template : template
          , context  : context
        }

        var smtpTransport = nodemailer.createTransport(smtp({
            host : 'smtp.gmail.com'
          , service : 'Gmail'
          , port : 465
          , auth : this.auth
        }));

        smtpTransport.use('compile', handleBar({
            viewEngine : 'html'
          , viewPath   : 'app/views/mail-template'
          , extName    : '.html'
        }));

        smtpTransport.sendMail(mailOptions, function(err, info){
            if(err)
                console.log('Error on sending email: ' + JSON.stringify(err));
            else
                console.log('Email sent: '+JSON.stringify(info));
        });
    }
}
