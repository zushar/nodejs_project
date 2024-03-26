const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

const userSchema = new mongoose.Schema({
    name:String,
    email: {
        type:String,
        unique:true
    },
    password:String,
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
        lowercase:true
        }
},{timestamps:true});

exports.UserModel = mongoose.model("users",userSchema);

exports.validateUser = (user) => {
    const joiSchema = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(3).max(20).required(),
        role:Joi.string().valid("user").default("user").allow("",null)
    })
    return joiSchema.validate(user);
}

// validate login data 
exports.validateLogin = (user) => {
    const joiSchema = Joi.object({
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(3).max(20).required()
    })
    return joiSchema.validate(user);
}

exports.createToken = (_id, role) => {
    return jwt.sign({_id, role}, config.JWT_SECRET, {expiresIn: "20d"});
}