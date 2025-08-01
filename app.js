const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing =  require('./models/listing/js');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');

require('dotenv').config();

main()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.set('view-engine',"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


// show All list/ data
app.get('/listings',async (req,res)=>{
  const allListing= await Listing.find({})
  res.render('/listings/index.ejs',{allListing});
 
})

// For Creating new data 
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show perticular data information 
app.get("/listings/:id",async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});

})
  
// for save new data
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});


app.listen(5050, () => {
  console.log("Server running on 5050");
});
