const { application } = require('express');
const express = require('express');
const router  = express.Router();
const mapQuery = require('../db/queries/mapQuery')

router.post('/:id', (req, res) => {
  const templatevars = {};
  mapQuery.getMapFromID(req.params.id)
  .then(map => {
    templatevars.map = map;
    mapQuery.getMarkersForMap(req.params.id)
    .then(markers => {
      console.log('markers: ', markers);
      templatevars.markers = markers;
      console.log('templatevars: ', templatevars);
      res.render('map', templatevars);
    })
    ;})
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

/* Previous POST request
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
*/

module.exports = router;
