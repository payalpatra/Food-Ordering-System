function admin(req, res, next) {
  // To Check if the user is admin
  if (req.isAuthenticated() && req.user.role === "admin") {
    // Authenticated User
    return next();
    // Unauthenticated User
  } else {
    return res.redirect("/login");
  }
}

module.exports = admin;
