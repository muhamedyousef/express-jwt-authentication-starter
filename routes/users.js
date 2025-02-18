const { response } = require("express");
const mongoose = require("mongoose");
const router = require("express").Router();
const User = mongoose.model("User");
//const passport = require("passport");
/*let passportAuthMiddleware = passport.authenticate('jwt',{session:false})*/
const utils = require("../lib/utils");

// TODO
router.get("/protected", utils.authMiddleWare, (req, res, next) => {
  res.status(200).json({ success: true, message: `you are Authorized`,token:req.jwt });
  console.log(req.headers);
});

// TODO
router.post("/register", function (req, res, next) {
/*---- this implementation depends on impeding the utility functions in the model itself to decrease the dependencies requirment -----*/
    const newUser = new User({
      username:req.body.username,
      email:req.body.email,
      bio:req.body.bio,
      image:req.body.image,
    });
    newUser.setPassword(req.body.password);
    newUser.save()
    .then(
      (user)=>{res.status(200).json({registeration:true,user:user})}
    )
    .catch((err)=>{res.status(404).json({err:err})})

/*---this implementaion dependes on accesing the utility functions in the pathway itself -------*/
  /*let salethash = utils.genPassword(req.body.password);
  let salt = salethash.salt;
  let hash = salethash.hash;
  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });
  newUser
    .save()
    .then((user) => {
      const jwt = utils.issueJWT(user);
      res.json({
        regestireation: true,
        user: user,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    })
    .catch((err) => {
      res.json({ error: err });
    });*/

});

// TODO
router.post("/login", function (req, res, next) {
/*---this implementaion dependes on accesing the utility functions in the pathway itself -------*/
 /* User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, error: `couldn't find user` });
      }
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      );
      if (isValid) {
     /*you may redirest to a specific page of your choice */
      /*  const tokenObj = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          user: user,
          token: tokenObj.token,
          expiresIn: tokenObj.expires,
          message: `you loged in successfully with id ${user._id}`,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: `failed to issue token` });
      }
    })
    .catch((err) => console.log(err));*/
    /*---- this implementation depends on impeding the utility functions in the model itself to decrease the dependencies requirment -----*/
    User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ success: false, error: `couldn't find user` });
      }
     let isValid = user.isValidPassword(req.body.password);
      if (isValid) {
      /*you may redirest to a specific page of your choice */
        const tokenObj = utils.issueJWT(user);
        
        res.cookie('JWTtoken',tokenObj,{
          httpOnly:true
        })
        res.status(200).json({
          success: true,
          user: user,
          token: tokenObj.token,
          expiresIn: tokenObj.expires,
          message: `you loged in successfully with id ${user._id}`,
        });
      } else {
        res
          .status(401)
          .json({ success: false, message: `Password is incorrect` });
      }
    })
    .catch((err) => console.log(err));
});



router.get("/test",(req,res,next)=>{
    console.log(req.headers)
    res.send('done')
})



module.exports = router;
