import GameElement from '../scripts/GameElement';

const parent1 = document.getElementById('board0');
const parent2 = document.getElementById('board1');

const gameElement0 = new GameElement('Player 1', false, parent1, 0);
const gameElement1 = new GameElement('Player 2', true, parent2, 1);
const gameElements = [gameElement0, gameElement1];

let currentId = 0;
let otherId = 1;

let current = gameElements[currentId];
let other = gameElements[otherId];

function switchElements() {
  otherId = currentId;
  currentId = currentId === 0 ? 1 : 0;

  current = gameElements[currentId];
  other = gameElements[otherId];
}

function isSomeoneSunk() {
  return current.areAllSunk() || other.areAllSunk();
}

function getCurrentId() {
  return currentId;
}

function getOtherId() {
  return otherId;
}

function getCurrent() {
  return current;
}

function getOther() {
  return other;
}

function getElement(id) {
  return gameElements[id];
}

function changePlayers(name0, isAi0, name1, isAi1) {
  gameElement0.changePlayer(name0, isAi0);
  gameElement1.changePlayer(name1, isAi1);
}

function restartElements() {
  gameElement0.cleanBoard();
  gameElement1.cleanBoard();

  gameElement0.placeRandomShips();
  gameElement1.placeRandomShips();

  currentId = 0;
  otherId = 1;
  current = gameElements[currentId];
  other = gameElements[otherId];
}

function clearElements() {
  gameElement0.cleanBoard();
  gameElement1.cleanBoard();
}

function getWinner() {
  let winner = null;

  const isCurrentSunk = current.areAllSunk();
  const isOtherSunk = other.areAllSunk();

  if (isCurrentSunk) {
    winner = other;
  } else if (isOtherSunk) {
    winner = current;
  }

  return winner;
}

const elementsManager = {
  switchElements,

  getCurrentId,
  getOtherId,
  isSomeoneSunk,

  getCurrent,
  getOther,
  getElement,

  getWinner,

  changePlayers,
  restartElements,
  clearElements,
};

export default elementsManager;
