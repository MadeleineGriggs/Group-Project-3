var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    function(email, password, done) {
    db.User.findOne({
        where: {email: email}
    }).then(function(user) {
        if (!user) {
            return done(null, false, {
                message: "Incorrect email address."
            });
        } else if (!user.validPassword(password)) {
            return done(null, false, {
                message: "Incorrect password."
            });
        } else {
            return done(null, user);
        }

    });

}

));

passport.serializeUser(function(user, callback) {
    callback(null, user);
});
  
passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
});
  
module.exports = passport;