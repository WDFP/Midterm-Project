const express = require('express');
const router  = express.Router();
const { getUserWithID, getUserWithEmail, addUser, getUsers } = require('./helpers');

  router.get('/', (req, res) => {
    const templateVars = {
      user: req.session.username,
    };
    const userID = req.session.user_id;
    const username = req.session.username;
    if (!userID) {
      res.render('login', {user: req.body.email, password: req.body.password});
    } else {
      res.redirect('/');
    }
  });

  router.post('/', (req, res) => {
    const user = {
      name: "test",
      email: req.body.email,
      password: req.body.password,
      bio: "bio",
      photo_url: "test"
    };
    const templateVars = {};
    if (!req.body.email || !req.body.password) {
      res.status(400).send("400 error! Please Provide Your Information");
      res.redirect("/login");
      return;
    } else {
      getUserWithEmail(req.body.email)
      .then(existingUser => {
        console.log("hello");
        if (!existingUser) {
          res.statusCode = 400;
          res.status(400).send("400 error! Incorrect email/password.");
        } else {
          const userID = existingUser.id;
          const username = existingUser.email;
          req.session.user_id = userID;
          req.session.username = username;
          res.redirect("/profile");
        }
      })
    }
});


module.exports = router;
