function auth(req, res, next) {
  // To Check if the user is authenticated
  if (req.isAuthenticated()) {
    // Authenticated User
    return next();
    // Unauthenticated User
  } else {
    return res.redirect("/login");
  }
}

module.exports = auth;
