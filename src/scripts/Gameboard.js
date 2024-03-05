import Ship from './Ship';

class Gameboard {
  constructor() {
    this.board = generateBoard();
  }

  placeShip(startX, startY, isAxisX, length) {
    if (isOutOfBound(startX, startY, isAxisX, length)) {
      throw new Error('Ship out of bound');
    }

    const ship = new Ship(length);

    if (isAxisX === true) {
      for (let x = startX; x - startX < length; x += 1) {
        this.board[x][startY].ship = ship;
      }
    } else if (isAxisX === false) {
      for (let y = startY; y - startY < length; y += 1) {
        this.board[startX][y].ship = ship;
      }
    }
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
      };

      xAxis.push(square);
    }

    board.push(xAxis);
  }

  return board;
}

function isOutOfBound(startX, startY, isAxisX, length) {
  let endCoordinate = isAxisX === true ? startX + length : startY + length;

  return endCoordinate > 9;
}

export default Gameboard;
