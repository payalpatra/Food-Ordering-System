const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

function authController() {
  return {
    // Get Register Controller
    register: function (req, res) {
      res.render("auth/register");
    },
    // Post Register Controller
    postRegister: async function (req, res) {
      const { name, email, password } = req.body;
      // Validating User Data
      if (!name || !email || !password) {
        // Flash Message if any input field is input
        req.flash("error", "All fields are required");
        //  To display the previous input values even after the error
        req.flash("name", name);
        req.flash("email", email);
        res.redirect("/register");
      }

      // --- Unique Email Id Functionality -- //
      User.exists({ email: email }, (error, result) => {
        if (result) {
          req.flash("error", "Email already exists");
          req.flash("name", name);
          req.flash("email", email);
          res.redirect("/register");
        }
      });
      // Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Createing a New User in the DB
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      // User Data Stored
      user
        .save()
        .then((user) => {
          // Automatic Login
          res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          res.redirect("/register");
        });
    },
    // Get Login Controller
    login: function (req, res) {
      res.render("auth/login");
    },
    // Post Login Controller
    postLogin: function (req, res, next) {
      const { email, password } = req.body;
      // Validating User Data
      if (!email || !password) {
        // Flash Message if any input field is input
        req.flash("error", "All fields are required");
        return res.redirect("/login");
      }
      // Login Authentication
      passport.authenticate("local", (err, user, info) => {
        // Error in Login
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        // No User Matched
        if (!user) {
          req.flash("error", info.message);
          res.redirect("/login");
        }

        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          // Succsessfull Login
          return res.redirect("/");
        });
      })(req, res, next);
    },

    // Logout Controller
    logout: function (req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authController;
