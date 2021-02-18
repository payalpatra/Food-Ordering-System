// Server
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
// const bodyParser = require("body-parser");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);
const passport = require("passport");

// Database Connection
const url = process.env.DB_CONNECTION;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// Session Store
let mongoStore = new MongoDbStore({
  mongooseConnection: connection,
  collection: "sessions",
});

// Session Configuration
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Cookie Life - 24 hours
  })
);
// -- Set Passport Config After Session Config -- //
// Passport Configuration
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// To show Flash message
app.use(flash());

// app.use(bodyParser.urlencoded({ extended: false }));
// Use Assets
app.use(express.static("public"));
// --- To get Form Data --- //
app.use(express.urlencoded({ extended: false }));
// --- To get Cart Data --- //
app.use(express.json());

// Global Middleware
app.use((req, res, next) => {
  // -- To get the session -- //
  res.locals.session = req.session;
  // -- To get the User -- //
  res.locals.user = req.user;
  next();
});

// Set Template Engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// Routes
require("./routes/web")(app);

// Listen
app.listen(socket || 3000, function () {
  console.log("server is running in port 3000");
});
