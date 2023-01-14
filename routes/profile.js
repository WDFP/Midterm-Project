const express = require('express');
const router  = express.Router();
const { getUserMaps, getUserWithId, getUserWithEmail, addUser, getUsers, getFavouritesMap } = require('./helpers');

router.get('/', (req, res) => {
  const requestedUserId = req.params.id;
  const templateVars = {};
  console.log("hello");
  res.render('profile');
  getUserWithId()
    .then(user => {
      templateVars.ownerIsLoggedIn = currentUser === user.id;
      templateVars.username = user.username;
      getFavouritesMap(requestedUserId)
        .then(userFavourites => {
          templateVars.userFavourites = userFavourites;
                  res.render('profile', templateVars);
                });
            });
        });



module.exports = router;
