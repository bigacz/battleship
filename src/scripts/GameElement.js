import BoardUi from '../components/BoardUi';
import Player from './Player';
import { generateRandomShips } from './boardHelpers';

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

  relocateShip(oldX, oldY, newX, newY) {
    const { isAxisX, length } = this.player.getShip(oldX, oldY);

    this.player.removeShip(oldX, oldY);

    const isLegal = this.player.isLegalToPlaceShip(newX, newY, isAxisX, length);

    if (isLegal) {
      this.boardUi.removeShip(oldX, oldY);

      this.player.placeShip(newX, newY, isAxisX, length);
      this.boardUi.placeShip(newX, newY, isAxisX, length);
    } else {
      this.player.placeShip(oldX, oldY, isAxisX, length);
    }
  }

  rotateShip(shipX, shipY) {
    const { isAxisX, length } = this.player.getShip(shipX, shipY);

    this.player.removeShip(shipX, shipY);

    const isLegal = this.player.isLegalToPlaceShip(
      shipX,
      shipY,
      !isAxisX,
      length
    );

    if (isLegal) {
      this.boardUi.removeShip(shipX, shipY);

      this.player.placeShip(shipX, shipY, !isAxisX, length);
      this.boardUi.placeShip(shipX, shipY, !isAxisX, length);
    } else {
      this.player.placeShip(shipX, shipY, isAxisX, length);
    }
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

  placeRandomShips() {
    const shipsParameters = generateRandomShips();

    shipsParameters.forEach((parameters) => {
      this.player.placeShip(...parameters);
      this.boardUi.placeShip(...parameters);
    });
  }
}

export default GameElement;
