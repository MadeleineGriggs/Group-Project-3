var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  //Route to create a new project.
  app.post("/api/project", function(req, res) {
    db.Project.create({
      text: req.body.text,
      description: req.body.description
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //API route for user login, includes local authentication cookie.
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  //Creates a new user.
  app.post("/api/new-user", function(req, res) {
    db.User.create({
      name: req.body.name,
      jobtitle: req.body.jobtitle,
      hourlyrate: req.body.hourlyrate,
      email: req.body.email,
      company: req.body.company,
      password: req.body.password
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //Creates a new meeting.
  app.post("/api/new-meeting", function(req, res) {
    db.Meeting.create({
      date: req.body.date,
      start: req.body.start,
      durationH: req.body.durationH,
      durationM: req.body.durationM,
      title: req.body.title,
      attendees: req.body.attendees,
      description: req.body.description
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //Creates new attendees for meetings.
  app.post("/api/attendees", function(req, res) {
    db.Attendees.create({
      mId: req.body.mId,
      uId: req.body.uId
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  //Logs the user out.
  app.get("/api/logout", function(req, res) {
    req.logout();
  });

  //Checks if the user is logged in.
  app.get("/api/authCheck", function(req, res) {
    if (req.isAuthenticated()) {
      console.log("authCheck");
      res.json(req.user);
    } else {
      console.log("Authcheck didn't work.");
    }
  });

  //API route to get all meetings. Used to populate the calendar display.
  app.get("/api/all-meetings", function(req, res) {
    db.Meeting.findAll({

      attributes: ['title', 'date']
    }).then( meetings => (res.json(meetings))
    )
  });


  //API route to get all users who belong to the same company as the user who is logged in
  //used to populate the meeting scheduler.
  app.get("/api/all-users", function(req, res) {
    if(req.isAuthenticated()) {
      console.log("authcheck")
      db.User.findOne({
        where: {
          Id: req.user.id
        },
        attributes: ['company']
      }).then((user) => {
        db.User.findAll({
          where: {
            company: user.company
          },
          attributes: ['id', 'name', 'company', 'email']
        }).then(users => res.json(users))
      })
    } else {
      res.json(["Authcheck didn't work. : oops"]);
    }

  });


};
