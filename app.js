const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing =  require('./models/listing/js');
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/RoomRental";

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set('view-engine',"ejs");
app.set("views",path.join(__dirname,"views"))

app.get("/", (req, res) => {
  res.send("Hello World");
});

// show All list/ data
app.get('/listings',async (req,res)=>{
  const allListing= await Listing.find({})
  res.render('/listings/index.ejs',{allListing});
 
})

app.listen(5050, () => {
  console.log("Server running on 5050");
});
