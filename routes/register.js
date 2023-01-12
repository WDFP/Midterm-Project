const express = require('express');
const router  = express.Router();
const { getUserWithID, getUserWithEmail, addUser, getUsers } = require('./queries');

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
    req.flash("errors", "Please insert a valid username and password!");
    res.redirect("/register");
    return;
  } else {
    getUserByUsername(db, user.username)
    .then(existingUser => {
      if (existingUser) {
        res.statusCode = 400;

  }
});


return router;
};
