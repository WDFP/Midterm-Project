/*  Purpose of code is to get maps listed in the homepage: which includes the id, name, description */

const users = require('../../routes/users');
const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT id, name, description FROM maps;')
    .then(data => {
      console.log(`data.rows:`, data.rows)
      return data.rows;
    });
};

// console.log(`getMaps:`, getMaps())
module.exports = { getMaps };

// const HomepageMapsDisplay = () => {
//   return db.query(`SELECT users.id as user_name, maps.name as map_name, map.description as description
//   FROM users
//   JOIN maps ON users.id = owner_id;`)
//     .then(display => {
//       return display.rows;
//     })
//     .catch((err) => {
//       console.log(err);
//       return null;
//     });
// };

// module.exports = { HomepageMapsDisplay };
