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
    captain: req.body.captainName,
    date: req.body.date,
    length: req.body.length,
    time: req.body.time,
    field: req.body.field,
  });

  theMatch.save()
  .then(() => {
    res.status(200).json(theMatch);
  })
  .catch((err) => {
    console.log(err);
    // 400 status code if validation error
    if(err.errors) {
      res.status(400).json(err.errors);
    }
    else{
      res.status(500).json({ error: "Match save database error" });
    }
  });
}); //POST /phones



router.get("/matches/:id", (req, res, next) => {
  // if(req.user === undefined) {
    // res.status(400).json({ error: "Not logged in" });
    // return;
  // }

  Match.findById(req.params.id)
  .then((matchFromDb) => {
    res.status(200).json(matchFromDb);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: "Match details database error" });
  });
});// GET /matches/:id



router.delete("/matches/:id", (req, res, next) => {
  // if(req.user === undefined) {
  //   res.status(400).json({ error: "Not logged in" });
  //   return;
  // }

  Match.findByIdAndRemove(req.params.id)
  .then((matchFromDb) => {
    if(matchFromDb === null) {
      res.status(404).json({ error: "Match not found"});
    }
    else{
      res.status(200).json(matchFromDb);
    }
  })
  .catch((err) => {
    console.log("Delete /match/:id ERROR!");
    console.log(err);

    // respond with an ERROR MESSAGE in the JSON format
    res.status(500).json({ error: "Match delete database error"});
  });
});



router.put("/matches/:id", (req, res, next) => {
  Match.findById(req.params.id)
  .then((matchFromDb) => {
    matchFromDb.set({
      brand: req.body.brand,
      name: req.body.name,
      image: req.body.image,
      specs: req.body.specs
    });
    return  matchFromDb.save();
  })
  .then((matchFromDb) => {
    // respond with the QUERY RESULTS in the JSON format
    res.status(200).json(phoneFromDb);
  })
  .catch((err) => {
    console.log("PUT /match/:id ERROR!");
    console.log(err);

    if(err.errors) {
      // respond with an VALIDATION ERRORS in the JSON format
      res.status(400).json(err.errors);
    }
    else{
      // respnd with an ERROR MESSAGE in the JSON format
    res.status(500).json({ error: "Match update database error"});
    }
  });
}); //PUT /phones/:id



module.exports = router;
