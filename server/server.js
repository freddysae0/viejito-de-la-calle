//const express = require("express");
//var bodyParser = require("body-parser");
//var { decideAPiece } = require("../doble-9/decide")
import express from 'express';
import bodyParser from 'body-parser';
import { decideAPiece } from '../doble-9/decide.js'
const app = express();
app.use(bodyParser.json());
var port = 8000;
var args = process.argv.slice(2);

if (args.length > 0) {
  port = parseInt(args[0]);
}

/* Player info */
var position = 0;
var pieces = [];
var score = 0;
var myPartnerPlayed = false;
var lastValOfMyPartner = 0;
var myPreviousPlayed = false;
var lastValOfMyPrevious = 0;

/* Game info */
var timeout = 0;
var max_number = 0;
var myMoves = [];
var myPartnerMoves = [];
var myPartnerNoLleva = new Array(10).fill(false);
var myNextplayerMoves = [];
var myNextplayerNoLleva = new Array(10).fill(false);
var myPreviousplayerMoves = [];
var myPreviousplayerNoLleva = new Array(10).fill(false);
function log() {
  console.log(
    "myMoves: ", myMoves, '\n',
    "myPartnerMoves: ", myPartnerMoves, '\n',
    "myPartnerNoLleva: ", myPartnerNoLleva, '\n',
    "myNextplayerMoves: ", myNextplayerMoves, '\n',
    "myNextplayerNoLleva: ", myNextplayerNoLleva, '\n',
    "myPreviousplayerMoves: ", myPreviousplayerMoves, '\n',
    "myPreviousplayerNoLleva: ", myPreviousplayerNoLleva, '\n',
  );
}
var event = "";
var args = [];
var heads = [-1, -1];

function clear() {
  /* Player info */
  position = 0;
  pieces = [];
  score = 0;
  myPartnerPlayed = false;
  lastValOfMyPartner = 0;

  myPreviousPlayed = false;
  lastValOfMyPrevious = 0;
  /* Game info */
  timeout = 0;
  max_number = 0;
  myMoves = [];
  myPartnerMoves = [];
  myPartnerNoLleva = new Array(10).fill(false);
  myNextplayerMoves = [];
  myNextplayerNoLleva = new Array(10).fill(false);
  myPreviousplayerMoves = [];
  myPreviousplayerNoLleva = new Array(10).fill(false);

  event = "";
  args = [];
  heads = [-1, -1];
}

function myNext() {
  return (position + 1) % 4;
}
function myPrevious() {
  if (position == 0) return 3;
  return position - 1;
}
function myPartner() {
  return (position + 2) % 4;
}

function match(p, heads) {
  if (p[0] == heads[0] || p[1] == heads[0]) {
    return 0;
  } else if (p[0] == heads[1] || p[1] == heads[1]) {
    return 1;
  }
  return -1;
}
function firstPlay() {

  let fichaAJugar = [];


  //Escoger la ficha
  pieces.sort();

  fichaAJugar = pieces.pop();
  heads = fichaAJugar;
  return { piece: fichaAJugar, head: 0 };

}

/*
function play() {
  let sePuede = false;
  let fichaAJugar = [];

  //Escoger la ficha
  pieces.forEach((p, i) => {
    if (match(p, heads) != -1) {
      sePuede = true;
      //ficha que se jugará
      fichaAJugar[0] = p[0];
      fichaAJugar[1] = p[1];

      return;
    }
  });

  if (sePuede) {
    fichaAJugar.sort();
    myMoves.push(fichaAJugar);
    pieces = pieces.filter((piece) => {
      piece.sort();
      return piece[0] != fichaAJugar[0] || piece[1] != fichaAJugar[1];
    });
    return { piece: fichaAJugar, head: match(fichaAJugar, heads) };
  } else {
    return { piece: null, head: null };
  }
}
*/

function remove(ficha) {
  ficha.sort();
  pieces = pieces.filter((piece) => {
    piece.sort();
    return piece[0] != ficha[0] || piece[1] != ficha[1];
  });

}
function move(player, ficha, extremo) {

  if (player == myNext()) {
    myNextplayerMoves.push(ficha);
  }
  if (player == myPrevious()) {
    myPreviousplayerMoves.push(ficha);
    myPreviousPlayed = true;
    if (extremo == 0) {
      if (ficha[0] != heads[0]) {
        lastValOfMyPrevious = 0;

      }
      if (ficha[1] != heads[0]) {
        lastValOfMyPrevious = 0;

      }
    } else {

      if (ficha[0] != heads[1]) {
        lastValOfMyPrevious = 1;

      }
      if (ficha[1] != heads[1]) {
        lastValOfMyPrevious = 1;

      }

    }
  }
  if (player == myPartner()) {
    myPartnerMoves.push(ficha);
    myPartnerPlayed = true;
    if (extremo == 0) {
      if (ficha[0] != heads[0]) {
        lastValOfMyPartner = 0;

      }
      if (ficha[1] != heads[0]) {
        lastValOfMyPartner = 0;

      }
    } else {

      if (ficha[0] != heads[1]) {
        lastValOfMyPartner = 1;

      }
      if (ficha[1] != heads[1]) {
        lastValOfMyPartner = 1;

      }

    }
  }

  if (heads[0] == -1) {
    heads = ficha;
  } else if (extremo == 0) {
    if (ficha[0] == heads[0]) {
      heads[0] = ficha[1];
    } else if (ficha[1] == heads[0]) {
      heads[0] = ficha[0];
    }
  } else if (extremo == 1) {
    if (ficha[0] == heads[1]) {
      heads[1] = ficha[1];
    } else if (ficha[1] == heads[1]) {
      heads[1] = ficha[0];
    }
  }
  return;
}


function pass(player) {
  if (player == myNext()) {
    myNextplayerNoLleva[heads[0]] = true;
    myNextplayerNoLleva[heads[1]] = true;
  }
  if (player == myPartner()) {
    myPartnerNoLleva[heads[0]] = true;
    myPartnerNoLleva[heads[1]] = true;
    myPartnerPlayed = false;
  }
  if (player == myPrevious()) {
    myPreviousplayerNoLleva[heads[0]] = true;
    myPreviousplayerNoLleva[heads[1]] = true;
    myPreviousPlayed = false;

  }

}
/* 
function move(player, ficha, extremo) {
  if (player == myNext()) {
    myNextplayerMoves.push(ficha);
  }
  if (player == myPrevious()) {
    myPreviousplayerMoves.push(ficha);
  }
  if (player == myPartner()) {
    myPartnerMoves.push(ficha);
  }
} */

app.get("/start", (req, res) => {
  console.log("start");
  //log();
  res.json({
    start: true,
  });
});

app.get("/status", (req, res) => {
  console.log("status");

  res.json({
    myMoves,
    myPartnerMoves,
    myPartnerNoLleva,
    myNextplayerMoves,
    myNextplayerNoLleva,
    myPreviousplayerMoves,
    position: position,
    pieces: pieces,
    max_number: max_number,
    timeout: timeout,
    score: score,
    heads,
  });
});

app.post("/step", (req, res) => {
  console.log("step");

  var pl = {};
  heads = req.body;
  pl = decideAPiece(myPreviousPlayed, lastValOfMyPrevious, myPartnerPlayed, lastValOfMyPartner, pieces, heads, myMoves, myPartnerMoves, myPartnerNoLleva, myNextplayerMoves, myNextplayerNoLleva, myPreviousplayerMoves, myPreviousplayerNoLleva);

  if (pl.piece != null) remove(pl.piece);

  console.log("play", pl, "endplay");
  //log();
  res.json(pl);

});

app.post("/log", (req, res) => {
  console.log("log");
  event = req.body[0];

  console.log(event);
  args = req.body;

  args = args.filter((arg) => {

    return typeof arg != "string";
  });
  console.log(args);
  if (event == "MOVE") move(args[0], args[1], args[2]);
  if (event == "PASS") pass(args[0]);

  console.log(myPartnerPlayed, "  ", lastValOfMyPartner);
  console.log("HEADS!!\n", heads, "\nHEADS!!\n");
  //log();
  res.json({ status: "ok" });
});

app.post("/reset", (req, res) => {
  console.log("HEADS!!\n", heads, "\nHEADS!!\n");
  console.log("reset");
  console.log(req.body);
  clear();
  if (req.body.position) position = req.body.position;
  if (req.body.pieces) pieces = req.body.pieces;
  if (req.body.max_number) max_number = req.body.max_number;
  if (req.body.timeout) timeout = req.body.timeout;
  if (req.body.score) score = req.body.score;
  res.json({
    status: "ok",
  });
  //log();
});
app.listen(port, () => {
  console.log(`Un viejito experto en domino callejero esta disponible para jugar en el puerto ${port}`);
});



