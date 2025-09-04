const Listing = require("./models/listing");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // Redirect URL
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You want to Login to create listings");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req,res, next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req,res,next)=>{
  let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the Owner ");
      return res.redirect(`/listings/${id}`);
    }

    next();
}