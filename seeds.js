var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
      name: "Cloud's Rest", 
      image: "https://farm7.staticflickr.com/6085/6037590541_19248d41f0.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum dapibus elementum. Quisque lacinia, ipsum sed sodales maximus, nisl purus congue augue, quis aliquam turpis est at libero. Vestibulum ut risus quis quam luctus venenatis. Ut tincidunt nibh sit amet hendrerit scelerisque. Proin in ornare eros. Suspendisse pellentesque lacinia metus, vel condimentum risus commodo vel. In commodo nulla a sodales convallis. Vestibulum tincidunt id massa accumsan semper. Sed luctus interdum dolor, vitae gravida lectus tincidunt efficitur. Sed fermentum, orci ac elementum scelerisque, nunc risus efficitur quam, ut sagittis ex lorem id ante. Sed auctor, enim vel ornare scelerisque, sem turpis mattis ligula, vel euismod turpis sapien id massa. Cras tempus vestibulum dignissim."
    },
    {
      name: "Desert Mesa", 
      image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum dapibus elementum. Quisque lacinia, ipsum sed sodales maximus, nisl purus congue augue, quis aliquam turpis est at libero. Vestibulum ut risus quis quam luctus venenatis. Ut tincidunt nibh sit amet hendrerit scelerisque. Proin in ornare eros. Suspendisse pellentesque lacinia metus, vel condimentum risus commodo vel. In commodo nulla a sodales convallis. Vestibulum tincidunt id massa accumsan semper. Sed luctus interdum dolor, vitae gravida lectus tincidunt efficitur. Sed fermentum, orci ac elementum scelerisque, nunc risus efficitur quam, ut sagittis ex lorem id ante. Sed auctor, enim vel ornare scelerisque, sem turpis mattis ligula, vel euismod turpis sapien id massa. Cras tempus vestibulum dignissim."
    },
    {
      name: "Canyon Floor", 
      image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus bibendum dapibus elementum. Quisque lacinia, ipsum sed sodales maximus, nisl purus congue augue, quis aliquam turpis est at libero. Vestibulum ut risus quis quam luctus venenatis. Ut tincidunt nibh sit amet hendrerit scelerisque. Proin in ornare eros. Suspendisse pellentesque lacinia metus, vel condimentum risus commodo vel. In commodo nulla a sodales convallis. Vestibulum tincidunt id massa accumsan semper. Sed luctus interdum dolor, vitae gravida lectus tincidunt efficitur. Sed fermentum, orci ac elementum scelerisque, nunc risus efficitur quam, ut sagittis ex lorem id ante. Sed auctor, enim vel ornare scelerisque, sem turpis mattis ligula, vel euismod turpis sapien id massa. Cras tempus vestibulum dignissim."
    }
];

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds!");
    // add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else {
          console.log("added a campground");
          // create a comment
          Comment.create(
            {
              text: "This place is but I wish they had internet",
              author: "Homer"
            }, function(err, comment){
              if(err){
                console.log(err);
              } else {
                  campground.comments.push(comment);
                  campground.save(); 
                  console.log("Created new comment");
              }
            });
        }
      });
    });
  });
}

module.exports = seedDB;