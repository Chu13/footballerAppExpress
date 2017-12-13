const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    placeName: {
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
    location: {
      type: String,
    },
    fields: [
      {
        type: String,
      }
    ],
    admin: true
  },
  {
    timestamps: true
  }
);


const Admin = mongoose.model("Admin", adminSchema);


module.exports = Admin;
