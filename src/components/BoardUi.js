import PubSub from 'pubsub-js';
import translateCoords from '../scripts/translateCoords';

// isHit, isShip
class BoardUi {
  constructor(parent) {
    this.board = parent;
  }

  cleanBoard() {
    const squares = Array.from(this.board.children);

    squares.forEach((square) => {
      square.classList.remove('square-hit');
      square.classList.remove('square-ship');
    });
  }

  initializeBoard() {
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        const square = generateSquare(x, y);

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

// Helper functions

function generateSquare(x, y) {
  const square = document.createElement('div');

  square.setAttribute('data-x', x);
  square.setAttribute('data-y', y);

  square.addEventListener('click', (event) => {
    const target = event.currentTarget;

    const clickedX = target.getAttribute('data-x');
    const clickedY = target.getAttribute('data-y');
    const boardId = target.parentElement.id;

    const squareData = {
      x: clickedX,
      y: clickedY,
      boardId,
    };

    PubSub.publish('square-clicked', squareData);
  });

  return square;
}

export default BoardUi;
