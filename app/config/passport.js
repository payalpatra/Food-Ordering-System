const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        // To check if the email already exists
        const user = await User.findOne({ email: email });
        // --- No user Found with the Input Email Id--- //
        if (!user) {
          return done(null, false, { message: "No user with this email" });
        }
        // --- Input User's Email Found and Password Matched --- //
        bcrypt
          .compare(password, user.password)
          .then((match) => {
            if (match) {
              return done(null, user, { message: "Logged in Successfully" });
            }
            // --- Input User's Email Found but Password did not Matched --- //
            return done(null, false, { message: "Wrong username or password" });
          })
          .catch((err) => {
            return done(null, false, { message: "Something went wrong" });
          });
      }
    )
  );
  passport.serializeUser((user, done) => {
    // user._id store after login
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    // To get the user from the id
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
module.exports = init;
