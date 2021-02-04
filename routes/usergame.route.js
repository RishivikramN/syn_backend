const express = require("express");
const {User, validateUser} = require("../models/Users");
const AuthUser = require("../middlewares/AuthMiddleware");
const { route } = require("./authuser.route");

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
        let highestScore = 0;
        
        if(scores.length > 0)
            highestScore = scores.sort(compare)[0];

        res.send(highestScore);

    } catch (error) {
        console.log(error);
    }
});

router.post('/gamecount',[AuthUser],async(req,res)=>{
    try {
        const user = await User.findOne({emailId:req.body.emailId},{"gameDetails":{date:1}})
                                .exec((err,result)=>{
                                    if(err)
                                        console.log(err);
                                    const gameCount = result.gameDetails.filter(x=>x.date == new Date().toDateString()).length;
                                    res.send({ count : gameCount });
                                });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;