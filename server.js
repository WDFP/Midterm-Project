// load .env data into process.env
require('dotenv').config();


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["userID, username"],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const createMapRoutes = require('./routes/createMap');
const mapRoutes = require('./routes/map');
const userApiRoutes = require('./routes/users-api');
const homepageRoutes = require('./routes/homepage');
const usersRoutes = require('./routes/users');
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const profileRoutes = require("./routes/profile");
const logoutRoutes = require("./routes/logout");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/createMap', createMapRoutes)
app.use('/map', mapRoutes);
app.use('/api/users', userApiRoutes);
app.use('/', homepageRoutes);
app.use('/users', usersRoutes);
app.use("/profile", profileRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// // Testing right now ---
// const homepageQuery = require('./db/queries/homepageQuery')
// const mapRouter = express.Router();
// mapRoutes(mapRouter, homepageQuery);

// if (!req.session.user_id) {
//   req.session.user_id = null;
// }

app.get('/home', (req, res) => {
});

app.get('/createMap', (req, res) => {
  const templateVars = {
    user: req.session.username
  }
  res.render('createMap', templateVars);
})

app.get('/profile', (req, res) => {
  res.render('profile');
})

app.get('/login/', (req, res) => {
  // using encrypted cookies
  req.session.user_id = req.params.id;

  // or using plain-text cookies
  res.cookie('user_id', req.params.id);

  // send the user somewhere
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
