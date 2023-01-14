const express = require('express');
const router  = express.Router();
const { getUserWithId, getUserWithEmail, addUser, getUsers, getFavouritesMap } = require('./helpers');

router.get('/id', (req, res) => {
  const currentUser = req.session.user_id;
  const requestedUserId = req.params.id;
  const templateVars = {};
  getUserWithId(db, requestedUserId)
    .then(user => {
      templateVars.ownerIsLoggedIn = currentUser === user.id;
      templateVars.username = user.username;
      getFavouritesMap(db, requestedUserId)
        .then(userFavourites => {
          templateVars.userFavourites = userFavourites;
                  res.render('profile', templateVars);
                });
            });
        });


module.exports = router;
