require("dotenv").config();
require("../config/mongoose-setup");

const Match = require("../models/match-model");


const matchList = [
   {
     fieldName: "Brickell Rooftop",
     date: "December 19",
     players: []
   }
];

Match.create(matchList)
  .then(() => {
    console.log(`${results.length} match created`);
  })
  .catch((err) => {
    console.log("Save ERROR!");
    console.log(err);
  });
