const { application } = require('express');
const express = require('express');
const router  = express.Router();
const mapQuery = require('../db/queries/mapQuery')
const mapPageQuery = require('../db/queries/mappageQuery')

router.get('/:id', (req, res) => {
  const templatevars = {};
  mapQuery.getMapFromID(req.params.id)
  .then(map => {
    templatevars.map = map;
    mapQuery.getMarkersForMap(req.params.id)
    .then(markers => {
      templatevars.markers = markers;
      res.render('map', templatevars);
    })
    ;})
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

router.get('/:id/addMarker', (req, res) => {
  const templatevars = {};
  const point = {
    map_id: req.params.id,
    contributor_id: 1,
    title: req.query.name,
    description: req.query.description,
    image_url: req.query.image_url,
    latitude: req.query.latitude,
    longitude: req.query.longitude
  }
  mapPageQuery.createMarker(point)
  .then( () => {
    mapQuery.getMapFromID(req.params.id)
    .then(map => {
      templatevars.map = map;
      mapQuery.getMarkersForMap(req.params.id)
      .then(markers => {
      templatevars.markers = markers;
      res.redirect(`/map/${req.params.id}`);
    });
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
  })
})

router.get('/:id/deleteMarker', (req, res) => {
  mapQuery.deleteMarker(req.params.id)
  .then(() => {
    res.redirect('/');
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
});

router.get('/:id/editMarker', (req, res) => {
  const templatevars = {};
  templatevars.id = req.params.id;
  res.render('editMarker', templatevars);
})

router.post('/:id/editMarkerSubmit', (req, res) => {
  const body = {
    name: req.body.name,
    description: req.body.description,
    image_url: req.body.image_url,
    latitude: req.body.latitude,
    longitude: req.body.latitude
  };
  mapQuery.editMarker(body, req.params.id)
  .then(() => {
    res.redirect('/');
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
})

module.exports = router;
