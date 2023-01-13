const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps;')
    .then(data => {
      // console.log(`data.rows:`, data.rows)
      return data.rows;
    });
}
module.exports = { getMaps };

const pointDescription = () => {
  return db.query(`SELECT * FROM points`)
    .then(result=> {
      return result.rows;
    });
  };
module.exports = { pointDescription };


const getPoints = () => {
  return db.query(`SELECT points.title as title, points.image_url as picture, points.description as description
  FROM points
  JOIN maps ON maps.id = map_id`)
    .then(points => {
      return points.rows;
  });
};
module.exports = { getPoints };

const createMaps = function(map) {
  // const userId = req.session.userId;
  //   if (!userId) {
  //     res.send({message: "not logged in"});
  //     return;
  //   }
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
module.exports = { createMaps };

const createMarker = function (point) {
  // const userId = req.session.userId;
  //   if (!userId) {
  //     res.send({message: "not logged in"});
  //     return;
  //   }
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
module.exports = { createMarker };
