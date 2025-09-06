const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

const listingController = require("../controllers/listings.js");

// show All list/ data
router.get("/", wrapAsync(listingController.index));

// For Creating new data
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show perticular data information
router.get("/:id", wrapAsync(listingController.showListing));

// for save/Create new data
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
