const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

const gameDetailSchema = new mongoose.Schema({
    score:{
        type: Number,
        minlength: 0,
    },
    date:{
        type:String
    },
});

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    emailId: {
        type: String,
        minlength: 5,
        maxlength: 60,
        required: true
    },
    password:{
        type:String,
        minlength:3,
        maxlength:100,
        required:true
    },
    gameDetails : [gameDetailSchema]
});



userSchema.methods.generateAuthToken = ()=>{
    const token = jwt.sign({_id:this._id},config.jwtkey);
    return token;
};

const User = mongoose.model("Users", userSchema);

function validateUser(user){
    const schema = Joi.object({
        userName: Joi.string().trim().min(5).max(60).required(),
        emailId: Joi.string().trim().min(5).max(60).required(),
        password: Joi.string().trim().min(3).max(100).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;