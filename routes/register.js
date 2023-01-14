const express = require('express');
const router  = express.Router();
const { getUserWithId, getUserWithEmail, addUser, getUsers } = require('./helpers');

// module.exports = (db) => {

// if user is not logged in
router.get("/", (req, res) => {
  const templateVars = {};
  res.render("register", templateVars);
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
    res.redirect("/register");
    return;
  } else {
    getUserWithId(req.body.username)
      .then(existingUser => {
        console.log("hello");
        if (existingUser) {
          res.statusCode = 400;
          res.status(400).send("400 error! Sorry, that username is unavailable.");
        } else {
          getUserWithEmail(req.body.email)
            .then(existingUser => {
              console.log("hi");
              if (existingUser) {
                res.statusCode = 400;
                res.status(400).send("400 error! Sorry, that email is already registered");
              } else {
                console.log(user);
                addUser(user)
                .then(existingUser => {
                  console.log(existingUser);
                  console.log("addUser");
                    const userID = existingUser.id;
                    const username = existingUser.email;
                    req.session.user_id = userID;
                    req.session.username = username;
                    // console.log(req.session);
                    res.redirect(`/users/${userID}`);
                  });
              }
            });
        }
      });
  }
});


module.exports = router;
