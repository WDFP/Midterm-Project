const express = require('express');
const router  = express.Router();
const { getUserWithID, getUserWithEmail, addUser, getUsers } = require('./helpers');

module.exports = (db) => {

// if user is not logged in
router.get("/", (req, res) => {
  let templateVars = { user: req.session.user_id };
  res.render("register", templateVars);
});

const user = {
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
};

router.post('/', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("400 error! Please Provide Your Information");
    res.redirect("/register");
    return;
  } else {
    getUserWithID(db, req.body.username)
      .then(existingUser => {
        if (existingUser) {
          res.statusCode = 400;
          res.status(400).send("400 error! Sorry, that username is unavailable.");
        } else {
          getUserWithEmail(db, req.body.email)
            .then(existingUser => {
              if (existingUser) {
                res.statusCode = 400;
                res.status(400).send("400 error! Sorry, that email is already registered");
              } else {
                addUser(db, user);
                getUserWithID(db, req.body.username)
                  .then(existingUser => {
                    const userID = existingUser.id;
                    const username = existingreq.body.username;
                    req.session.user_id = userID;
                    req.session.username = username;
                    console.log(req.session);
                    res.redirect(`/users/${userID}`);
                  });
              }
            });
        }
      });
  }
});



return router;
};
