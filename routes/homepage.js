const express = require('express');
const router  = express.Router();
const homepageQuery = require('../db/queries/homepageQuery')
// console.log(homepageQuery);

router.get('/', (req, res) => {
  homepageQuery.getMaps()
  .then(maps => {
    const templatevars = {
      maps: maps
    };
    res.render('homepage', templatevars)
    ;})

  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

module.exports = router;
