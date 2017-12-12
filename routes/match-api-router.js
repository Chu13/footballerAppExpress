const express = require("express");
const Match = require("../models/match-model");

const router = express.Router();

router.get("/matches",(req, res, next) => {
  Match
  .find()
  .limit(10)
  .exec()
  .then((matchResults) =>{
    // Respond with the query results in the JSON format
    res.status(200).json(matchResults);
  })
  .catch((err) => {
    console.log("GET /matches ERROR");
    console.log(err);

    // respond with an ERROR MESSAGE in the JSON format
    res.status().json({ error: "Match list database error" });
  });
});// GET /phones

router.post("/matches", (req, res, next) => {
  const theMatch = new Match({
    fieldName: req.body.fieldName,
    date: req.body.date,
    players: req.body.players
  });

  thePhone.save()
  .then(() => {
    res.status(200).json(thePhone);
  })
  .catch((err) => {
    console.log(err);
    // 400 status code if validation error
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else{
      res.status(500).json({ error: "Phone save database error" });
    }
  });
}); //POST /phones

module.exports = router;
