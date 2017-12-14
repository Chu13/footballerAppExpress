require("dotenv").config();
require("../config/mongoose-setup");

const Admin = require("../models/admin-model");


const admin =[
   {
      placeName: "Miami Soccer Field",
      email: "miami@fields.com",
      encryptedPassword: "Chu.0610",
      phone: "(786)-393-9364",
      location: "500 Brickell Avenue, Miami, FL 33131"
   }
 ];

Admin.create(admin)
  .then((results) => {
    console.log(`${results.length} admin created`);
  })
  .catch((err) => {
    console.log("Save ERROR!");
    console.log(err);
  });
