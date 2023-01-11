const express = require('express');
const router  = express.Router();
const { getUserByUsername, getUserByEmail, addUser } = require('./helpers');

module.exports = (db) => {

// if user is not logged in
router.get("/register", (req, res) => {
  const templateVars = {
    user: users[req.session],
  };
  res.render("register", templateVars);
});


return router;
};
