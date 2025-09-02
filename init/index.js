require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data: sampleListings } = require("./data.js");

// Connect to DB
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/RoomRental");
    console.log("Connected to MongoDB");
    await initDB();
    mongoose.connection.close(); 
    console.log("MongoDB connection closed");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

async function initDB() {
  try {
    await Listing.deleteMany({});
    console.log("Existing listings deleted");

    const listingsWithOwner = sampleListings.map((obj) => ({
      ...obj,
      owner: "652d0081ae547c5d37e56b5f", 
    }));

    await Listing.insertMany(listingsWithOwner);
    console.log("Sample listings inserted");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

main();
