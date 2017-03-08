/**
 * Created by Ahrimaan on 07.01.2017.
 */

var mongo = require('mongoose');

var Schema = mongo.Schema;

var userSchema = new Schema({
    userId: String,
    fullName:String,
    created:Date,
    isSocial:Boolean,
    email: String,
    passwordHash:String,
    avatarUrl:String
});

module.exports = mongo.model('user', userSchema);
