const express = require('express');
const router  = express.Router();
const { getAllMaps, getUserWithId, getUserWithEmail, addUser, getUsers, getFavouritesMap } = require('./helpers');

router.get('/', (req, res) => {
  getAllMaps(req.session.user_id)
  .then(maps => {
  console.log(req.session)
  // const userId = req.session.userID;
  const requestedUserId = req.params.id;
  // if (!userId) {
  //   res.send({message: "not logged in"});
  //   return;
  // }
  const templateVars = {
    user: req.session.username,
    maps: maps
  };
  console.log(templateVars);
  getUserWithId()
  .then(user => {
    templateVars.ownerIsLoggedIn === req.session.user_id;
    templateVars.username = req.body.username;
    getFavouritesMap(requestedUserId)
    .then(userFavourites => {
      templateVars.userFavourites = userFavourites;
              res.render('profile', templateVars);
      });
    });
  });
});



module.exports = router;
