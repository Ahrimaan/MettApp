/**
 * Created by Ahrimaan on 07.01.2017.
 */
var userMdl = require('./userModel');
var bcrypt = require('bcrypt-nodejs');
var localStrategy = require('passport-local').Strategy;
var passport = require('passport');

var ctrl = {}

passport.use(new localStrategy({usernameField:'userId',passwordField:'password'},(username,password,done) => {
        LoginUser(username,password,done);
}));

function CreateOrUpdateUser(user,done) {
        userMdl.findOne({userId:user.id}, (err,dbUser) => {
            if(dbUser){
                UpdateUser(user,done);
            }
            else {
                var newMdl = new userMdl();
                newMdl.userId = user.id;
                newMdl.fullName = user.displayName;
                newMdl.isSocial = true;
                if(user.photos){
                    newMdl.avatarUrl = user.photos[0].value;
                }
                newMdl.save((err,result) => {
                    done(null,result);
                });
            }
        });
}

function LoginUser(username,password, done) {
    userMdl.findOne({userId:username}, (err,dbUser) => {
            if(err || !dbUser){
                return done((err || 'User not found'), null);
            }

            var result = bcrypt.compareSync(password,dbUser.passwordHash);
            if(!result){
               return done('Password missmatch', null)
            }

            return done(null,dbUser.toJSON());
    })
};

function createLocalUser(req, resp, next) {
    userMdl.findOne( {userId: req.body.username}, (err,user) => {
        if(err){
           return resp.sendStatus(500);
        }
        if(user){
            resp.status(302);
           return resp.send('User already exsist');
        }
        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if(err){
                resp.status = 500;
                return resp.send(err);
            }

            var user = new userMdl();
            user.fullName = req.body.fullName;
            user.name = req.body.username;
            user.isSocial = false;
            user.userId = req.body.username;
            user.passwordHash = hash;

            user.save((err,result) => {
                if(err){
                    resp.status = 500;
                    resp.send(err);
                }
                return resp.send(200);
            });
        });
    });

}

function getUser(userid,callback){
    userMdl.findOne({userId:userid }, (err,usr) => {
        if(err){
            callback(err,null);
        }
        callback(null,usr);    
    });
}

function authLocal (req,res,next)  {
    passport.authenticate('local', (err,account) => {
        req.login(account , () => {
            if(account){
                account.passwordHash = undefined;
            }
            res.status(err ? 500 : 200).send(err ? err : account);
        });
    })(req,res,next);
};

function UpdateUser(user,done){
    var searchQuery = {
        fullName: user.displayName
    };

    var updates = {
        fullName: user.displayName,
        userId: user.id,
        avatarUrl:''
    };

    if(user.photos){
        updates.avatarUrl = user.photos[0].value
    }

    var options = {
        upsert: false,
        new:true
    };

    // update the user if s/he exists or add a new user
    userMdl.findOneAndUpdate(searchQuery, updates, options, function(err, dbUser) {
        if(err) {
            return done(err);
        } else {
            return done(null, dbUser);
        }
    });
}

passport.serializeUser(function (user, done) {
    CreateOrUpdateUser(user,done);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

ctrl.CreateOrUpdateUser = CreateOrUpdateUser;
ctrl.LoginLocalUser = LoginUser;
ctrl.CreateLocalUser = createLocalUser;
ctrl.authLocal = authLocal;
ctrl.getUser = getUser;
module.exports = ctrl;