/**
 * Created by Ahrimaan on 06.01.2017.
 */

var passport = require('passport');
var ctrl = require('./userController');

module.exports = function (server) {
    server.get('/user/:id', (req,res,next) => {
        if(!req.isAuthenticated()){
            return res.sendStatus(401);
        }
        var userId = req.params.id;
        if(userId === undefined || userId === "undefined"){
            return res.sendStatus(401);
        }
        ctrl.getUser(userId, (err,user) => {
            if(err){
               return res.status(500).send(err);
            }
            user.passwordHash = undefined;
            return res.send(user);
        })
        
    });

    server.delete('/user/:id', (req,res,next) => {
       req.logOut();
       req.session.destroy();
       return res.sendStatus(200);
    });

    server.post('/user', ctrl.CreateLocalUser);
    server.post('/user/login',ctrl.authLocal);
}