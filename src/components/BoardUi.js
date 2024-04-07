import PubSub from 'pubsub-js';

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

  receiveAttack(x, y) {
    const attacked = this.board.querySelectorAll(
      `[data-x='${x}'][data-y='${y}']`
    );

    attacked.forEach((element) => {
      element.classList.add('hit');
    });
  }

  placeShip(startX, startY, isAxisX, length) {
    const ship = generateShip(startX, startY, isAxisX, length);
    const startSquare = this.getSquare(startX, startY);

    startSquare.append(ship);
  }

  removeShip(startX, startY) {
    const square = this.board.querySelector(
      `.square[data-x='${startX}'][data-y='${startY}']`
    );

    square.textContent = '';
  }

  getSquare(x, y) {
    const square = this.board.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    return square;
  }

  enableDragging() {
    const ships = this.board.querySelectorAll('.ship');

    ships.forEach((ship) => {
      ship.setAttribute('draggable', 'true');
    });
  }

  disableDragging() {
    const ships = this.board.querySelectorAll('.ship');

    ships.forEach((ship) => {
      ship.setAttribute('draggable', 'false');
    });
  }
}

// Helper functions

function generateSquare(x, y) {
  const square = document.createElement('div');

  square.classList.add('square');

  square.setAttribute('data-x', x);
  square.setAttribute('data-y', y);

  square.addEventListener('click', (event) => {
    console.log('elo');
    const { currentTarget, target } = event;

    const clickedX = Number(target.getAttribute('data-x'));
    const clickedY = Number(target.getAttribute('data-y'));

    const boardId = Number(
      currentTarget.parentElement.getAttribute('data-board-id')
    );

    const squareData = {
      x: clickedX,
      y: clickedY,

      boardId,
    };

    PubSub.publish('square-clicked', squareData);
  });

  square.addEventListener('dragenter', (event) => {
    event.preventDefault();
  });

  square.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  square.addEventListener('drop', (event) => {
    const { target, currentTarget } = event;

    const squareBoardId = Number(
      currentTarget.parentElement.getAttribute('data-board-id')
    );

    const shipBoardId = Number(
      dragged.parentElement.parentElement.getAttribute('data-board-id')
    );

    if (squareBoardId !== shipBoardId) {
      return;
    }

    const shipHead = dragged.children[0];

    const shipX = Number(shipHead.getAttribute('data-x'));
    const shipY = Number(shipHead.getAttribute('data-y'));

    const squareX = Number(target.getAttribute('data-x'));
    const squareY = Number(target.getAttribute('data-y'));

    const coordinatesData = {
      oldX: shipX,
      oldY: shipY,

      newX: squareX,
      newY: squareY,

      boardId: squareBoardId,
    };

    PubSub.publish('ship-dropped', coordinatesData);
  });

  return square;
}

function generateShip(startX, startY, isAxisX, length) {
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
      shipPart.setAttribute('data-x', startX + i);
      shipPart.setAttribute('data-y', startY);
    } else {
      shipPart.setAttribute('data-x', startX);
      shipPart.setAttribute('data-y', startY + i);
    }
  }

  parent.addEventListener('dragstart', (event) => {
    dragged = event.target;
  });

  return parent;
}

// might want to change implementation
let dragged;

export default BoardUi;
