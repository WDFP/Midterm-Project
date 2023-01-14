const { request } = require('express');
const saltRounds = 10;
const db = require('../db/connection');


const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


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

const getAllMaps = (id) => {
    return db.query(`SELECT * FROM maps WHERE owner_id = $1;`,[id])
      .then(display => {
        return display.rows;
      })
      .catch((err) => {
        console.log(err);
        return null;
    });
};

const addUser = function (user) {
  return db
    .query(
      `INSERT INTO users (name, email, bio, photo_url)
  VALUES($1, $2, $3, $4)
  RETURNING *`,
      [user.name, user.email, user.bio, user.photo_url]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const createMap = function (map) {
  return db.query(
      `INSERT INTO maps(owner_id, name, description, latitude, longitude)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *`,
      [map.owner_id, map.name, map.description, map.latitude, map.longitude]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const deleteMap = function(id){
  return db.query(
    `DELETE FROM maps
    WHERE id = $1;`,
    [id]
  ).then((data) => {
    console.log(data)
    return data.rows;
  })
}

const getFavouritesMap = () => {
  return db
    .query(
      `SELECT maps.name as my_favourite_map, count(favourites.*) as number_of_favourite_map
      FROM favourites
      JOiN users ON users.id = owner_id
      JOIN maps ON maps.id = map_id
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


module.exports = { getUserWithEmail, getUserWithId, getAllMaps, getUsers, addUser, createMap, deleteMap, getFavouritesMap};
