const express = require('express');
const router  = express.Router();
const { getUserWithID, getUserWithEmail, addUser, getUsers } = require('./helpers');

  router.get('/', (req, res) => {
    const userID = req.session.user_id;
    const username = req.session.username;
    if (!userID) {
      res.render('login', {user: username, id: userID});
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
});


module.exports = router;
