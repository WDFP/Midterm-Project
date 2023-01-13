const express = require('express');
const router  = express.Router();
const mapQuery = require('../db/queries/mapQuery')

router.post('/:id', (req, res) => {
  mapQuery.getMapFromID(req.params.id)
  .then(map => {
    const templatevars = {
      map: map
    };
    res.render('map', templatevars)
    ;})
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

module.exports = router;
