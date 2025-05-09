class Player {
  constructor(name) {
    this.name = name;
    this.pits = [4, 4, 4, 4, 4, 4];
    this.store = 0;
  }
}

class Ayoayo {
  constructor() {
    this.players = [];
    this.gameEnded = false;
  }

  createPlayer(name) {
    const player = new Player(name);
    this.players.push(player);
    return player;
  }

  printBoard() {
    const player1 = this.players[0];
    const player2 = this.players[1];
    console.log("player1:");
    console.log(`store: ${player1.store}`);
    console.log(JSON.stringify(player1.pits));
    console.log("player2:");
    console.log(`store: ${player2.store}`);
    console.log(JSON.stringify(player2.pits));
  }

  returnWinner() {
    if (!this.gameEnded) {
      return "Game has not ended";
    }
    const p1 = this.players[0];
    const p2 = this.players[1];
    if (p1.store > p2.store) {
      return `Winner is player 1: ${p1.name}`;
    } else if (p2.store > p1.store) {
      return `Winner is player 2: ${p2.name}`;
    } else {
      return "It's a tie";
    }
  }

  playGame(playerIndex, pitIndex) {
    if (this.gameEnded) {
      return "Game is ended";
    }
    if (pitIndex < 1 || pitIndex > 6) {
      return "Invalid number for pit index";
    }
    const currentPlayer = this.players[playerIndex - 1];
    const opponent = this.players[playerIndex % 2];
    const pitIdx = pitIndex - 1;

    if (currentPlayer.pits[pitIdx] === 0) {
      return "Invalid move: pit is empty";
    }

    let seeds = currentPlayer.pits[pitIdx];
    currentPlayer.pits[pitIdx] = 0;

    const generator = this.sowingOrder(pitIdx, currentPlayer);
    let lastPos;

    for (let i = 0; i < seeds; i++) {
      const pos = generator.next().value;
      if (pos.type === "pit") {
        pos.player.pits[pos.index]++;
      } else if (pos.type === "store") {
        pos.player.store++;
      }
      lastPos = pos;
    }

    if (lastPos.type === "store" && lastPos.player === currentPlayer) {
      console.log(`player ${playerIndex} take another turn`);
    }

    if (
      lastPos.type === "pit" &&
      lastPos.player === currentPlayer &&
      currentPlayer.pits[lastPos.index] === 1
    ) {
      const captured = currentPlayer.pits[lastPos.index];
      currentPlayer.pits[lastPos.index] = 0;
      currentPlayer.store += captured;

      const oppPitIdx = 5 - lastPos.index;
      const oppSeeds = opponent.pits[oppPitIdx];
      opponent.pits[oppPitIdx] = 0;
      currentPlayer.store += oppSeeds;
    }

    const p1Empty = this.players[0].pits.every((s) => s === 0);
    const p2Empty = this.players[1].pits.every((s) => s === 0);
    if (p1Empty || p2Empty) {
      const remaining = p1Empty ? this.players[1] : this.players[0];
      const seedsToAdd = remaining.pits.reduce((a, b) => a + b, 0);
      remaining.store += seedsToAdd;
      remaining.pits.fill(0);
      this.gameEnded = true;
    }

    const result = [
      ...this.players[0].pits,
      this.players[0].store,
      ...this.players[1].pits,
      this.players[1].store,
    ];
    return JSON.stringify(result);
  }

  *sowingOrder(startIdx, currentPlayer) {
    const opponent = this.players.find((p) => p !== currentPlayer);
    let i = startIdx + 1;
    while (true) {
      for (; i < currentPlayer.pits.length; i++) {
        yield { type: "pit", player: currentPlayer, index: i };
      }
      yield { type: "store", player: currentPlayer };
      for (i = opponent.pits.length - 1; i >= 0; i--) {
        yield { type: "pit", player: opponent, index: i };
      }
      for (i = 0; i < currentPlayer.pits.length; i++) {
        yield { type: "pit", player: currentPlayer, index: i };
      }
      yield { type: "store", player: currentPlayer };
      i = 0;
    }
  }
}
