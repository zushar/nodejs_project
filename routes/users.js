const express = require('express');
const router = express.Router();
const {UserModel,validateUser,validateLogin,createToken} = require('../models/userModel');
const bcrypt = require('bcrypt');

router.get("/",(req,res) => {
    res.json({msg:"users endpoint"})
  })

//route to create a new user
//localhost:3001/users
router.post('/', async (req, res) => {
    const validBody = validateUser(req.body);
    if (validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try {
        const user = new UserModel(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "****";
        res.status(201).json(user);
    }catch (err){
        if (err.code === 11000){
            return res.status(400).json({ message: "User already exists" ,code: 11000});
        }
        console.log(err);
        res.status(502).json({err});
    }
})
//route to login a user
//localhost:3001/users/login
router.post('/login', async (req, res) => {
    const validBody = validateLogin(req.body);
    if(validBody.error){
        return res.status(400).json(validBody.error.details);
    }
    try{
        // נבדוק אם המייל שנשלח בבאדי קיים במסד נתונים
        const user = await UserModel.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({err:"Email not in system"});
        }
        // לבדוק אם הסיסמא המוצפנת ברשומה מתאימה לסיסמא שמגיע מהצד לקוח בבאדי
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass){
            return res.status(401).json({err:"password not match"});
        }
        const token = createToken(user._id, user.role);
        res.status(200).json({token,role:user.role});
    }
    catch(err){
        console.log(err);
        res.status(502).json({err})
    }
})
module.exports = router;