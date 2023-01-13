const db = require('../connection');

const getMapFromID = (id) => {
  return db.query('SELECT * FROM maps WHERE id = $1;', [id])
    .then(data => {
      //console.log(`data.rows:`, data.rows)
      return data.rows;
    });
}

// console.log(`getMaps:`, getMaps())
module.exports = { getMapFromID };