const express = require("express");
var bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const port = 8000;

/* Player info */
var position = 0;
var pieces = [];
var max_number = 0;
var timeout = 0;
var score = 0;

app.get("/start", (req, res) => {
  res.json({
    start: true,
  });
});

app.get("/status", (req, res) => {
  res.json({
    position: position,
    pieces: pieces,
    max_number: max_number,
    timeout: timeout,
    score: score,
  });
});

app.post("/reset", (req, res) => {
  position = req.body.position;
  pieces = req.body.pieces;
  max_number = req.body.max_number;
  timeout = req.body.timeout;
  score = req.body.score;
  res.json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`DOMINO PLAYER IN LISENT IN PORT ${port}`);
});
