module.exports = function(req,res,next){
    if(req.params.participant !== req.user.userId){
        return res.sendStatus(401);
    }
    return next();
}