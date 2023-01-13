const express = require('express');
const router  = express.Router();
const { getUserWithID, getUserWithEmail, addUser, getUsers } = require('./helpers');

  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    const username = req.session.username;
    if (!userID) {
      res.render('login', {user: username, id: userID});
    } else {
      res.redirect('/register');
    }
  });

  router.post('/', (req, res) => {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
    const templateVars = {};
    if (!req.body.email || !req.body.password) {
      res.status(400).send("400 error! Please Provide Your Login Info");
    } else {
      getUserWithID(db, req.body.username)
        .then(existingUser => {
          if (!existingUser) {
            res.statusCode = 403;
            res.status(403).send("400 error! Sorry, the username/password is incorrect.");
          } else {
            getUserWithEmail(db, req.body.email)
              .then(existingUser => {
                if (!existingUser) {
                  res.statusCode = 403;
                  res.status(403).send("400 error! Sorry, the username/password is incorrect.");
                }
              })
          }
        })
    }
});


module.exports = router;
