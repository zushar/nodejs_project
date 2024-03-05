const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
        lowercase:true
        }
},{timestamps:true})

exports.UserModel = mongoose.model("users",userSchema)

exports.createToken = (user_id) => {
    // jwt.sign - יצירת טוקן
    // מקבל 3 פרמטרים, הראשון התכולה , במקרה שלנו האיי די של היוזר
    // השני המילה הסודית , שתשמש אותנו כדי לפענח,ושלישי התוקף שלו
    const token = jwt.sign({_id:user_id},"monkeysSecret",
        {expiresIn:"180m"});
    return token;
}


exports.validateUser = (_reqBody) => {
    const joiSchema = Joi.object({
        name:Joi.string().min(2).max(100).required(),
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(3).max(20).required(),
        role:Joi.string().valid("user","admin").default("user").allow("",null)
    })
    return joiSchema.validate(_reqBody)
}

// וולדזציה להתחברות שבה צריך רק מייל וסיסמא מהמשתמש בבאדי
exports.validateLogin = (_reqBody) => {
    const joiSchema = Joi.object({
        email:Joi.string().min(2).max(100).email().required(),
        password:Joi.string().min(3).max(20).required()
    })
    return joiSchema.validate(_reqBody)
}
