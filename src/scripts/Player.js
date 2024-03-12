import Gameboard from './Gameboard';

class Player {
  constructor(name, isAi) {
    this.name = name;
    this.isAi = isAi;
    this.board = new Gameboard();
  }

  placeShip(startX, startY, isAxisX, length) {
    this.board.placeShip(startX, startY, isAxisX, length);
  }

  receiveAttack(x, y) {
    this.board.receiveAttack(x, y);
  }

  calculateMove() {
    return this.board.calculateAttack();
  }

  areAllSunk() {
    return this.board.areAllSunk();
  }
}

export default Player;
