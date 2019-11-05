const express = require("express");
const app = express();

var session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("./config/passport");

const port = process.env.PORT || 5000;

var db = require("./models");

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static file declaration
app.use(express.static(path.join(__dirname, "client/build")));

//Passport setup
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

var syncOptions = { force: false };

// production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/", (req, res) => {
    res.sendfile(path.join((__dirname = "client/build/index.html")));
  });
}

//build mode
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/public/index.html"));
});

require("./routes/apiRoutes")(app);

//Start server

db.sequelize.sync(syncOptions).then(function() {
  app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`);
  });
});
