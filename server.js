// Imports
const path = require('path');
const cors = require('cors');
const connectToDB = require('./db.js');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const helmet = require('helmet');

// import routes
const adsRoutes = require('./routes/ads.routes.js');
const authRoutes = require('./routes/auth.routes.js');

const app = express();
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000');
});

// connect to DB
connectToDB()

// middleware for diferent ports client and server
if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:8000'],
      credentials: true,
    })
  );
}

app.use(express.urlencoded({ extended: false }));   // x-www-form-urlencoded
app.use(express.json());    // form-data JSON format

app.use(session({
	secret: process.env.DB_SECRET,
	store: MongoStore.create(mongoose.connection),
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: process.env.NODE_ENV == 'production',
	},
	unset: 'destroy',
}));

// add routes
app.use('/api', adsRoutes); // add ads routes to server
app.use('/api/auth', authRoutes); // add auth routes to server

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res) => {
	res.status(404).json({ message: '404 Not found...' });
});

module.exports = server;