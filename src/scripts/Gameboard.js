class Gameboard {
  constructor() {
    this.board = generateBoard();
  }

  placeShip() {}

  receiveAttack() {}
}

function generateBoard() {
  const board = [];
  for (let i = 0; i < 10; i += 1) {
    const xAxis = [];
    for (let j = 0; j < 10; j += 1) {
      xAxis.push(null);
    }

    board.push(xAxis);
  }

  return board;
}

export default Gameboard;
