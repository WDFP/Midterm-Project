const { request } = require('express');
const saltRounds = 10;
const env = require("dotenv").config({ path: "./.env" });

const getUserByUsername = function(db, submittedUsername) {
  return db.query(`
  SELECT *
  FROM users
  WHERE username ~* $1
  `, [`^${submittedUsername}$`])
    .then(res => res.rows[0]);
};

const getUserByEmail = function(db, submittedEmail) {
  return db.query(`
  SELECT *
  FROM users
  WHERE email ~* $1
  `, [`^${submittedEmail}$`])
    .then(res => res.rows[0]);
};

const addUser = function(db, user) {
  user.password = bcrypt.hashSync(user.password, saltRounds);
  return db.query(`
  INSERT INTO users (username, email, password, created_at)
  VALUES ($1, $2, $3, now()::date)
  RETURNING *
  `, [user.username, user.email, user.password])
    .then(res => res.rows[0]);
};
