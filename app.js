var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
})

app.get("/campgrounds", function(req, res){
  var campgrounds = [
      {name: "Salmon Creek", image: "https://www.rei.com/adventures/assets/adventures/images/trip/gallery/northamerica/fzc_04"},
      {name: "Granite Hill", image: "http://www.thingsyouneedforcamping.com/wp-content/uploads/2016/11/camping.jpg"},
      {name: "Mountain Goat's Rest", image: "https://www.visitnc.com/resimg.php/imgcrop/2/52908/image/800/448/KerrCamping.jpg"}
    ]
    
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server is on!");
});