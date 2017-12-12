const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    captain: {
      type: String,
    },
    date: {
      type: String,
    },
    legth: {
      type: Number
    },
    time: {
      type: String
    },
    field:{
      type: String
    },
    players: [
      { type: String }
    ]
  },
  {
    timestamps: true
  }
);


const Match = mongoose.model("Match", matchSchema);


module.exports = Match;
