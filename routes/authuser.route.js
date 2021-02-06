const express = require("express");
const bcrypt = require("bcrypt");

const {User, validateUser} = require("../models/Users");
const AuthUser = require("../middlewares/AuthMiddleware");

const router = express.Router();


router.post("/registeruser",async (req,res)=>{
    try{
        const {error} = validateUser(req.body);

        if (error){
            console.log("Error in user creation");
            return res.status(400).send(error.details[0].message);
        }

        const isUserAlreadyExists = await User.findOne({ emailId: req.body.emailId });

        if(isUserAlreadyExists) return res.send({error:"Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            userName: req.body.userName,
            emailId: req.body.emailId,
            password: password
        });

        const result = await user.save();

        const response = {
            userName: result.userName,
            emailId: result.emailId
        }

        res.send(response);

    }
    catch(ex){
        console.log(ex);
    }
    
});

router.post('/signinuser',async (req,res)=>{
    try {

        //dummy username as the username field is not included in the login page
        req.body.userName = "Login";

        const { error } = validateUser(req.body);

        if (error){ 
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ emailId: req.body.emailId });
        if (!user) return res.status(400).send("Invalid Email Id or Password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) return res.status(400).send("Invalid Email or Password");
        
        res.send({token : user.generateAuthToken(), username: user.userName});

    } catch (ex) {
        console.log(ex);
    }
});

router.get('/getdemo',[AuthUser],async (req,res)=>{
    const allUsers = await User.find();

    res.send(allUsers);
});

module.exports = router;