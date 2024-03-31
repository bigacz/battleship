import PubSub from 'pubsub-js';
import { translateCoords } from '../scripts/boardHelpers';

class BoardUi {
  constructor(parent, id) {
    this.board = parent;
    this.id = id;

    this.initializeBoard();
  }

  cleanBoard() {
    const squares = Array.from(this.board.children);

    squares.forEach((square) => {
      square.classList.remove('square-hit');
      square.classList.remove('square-ship');
    });
  }

  initializeBoard() {
    this.board.setAttribute('data-board-id', this.id);

    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 10; x += 1) {
        const square = generateSquare(x, y);

        this.board.append(square);
      }
    }
  }

  hitSquare(x, y) {
    const square = this.getSquare(x, y);

    square.classList.add('square-hit');
  }

  hitShip(startX, startY, relative) {
    const square = this.getSquare(startX, startY);
    const ship = square.children[0].children;

    ship[relative].classList.add('ship-part-hit');
  }

  placeShip(startX, startY, isAxisX, length) {
    const ship = generateShip(length, isAxisX);
    const startSquare = this.getSquare(startX, startY);

    startSquare.append(ship);
  }

  getSquare(x, y) {
    const square = this.board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    return square;
  }
}

// Helper functions

function generateSquare(x, y) {
  const square = document.createElement('div');

  square.classList.add('square');

  square.setAttribute('data-x', x);
  square.setAttribute('data-y', y);

  square.addEventListener('click', (event) => {
    const { currentTarget, target } = event;

    const clickedX = Number(currentTarget.getAttribute('data-x'));
    const clickedY = Number(currentTarget.getAttribute('data-y'));

    const relativeX = target.getAttribute('data-relative-x');
    const relativeY = target.getAttribute('data-relative-y');

    let actualX = Number(clickedX);
    let actualY = Number(clickedY);
    if (relativeX) {
      actualX += Number(relativeX);
    }

    if (relativeY) {
      actualY += Number(relativeY);
    }

    const boardId = Number(
      currentTarget.parentElement.getAttribute('data-board-id')
    );

    const squareData = {
      x: actualX,
      y: actualY,

      boardId,
    };

    PubSub.publish('square-clicked', squareData);
  });

  return square;
}

function generateShip(length, isAxisX) {
  const parent = document.createElement('div');
  parent.classList.add('ship');

  if (isAxisX) {
    parent.classList.add('ship-horizontal');
  } else {
    parent.classList.add('ship-vertical');
  }

  for (let i = 0; i < length; i += 1) {
    const shipPart = document.createElement('div');
    shipPart.classList.add('ship-part');

    parent.appendChild(shipPart);

    if (isAxisX) {
      shipPart.setAttribute('data-relative-x', i);
    } else {
      shipPart.setAttribute('data-relative-y', i);
    }
  }

  return parent;
}

export default BoardUi;
