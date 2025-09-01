module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You want to Login to create listings");
    return res.redirect("/login");
  }
  next();
};
