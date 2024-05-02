const messageParagraph = document.getElementById('message-board');

function setPlaceShips() {
  messageParagraph.textContent = 'Place your ships';
}

function setAttackEnemy() {
  messageParagraph.textContent = 'Attack your enemy';
}

const messageBoard = {
  setPlaceShips,
  setAttackEnemy,
};

export default messageBoard;
