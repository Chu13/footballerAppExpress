const passport = require("passport");

const Admin = require("../models/admin-model");

const Player = require("../models/player-model");

passport.serializeUser((adminFromdb, done) => {
  done(null, adminFromdb._id);
});

passport.deserializeUser((idFromSession, done) => {
  Admin.findById(idFromSession)
  .then((adminFromdb) => {
    done(null, adminFromdb);
  })
  .catch((err) => {
    done(err);
  });
}); // Passport for ADMIN



passport.serializeUser((playerFromdb, done) => {
  done(null, playerFromdb._id);
});

passport.deserializeUser((idFromSession, done) => {
  Player.findById(idFromSession)
  .then((playerFromdb) => {
    done(null, playerFromdb);
  })
  .catch((err) => {
    done(err);
  });
}); // Passport for PLAYER
