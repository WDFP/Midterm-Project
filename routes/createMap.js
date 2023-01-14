
const { application } = require('express');
const express = require('express');
const router  = express.Router();
const helper = require('./helpers')

router.post('/createMap', (req, res) => {
  const templatevars = {};
  const map = {
    owner_id: 1,
    name: req.body.name,
    description: req.body.description,
    latitude: parseFloat(req.body.latitude),
    longitude: parseFloat(req.body.longitude),
  }
  console.log(`map: `, map)
  helper.createMap(map)
  .then(()=> {
    // console.log(`res: `, res);
    res.redirect('/')
  })
  .catch(e => {
    console.error(e);
    res.send(e)
  });
  })

  router.get('/delete/:id', (req, res) => {
    const templatevars = {};
    console.log(`req: ` , Number(req.params.id));
    helper.deleteMap(Number(req.params.id))
    .then(() => {
      res.redirect('/');
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

module.exports = router;
