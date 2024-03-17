import Ship from './Ship';
import {
  getAdjacentCoords,
  isShipOutOfBound,
  translateCoords,
} from './boardHelpers';

class Gameboard {
  constructor() {
    this.board = generateBoard();
  }

  placeShip(startX, startY, isAxisX, length) {
    const isLegal = this.isLegalToPlaceShip(startX, startY, isAxisX, length);
    if (!isLegal) {
      throw new Error('Ship out of bound');
    }

    const ship = new Ship(length);
    const coordinates = translateCoords(startX, startY, isAxisX, length);

    coordinates.forEach(([x, y]) => {
      this.board[x][y].ship = ship;
    });
  }

  receiveAttack(x, y) {
    const square = this.board[x][y];
    if (square.isHit === false) {
      square.isHit = true;
      if (square.ship) {
        square.ship.hit();
      }
    }
  }

  areAllSunk() {
    const flatBoard = this.board.flat();

    const allSunk = flatBoard.every((square) => {
      if (square.ship != null && !square.ship.isSunk()) {
        return false;
      }
      return true;
    });

    return allSunk;
  }

  calculateAttack() {
    const allSquares = this.board.flat();
    const nonHitSquares = allSquares.filter((square) => !square.isHit);

    const randomIndex = Math.floor(Math.random() * nonHitSquares.length);
    const { x, y } = nonHitSquares[randomIndex];

    return [x, y];
  }

  isLegalToPlaceShip(startX, startY, isAxisX, length) {
    const isOutBound = isShipOutOfBound(startX, startY, isAxisX, length);
    if (isOutBound) {
      return false;
    }

    const adjacentCoords = getAdjacentCoords(startX, startY);
    const isShipAdjacent = adjacentCoords.some(([x, y]) => {
      const square = this.board[x][y];

      return square.ship != null;
    });

    if (isShipAdjacent) {
      return false;
    }

    return true;
  }
}

// Helper functions

function generateBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const xAxis = [];
    for (let j = 0; j < 10; j += 1) {
      const square = {
        isHit: false,
        ship: null,
        x: j,
        y: i,
      };

      xAxis.push(square);
    }

    board.push(xAxis);
  }
  return board;
}

export default Gameboard;
