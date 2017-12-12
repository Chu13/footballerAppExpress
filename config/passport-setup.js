const passport = require("passport");

const Player = require("../models/player-model");

passport.serializeUser((userFromdb, done) => {
  done(null, userFromdb._id);
});

passport.deserializeUser((idFromSession, done) => {
  User.findById(idFromSession)
  .then((userFromdb) => {
    done(null, userFromdb);
  })
  .catch((err) => {
    done(err);
  });
});
