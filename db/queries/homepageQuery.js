/*  Purpose of code is to get maps listed in the homepage: which includes the id, name, description */

const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      // console.log(`data.rows:`, data.rows)
      return data.rows;
    });
}

// console.log(`getMaps:`, getMaps())
module.exports = { getMaps };
