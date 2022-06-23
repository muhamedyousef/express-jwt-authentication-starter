const fs = require("fs");
const passport = require("passport");
//const { ExtractJwt } = require("passport-jwt");
const path = require("path");
const User = require("mongoose").model("User");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// TODO
/*const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY || "secret phrase",
  issuer: "enter isuer here",
  audience: "enter audience here",
  algorithms: ["RS256"],
  ignoreExpiration: false,
  passReqToCallback: false,
  jsonWebTokenOptions: {
    complete: false,
    clockTolerence: "",
    maxAge: "2d",
    clockTimeStamp: "100",
    nonece: "string here for openId",
  },
};*/

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = PUB_KEY;
opts.algorithm = ['RS256'];

const strategy = new JwtStrategy(opts,(payload,done)=>{
    User.findOne({_id:payload.sub})
    .then((user)=>{
        if(user){
            return done(null,user);
        }else{
            return done(null,false)
        }
    })
    .catch(err=>{done(err,null)});
})


// TODO
module.exports = (passport) => {
    passport.use(strategy);
};
