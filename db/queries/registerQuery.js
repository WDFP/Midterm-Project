const db = require('../connection');

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

module.exports = { addFullUser, addUserNamePassword };
