const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Usuario =require('../models/usuario');
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']

  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreateByFacebook({ facebookId: profile.id }, function (err, user) {
        if (err) console.log("error conexion Facebook" + err);
        return cb(err, user);
    });
  }
));


passport.use(new GoogleStrategy({
    clientID:  process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.HOST + "/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));


passport.use(new LocalStrategy(

    function(email, password, done) {
        Usuario.findOne({ email: email}, function (err, usuario) {  
            if (err) {
                 return done(err); 
            }
            if (!usuario) {
                return done(null, false, { message: 'Username incorrecto.' });
            }
            if (!usuario.validPassword(password)) {
        
                return done(null, false, { message: 'Password incorrecto.' });
            }
            return done(null, usuario);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null,user.id);
});

passport.deserializeUser(function(id, cb){
    Usuario.findById(id,function(err, usuario){
        cb(err,usuario);
    });
});

module.exports = passport