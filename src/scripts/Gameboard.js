import Ship from './Ship';
import {
  getAdjacentCoords,
  getShipAdjacentCoords,
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

    const ship = new Ship(startX, startY, isAxisX, length);
    const coordinates = translateCoords(startX, startY, isAxisX, length);

    coordinates.forEach(([x, y]) => {
      this.board[x][y].ship = ship;
    });
  }

  removeShip(startX, startY) {
    const shipCoords = this.getShipCoords(startX, startY);

    shipCoords.forEach(([x, y]) => {
      this.board[x][y].ship = null;
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
    const nonHitSquares = allSquares.filter((square) => square.isHit === false);

    const randomIndex = Math.floor(Math.random() * nonHitSquares.length);

    const { x, y } = nonHitSquares[randomIndex];

    return [x, y];
  }

  isLegalToPlaceShip(startX, startY, isAxisX, length) {
    const isShip = this.board[startX][startY].ship == null;
    if (!isShip) {
      return false;
    }

    const isOutBound = isShipOutOfBound(startX, startY, isAxisX, length);
    if (isOutBound) {
      return false;
    }

    const adjacentCoords = getShipAdjacentCoords(
      startX,
      startY,
      isAxisX,
      length
    );

    const isShipAdjacent = adjacentCoords.some(([x, y]) => {
      const square = this.board[x][y];

      return square.ship != null;
    });

    if (isShipAdjacent) {
      return false;
    }

    return true;
  }

  getShipCoords(startX, startY) {
    if (!this.isShip(startX, startY)) {
      return [];
    }

    const knownCoords = getAdjacentCoords(startX, startY);
    const usedCoords = [...knownCoords, [startX, startY]];
    const shipCoords = [[startX, startY]];

    let i = 0;
    while (knownCoords.length > 0) {
      const [x, y] = knownCoords.pop();

      if (this.isShip(x, y) === true) {
        shipCoords.push([x, y]);

        const adjacentCoords = getAdjacentCoords(x, y);
        const newCoords = adjacentCoords.filter(
          (coords) => !usedCoords.some((used) => compareArrays(coords, used))
        );

        usedCoords.push(...newCoords);
        knownCoords.push(...newCoords);
      }
    }

    return shipCoords;
  }

  getShipStart(x, y) {
    const { ship } = this.board[x][y];

    const coords = {
      startX: ship.startX,
      startY: ship.startY,
    };

    return coords;
  }

  isHit(x, y) {
    return this.board[x][y].isHit;
  }

  isShip(x, y) {
    return this.board[x][y].ship != null;
  }

  isSunk(x, y) {
    const { ship } = this.board[x][y];

    if (ship != null) {
      return ship.isSunk();
    }
  }

  getShip(x, y) {
    return this.board[x][y].ship;
  }

  getShipAdjacentCoords(x, y) {
    const { ship } = this.board[x][y];
    if (ship == null) {
      return [];
    }

    const { startX, startY, isAxisX, length } = ship;

    return getShipAdjacentCoords(startX, startY, isAxisX, length);
  }

  cleanBoard() {
    this.board = generateBoard();
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
        x: i,
        y: j,
      };

      xAxis.push(square);
    }

    board.push(xAxis);
  }
  return board;
}

export default Gameboard;

function compareArrays(array0, array1) {
  return JSON.stringify(array0) === JSON.stringify(array1);
}
