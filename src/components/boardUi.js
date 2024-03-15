import translateCoords from '../scripts/translateCoords';

// isHit, isShip
class BoardUi {
  constructor(parent) {
    this.board = parent;
  }

  initializeBoard() {
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        const square = document.createElement('div');
        square.setAttribute('data-x', x);
        square.setAttribute('data-y', y);

        this.board.append(square);
      }
    }
  }

  hitSquare(x, y) {
    const square = this.getSquare(x, y);

    square.classList.add('square-hit');
  }

  placeShip(startX, startY, isAxisX, length) {
    const coordinates = translateCoords(startX, startY, isAxisX, length);

    coordinates.forEach(([x, y]) => {
      const square = this.getSquare(x, y);

      square.classList.add('square-ship');
    });
  }

  getSquare(x, y) {
    const square = this.board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    return square;
  }
}

const boardUi = {};

export default boardUi;
