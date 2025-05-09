const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },

  ],
   owner:{
    type: Schema.Types.ObjectId,
    ref:"User",

   },

});
listingSchema.post("findOneAndDelete", async(listing)=> {
  if(listing) {
    await Review.deleteMany({ _id : {$in: listing.reviews}});
  } 
    
});
module.exports = mongoose.model("Listing", listingSchema);