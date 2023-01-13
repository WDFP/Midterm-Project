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

// console.log(`getMaps:`, getMaps())
module.exports = { getMapFromID, getMarkersForMap };