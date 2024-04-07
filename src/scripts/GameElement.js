import BoardUi from '../components/BoardUi';
import Player from './Player';

class GameElement {
  constructor(name, isAi, parent, id) {
    this.player = new Player(name, isAi);
    this.boardUi = new BoardUi(parent, id);
  }

  receiveAttack(x, y) {
    this.boardUi.receiveAttack(x, y);

    this.player.receiveAttack(x, y);
  }

  calculateAttack() {
    return this.player.calculateAttack();
  }

  areAllSunk() {
    return this.player.areAllSunk();
  }

  cleanBoard() {
    // TODO: Add logic board cleaning
    this.boardUi.cleanBoard();
  }

  isAi() {
    return this.player.isAi;
  }

  isHit(x, y) {
    return this.player.isHit(x, y);
  }

  isShip(x, y) {
    return this.player.isShip(x, y);
  }

  placeShip(startX, startY, isAxisX, length) {
    this.player.placeShip(startX, startY, isAxisX, length);
    this.boardUi.placeShip(startX, startY, isAxisX, length);
  }

  removeShip(startX, startY) {
    // change order
    this.boardUi.removeShip(startX, startY);
    this.player.removeShip(startX, startY);
  }

  getName() {
    return this.player.name;
  }

  enableDragging() {
    this.boardUi.enableDragging();
  }

  disableDragging() {
    this.boardUi.disableDragging();
  }
}

export default GameElement;
