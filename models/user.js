const mongoose = require("mongoose");
const crypto = require("crypto");
const utils = require("../lib/utils");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank!"],
      index: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank!"],
      unique: true,
      index: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    bio: String,
    image: {
      name: String,
      desc: String,
      img: {
        data: Buffer,
        contentType: String,
      },
    },
    hash: String,
    salt: String,
  },
  { timestamps: true }
);

UserSchema.methods.isValidPassword = function (password) {
  const isValid = utils.validPassword(password, this.hash, this.salt);
  return isValid;
};
UserSchema.methods.setPassword = function (password) {
  let { salt, hash } = utils.genPassword(password);
  this.salt = salt; //crypto.randomBytes(16).toString('hex');
  this.hash = hash; // crypto.pbkdf2Sync(password,this.salt,10000,512,'sha512').toString('hex');
};

mongoose.model("User", UserSchema);
