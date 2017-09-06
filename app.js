var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Mountain Goat's Rest", 
//     image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg",
//     description: "This is a huge mountain goat's rest, no bathrooms. No water. Beautiful mountains"
    
// }, function(err, campground){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Newly Created Campground: ");
//     console.log(campground);
//   } 
// });

app.get("/", function(req, res){
  res.render("landing");
})

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("index", {campgrounds: allCampgrounds});
      }
    });
});

//CREATE - add new campgrounds to DB
app.post("/campgrounds", function(req, res){
  var name = req.body.name; 
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
        // Redirect back to campgrounds page
        res.redirect("/campgrounds");      
    }
  });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

//SHOW - shows info about one campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        console.log(err)
      } else {
        //render show template with that campground
        res.render("show", {campground: foundCampground});
      }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is on!");
});