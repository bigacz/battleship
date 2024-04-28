import PubSub from 'pubsub-js';

class BoardUi {
  isDraggingEnabled = false;

  shipsContainer = [];

  constructor(parent, id) {
    this.board = parent;
    this.id = id;

    this.initializeBoard();
  }

  cleanBoard() {
    const squares = Array.from(this.board.children);
    this.shipsContainer = [];

    squares.forEach((square) => {
      square.replaceChildren();
      square.classList.remove('square-hit');
      square.classList.remove('square-ship-hit');
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

    const lettersParent = document.getElementById(`board-letters${this.id}`);
    const numbersParent = document.getElementById(`board-numbers${this.id}`);

    appendNumbers(numbersParent);
    appendLetters(lettersParent);
  }

  receiveAttack(x, y) {
    const shipPart = this.getShipPart(x, y);
    const isShip = shipPart != null;

    const square = this.getSquare(x, y);
    if (square != null) {
      if (isShip) {
        square.classList.add('square-ship-hit');
      } else {
        square.classList.add('square-hit');
      }
    }

    if (shipPart) {
      shipPart.classList.add('ship-part-hit');
    }
  }

  placeShip(startX, startY, isAxisX, length) {
    const isDraggable = this.isDraggingEnabled;
    const ship = generateShip(startX, startY, isAxisX, length, isDraggable);
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
    this.isDraggingEnabled = true;
    const ships = this.board.querySelectorAll('.ship');

    ships.forEach((ship) => {
      ship.setAttribute('draggable', 'true');
    });
  }

  disableDragging() {
    this.isDraggingEnabled = false;
    const ships = this.board.querySelectorAll('.ship');

    ships.forEach((ship) => {
      ship.setAttribute('draggable', 'false');
    });
  }

  hideShips() {
    this.board.childNodes.forEach((square) => {
      const ship = square.getElementsByClassName('ship')[0];

      if (ship) {
        ship.remove();

        this.shipsContainer.push(ship);
      }
    });
  }

  showShips() {
    this.shipsContainer.forEach((ship) => {
      const firstPart = ship.childNodes[0];

      const x = Number(firstPart.getAttribute('data-x'));
      const y = Number(firstPart.getAttribute('data-y'));

      const square = this.getSquare(x, y);

      square.appendChild(ship);
    });
  }

  getShipPart(x, y) {
    const partOnBoard = this.board.querySelector(
      `.ship-part[data-x='${x}'][data-y='${y}']`
    );

    if (partOnBoard != null) {
      return partOnBoard;
    }

    const partsInContainer = this.shipsContainer.reduce((accumulator, ship) => {
      const shipNodes = ship.childNodes;

      return accumulator.concat(...shipNodes);
    }, []);

    if (partsInContainer.length > 0) {
      const shipPartInContainer = partsInContainer.find((shipPart) => {
        const isX = Number(shipPart.getAttribute('data-x')) === x;
        const isY = Number(shipPart.getAttribute('data-y')) === y;

        return isX && isY;
      });

      return shipPartInContainer;
    }
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

let dragged;

function generateShip(startX, startY, isAxisX, length, isDraggable) {
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

  parent.addEventListener('dblclick', (event) => {
    const { currentTarget } = event;

    const boardId = Number(
      currentTarget.parentElement.parentElement.getAttribute('data-board-id')
    );

    const shipHead = currentTarget.children[0];

    const shipX = Number(shipHead.getAttribute('data-x'));
    const shipY = Number(shipHead.getAttribute('data-y'));

    const coordinatesData = {
      shipX,
      shipY,

      boardId,
    };

    PubSub.publish('ship-rotated', coordinatesData);
  });

  parent.setAttribute('draggable', isDraggable);

  return parent;
}

function appendNumbers(parent) {
  for (let i = 0; i < 10; i += 1) {
    const div = document.createElement('div');
    div.textContent = i;

    parent.append(div);
  }
}

function appendLetters(parent) {
  for (let i = 0; i < 10; i += 1) {
    const div = document.createElement('div');
    const charCode = i + 65;

    div.textContent = String.fromCharCode(charCode);
    parent.append(div);
  }
}

export default BoardUi;
