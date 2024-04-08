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

  removeShip(startX, startY) {
    this.board.removeShip(startX, startY);
  }

  receiveAttack(x, y) {
    this.board.receiveAttack(x, y);
  }

  calculateAttack() {
    return this.board.calculateAttack();
  }

  areAllSunk() {
    return this.board.areAllSunk();
  }

  isHit(x, y) {
    return this.board.isHit(x, y);
  }

  isShip(x, y) {
    return this.board.isShip(x, y);
  }

  getShipStart(x, y) {
    return this.board.getShipStart(x, y);
  }

  isLegalToPlaceShip(x, y, isAxisX, length) {
    return this.board.isLegalToPlaceShip(x, y, isAxisX, length);
  }

  getShip(x, y) {
    return this.board.getShip(x, y);
  }
}

export default Player;
