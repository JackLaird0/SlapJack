// q key code 81 p1 deal
// f key code 70 p1 slap
// p key code 80 p2 deal
// j key code 74 p2 slap

var Game = require("./game");

document.addEventListener("keydown", (event) => keydownHandler(event));

gameStart();

function keydownHandler(e) {
  e.preventDefault();
}

function gameStart() {
  Game.createDeck();
}
