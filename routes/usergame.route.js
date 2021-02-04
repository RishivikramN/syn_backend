const express = require("express");
const {User, validateUser} = require("../models/Users");
const AuthUser = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post('/gamedetails',[AuthUser],async (req,res)=>{
    try {    
        const user = await User.findOne({ emailId: req.body.emailId });

        user.gameDetails.push({score:req.body.score,date:req.body.date});
       
        user.save();

        res.send("gamedetail logged");

    } catch (error) {
        console.log(error);
    }
});

const compare = (a,b)=>{
    if ( a.score < b.score ){
        return 1;
      }
      if ( a.score > b.score ){
        return -1;
      }
      return 0;
}

router.post('/highscore',[AuthUser],async (req,res)=>{
    try {
        const user = await User.findOne({emailId:req.body.emailId},{"gameDetails":{score:1}})
                                .sort({'gameDetails.score':-1});
                                
        let scores = user.gameDetails;

        const highestScore = scores.sort(compare)[0];
        res.send(highestScore);

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;