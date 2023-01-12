const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      //console.log(`data.rows:`, data.rows)
      return data.rows;
    });
}

// console.log(`getMaps:`, getMaps())
module.exports = { getMaps };