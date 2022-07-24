const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  desc: String,
  creator_id:String,
  img: {
    data: Buffer,
    contentType: String,
  },
})

mongoose.model('Img', imageSchema);