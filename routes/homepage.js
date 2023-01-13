const express = require('express');
const router  = express.Router();
const homepageQuery = require('../db/queries/homepageQuery')
// console.log(homepageQuery);
const { getMaps } = require('../db/queries/homepageQuery')

router.get('/', (req, res) => {
  getMaps()
  .then(maps => {
    console.log(req);
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
