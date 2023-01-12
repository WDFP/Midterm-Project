const db = require('../connection');

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

module.exports = { addUser };
