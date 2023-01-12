const users = require('../../routes/users');
const db = require('../connection');


const getUserWithEmail = function (email) {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

module.exports = { getUserWithEmail };

const getUserWithId = function (id) {
  return db
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

module.exports = { getUserWithId };

const getAllMaps = () => {
  const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }
    return db.query(`SELECT users.id as user_name, maps.name as map_name, map.description as description
    FROM users
    JOIN maps ON users.id = owner_id;`)
      .then(display => {
        return display.rows;
      })
      .catch((err) => {
        console.log(err);
        return null;
    });
};

module.exports = { getAllMaps };

const getFavouritesMap = () => {
    return db
      .query(
        `SELECT maps.name as my_favourite_map, count(favourites.*) as number_of_favourite_map
        FROM favourites
        JOiN users ON users.id = userFavourites_id
        JOIN maps ON maps.id = mapsFavourites_id
        GROUP BY maps.name
        ORDER BY DESC
        LIMIT 5`)
      .then((result) => {
        return result.rows;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
  };

  module.exports = { getFavouritesMap };
