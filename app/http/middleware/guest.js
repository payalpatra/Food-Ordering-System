function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  // LoggedIn user can not access Login and register route //
  return res.redirect("/");
}

module.exports = guest;
