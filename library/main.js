const centerDeck = document.querySelector(".center-deck");
const gameText = document.querySelector(".game-text");

document.addEventListener("keydown", (event) =>
  keydownHandler(event, "p1", "p2")
);
document.addEventListener("keydown", (event) =>
  keydownHandler(event, "p2", "p1")
);

const game = new Game();

game.gameStart();

function keydownHandler(e, p, alt) {
  e.preventDefault();

  const playerInfo = {
    player: { p1: "playerOne", p2: "playerTwo" },
    deal: { p1: 81, p2: 80 },
    slap: { p1: 70, p2: 74 },
  };

  if (e.keyCode === playerInfo.deal[p]) {
    game.dealCard(playerInfo.player[p], playerInfo.player[alt]);
    addToCenter(p, alt);
    changeCardAnimation(playerInfo.player[p], playerInfo.player[alt]);
  } else if (e.keyCode === playerInfo.slap[p]) {
    game.playerSlap(playerInfo.player[p], playerInfo.player[alt]);
    addToCenter(p, alt);
    gameText.innerText = game.gameMessage;
  }
}

function changeCardAnimation(p, alt) {
  const currentPlayerCard = document.querySelector(`#${p}`);
  const altPlayerCard = document.querySelector(`#${alt}`);
  currentPlayerCard.classList.remove("turn-animation");
  altPlayerCard.classList.add("turn-animation");
}

function addToCenter(p, alt) {
  const deckArray = game.centerDeck;
  if (deckArray.length) {
    centerDeck.src = `./assets/${deckArray[deckArray.length - 1].suit}-${
      deckArray[deckArray.length - 1].value
    }.png`;
    centerDeck.classList.add(`${p}-card`);
    centerDeck.classList.remove(`${alt}-card`);
  } else {
    centerDeck.src = "./assets/back.png";
  }
}
