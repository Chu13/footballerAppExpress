const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please tell us your name']
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    encryptedPassword: {
      type: String,
      required: [true, 'Encrypted password is empty']
    },
     phone: {
      type: String,
      required: [true, 'phone is required']
    },
    nationality: {
      type: String,
    },
    position:{
      type: String,
    }
  },
  {
    timestamps: true
  }
);


const Player = mongoose.model("Player", playerSchema);


module.exports = Player;
