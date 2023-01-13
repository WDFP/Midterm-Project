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

const getMaps = () => {
  return db.query('SELECT id, name, description FROM maps;')
    .then(data => {
      //console.log(`data.rows:`, data.rows)
      return data.rows;
    });
};

// console.log(`getMaps:`, getMaps())
module.exports = { getMaps };

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

const getPoints = () => {
  return db.query(`SELECT points.title as title, points.image_url as picture, points.description as description
  FROM points
  JOIN maps ON maps.id = map_id`)
    .then(points => {
      return points.rows;
  });
};

const pointDescription = () => {
  return db.query(`SELECT * FROM points`)
    .then(result=> {
      return result.rows;
    });
  };

const createMaps = function(map) {
  return db.query(
      `INSERT INTO maps (name, description, latitude, longitude)
  VALUES($1, $2, $3, $4)
  RETURNING *`,
      [map.name, map.description, map.latitude, map.longitude]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const createMarker = function (point) {
  return db.query(
      `INSERT INTO points (title, description, image_url, latitude, longitude)
  VALUES($1, $2, $3, $4, $5)
  RETURNING *`,
      [point.title, point.description, point.image_url, point.latitude, point.longitude]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

const addFullUser = function (user) {
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

const addUserNamePassword = function (user) {
  return db
    .query(
      `INSERT INTO users (name, password)
  VALUES($1, $2)
  RETURNING *`,
      [user.name, user.password]
    )
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};


module.exports = { getUserWithEmail, getUserWithId, getAllMaps, getUsers, getMaps, getMapFromID, getMarkersForMap, getPoints, createMaps, createMarker, pointDescription, addFullUser,addUserNamePassword };

