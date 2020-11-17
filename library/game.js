const Player = require("./player");

class Game {
  constructor() {
    this.cards = [];
    this.playerOne = {};
    this.playerTwo = {};
    this.gameState = "playerOne";
    this.centerDeck = [];
  }

  // top of deck will be the highest index bottom is 0

  createDeck() {
    const suits = ["blue", "gold", "green", "red"];
    const values = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "jack",
      "queen",
      "king",
    ];
    let deck = [];
    suits.forEach((suit) => {
      values.forEach((value) => {
        let card = { suit, value };
        deck.push(card);
      });
    });
    let cards = this.shuffle(deck);
    this.cards = cards;
    console.log(this.cards);
  }

  shuffle(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let hold = cards[i];
      cards[i] = cards[j];
      cards[j] = hold;
    }
    return cards;
  }

  splitDeck(cards) {
    let deckOne = [];
    let deckTwo = [];

    cards.forEach((card, i) => {
      if (i % 2 === 0) {
        deckOne.push(card);
      }
      deckTwo.push(card);
    });
    return { deckOne, deckTwo };
  }

  createPlayers(deckOne, deckTwo) {
    const splitDecks = this.splitDeck(this.cards);
    const { deckOne, deckTwo } = splitDecks;
    const playerOne = new Player(1, deckOne);
    const playerTwo = new Player(2, deckTwo);
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  gameStart() {
    this.createDeck();
    this.createPlayers();
  }

  dealCard(player) {
    const cardPlayed = player.hand.pop();
    this.centerDeck.push(cardPlayed);
  }

  playerSlap(slapper, altPlayer) {
    const deckLength = this.centerDeck.length;
    const slapperHand = this[slapper].hand;
    const altHand = this[altPlayer].hand;
    if (
      this.centerDeck[deckLength - 1].value ===
      this.centerDeck[deckLength - 2].value
    ) {
      slapperHand.push(this.centerDeck);
      slapperHand = this.shuffle(slapperHand);
      this.centerDeck = [];
    } else if (
      this.centerDeck[deckLength - 1].value ===
      this.centerDeck[deckLength - 3].value
    ) {
      slapperHand.push(this.centerDeck);
      slapperHand = this.shuffle(slapperHand);
      this.centerDeck = [];
    } else if (this.centerDeck[deckLength - 1].value === "jack") {
      slapperHand.push(this.centerDeck);
      slapperHand = this.shuffle(slapperHand);
      this.centerDeck = [];
    } else {
      const addedCard = slapperHand.pop();
      altHand.unshift(addedCard);
    }
  }
}

module.exports = Game;
