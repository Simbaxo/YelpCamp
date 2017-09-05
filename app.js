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
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Mountain Goat's Rest", 
//     image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"
    
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

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
      if(err){
        console.log(err);
      } else {
        res.render("campgrounds", {campgrounds: allCampgrounds});
      }
    });
});

app.post("/campgrounds", function(req, res){
  var name = req.body.name; 
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is on!");
});