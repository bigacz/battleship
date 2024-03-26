import BoardUi from '../components/BoardUi';
import Player from './Player';

class GameElement {
  constructor(name, isAi, parent, id) {
    this.player = new Player(name, isAi);
    this.boardUi = new BoardUi(parent, id);
  }

  receiveAttack(x, y) {
    this.player.receiveAttack(x, y);
    this.boardUi.hitSquare(x, y);
  }

  receiveRandomAttack() {
    const [x, y] = this.player.calculateAttack();

    this.boardUi.hitSquare(x, y);
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

  getName() {
    return this.player.name;
  }
}

export default GameElement;
