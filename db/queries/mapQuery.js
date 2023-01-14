const db = require('../connection');

const getMapFromID = (id) => {
  return db.query('SELECT * FROM maps WHERE id = $1;', [id])
    .then(data => {
      //console.log(`data.rows:`, data.rows)
      return data.rows;
    });
}

const getMarkersForMap = (id) => {
  return db.query('SELECT * FROM points WHERE map_id = $1;', [id])
    .then(data => {
      return data.rows;
    });
}

const deleteMarker = (id) => {
  return db.query('DELETE FROM points WHERE id = $1', [id])
    .then(data => {
      return data.rows;
    });
}

const getMapIDFromMarker = (id) => {
  return db.query('SELECT maps.id FROM maps JOIN points ON maps.id = points.map_id WHERE points.id = 6;', [id])
    .then(data => {
      return data.rows;
    });
}

const editMarker = (body, id) => {
  return db.query('UPDATE points SET title = $1, description = $2, image_url = $3, latitude = $4, longitude = $5 WHERE id = $6', [body.name, body.description, body.image_url, body.latitude, body.longitude, id])
    .then(data => {
      return data.rows;
    });
}

// console.log(`getMaps:`, getMaps())
module.exports = { getMapFromID, getMarkersForMap, deleteMarker, getMapIDFromMarker, editMarker };