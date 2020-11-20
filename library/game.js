class Game {
  constructor() {
    this.cards = [];
    this.playerOne = {};
    this.playerTwo = {};
    this.gameState = "playerOne";
    this.centerDeck = [];
    this.gameMessage = "";
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

  createPlayers() {
    const splitDecks = this.splitDeck(this.cards);
    const { deckOne, deckTwo } = splitDecks;
    const playerOne = new Player(1, deckOne, "Player One");
    const playerTwo = new Player(2, deckTwo, "Player Two");
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
  }

  gameStart() {
    this.createDeck();
    this.createPlayers();
  }

  dealCard(player, alt) {
    if (this.gameState === player) {
      const cardPlayed = this[player].hand.pop();
      this.centerDeck.push(cardPlayed);
      this.gameState = alt;
    }
  }

  playerSlap(slapper, altPlayer) {
    const deckLength = this.centerDeck.length;
    const slapperHand = this[slapper].hand;
    const altHand = this[altPlayer].hand;
    console.log(slapperHand);
    if (
      deckLength > 1 &&
      this.centerDeck[deckLength - 1].value ===
        this.centerDeck[deckLength - 2].value
    ) {
      slapperHand.push(this.centerDeck);
      this[slapper].hand = this.shuffle(slapperHand);
      this.gameMessage = `${this[slapper].name} slapped on a double. They got ${
        deckLength - 1
      } cards!`;
      this.centerDeck = [];
    } else if (
      deckLength > 2 &&
      this.centerDeck[deckLength - 1].value ===
        this.centerDeck[deckLength - 3].value
    ) {
      slapperHand.push(this.centerDeck);
      this[slapper].hand = this.shuffle(slapperHand);
      this.gameMessage = `${
        this[slapper].name
      } slapped on a sandwhich. They got ${deckLength - 1} cards!`;
      this.centerDeck = [];
    } else if (this.centerDeck[deckLength - 1].value === "jack") {
      slapperHand.push(this.centerDeck);
      this[slapper].hand = this.shuffle(slapperHand);
      this.gameMessage = `${this[slapper].name} slapped on a Jack. They got ${
        deckLength - 1
      } cards!`;
      this.centerDeck = [];
    } else {
      const addedCard = slapperHand.pop();
      altHand.unshift(addedCard);
      this.gameMessage = `${this[slapper].name} had a bad slap. ${this[altPlayer].name} stole a card from ${this[slapper].name}`;
    }
  }
}
