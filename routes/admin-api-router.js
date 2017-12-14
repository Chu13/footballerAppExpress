const express = require('express');
const bcrypt = require('bcrypt');

const Admin = require('../models/admin-model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  if ( req.body.password.length < 8 ||
       req.body.password.match(/[^a-z0-9]/i) === null
  ) {
    res.status(400).json({ error: 'Password invalid' });
    return;
  }

  Admin.findOne({ email: req.body.email })
  .then((adminFromdb) => {
      if(adminFromdb !== null){
        res.status(400).json({ error: 'Email is taken' });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(req.body.password);
      console.log(scrambledPassword);

      const theAdmin = new Admin({
        placeName: req.body.placeName,
        email: req.body.email,
        encryptedPassword: scrambledPassword,
        phone: req.body.phone,
        location: req.body.location,
        fields: req.body.fields
      });

      return theAdmin.save();
  })
  .then((adminFromdb) => {
    // log the admin in automatically if sign up works
    req.login(adminFromdb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      adminFromdb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          adminInfo: adminFromdb
        });
    });
  })
  .catch((err) => {
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({ error: 'Sign up database error' });
      console.log(err);
    }
  });
}); //POST /api/signup



router.post('/login', (req, res, next) => {
  Admin.findOne({ email: req.body.email })
  .then((adminFromdb) => {
    if (adminFromdb === null) {
      res.status(400).json({ error: 'Email is invalid' });
      return;
    }
console.log(adminFromdb.encryptedPassword);
console.log(req.body.password);

    const isPasswordGood =
    bcrypt.compareSync(req.body.password, adminFromdb.encryptedPassword);

    if (isPasswordGood === false) {
      res.status(400).json({ error: 'Password is invalid' });
      return;
    }

    req.login(adminFromdb, (err) => {
      // clear the encryptedPassword before sending the user info
      // (otherwise it's a security risk)
      adminFromdb.encryptedPassword = undefined;

        res.status(200).json({
          isLoggedIn: true,
          AdminInfo: adminFromdb
        });
    });

  })
  .catch((err) => {
    console.log("Post /login ERROR!");
    console.log(err);

    res.status(500).json({ error: 'Login database error' });
  });
}); //POST /api/login


router.delete('/logout', (req, res, next) => {
    req.logout();

    res.status(200).json({
        isLoggedIn: false,
        userInfo: null
    });
}); // DELETE /logout



router.get('/checklogin', (req, res, next) => {
    if (req.user) {
        // clear the "encryptedPassword" before sending the user info
        // (otherwise it's a security risk)
        req.user.encryptedPassword = undefined;

        res.status(200).json({
            isLoggedIn: true,
            userInfo: req.user
        });
    }
    else {
        res.status(200).json({
            isLoggedIn: false,
            userInfo: null
        });
    }
}); // GET /checklogin



module.exports = router;
