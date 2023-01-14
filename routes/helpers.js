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

module.exports = { getUserWithEmail, getUserWithId, getAllMaps, getUsers, addUser, createMap, deleteMap};
