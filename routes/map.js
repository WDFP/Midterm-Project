const express = require('express');
const router  = express.Router();
const mapQuery = require('../db/queries/mapQuery')

router.get(':id/map', (req, res) => {
  mapQuery.getMaps()
  .then(maps => {
    const templatevars = {
      maps: maps
    };
    res.render('map', templatevars)
    ;})

  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

module.exports = router;
