import PubSub from 'pubsub-js';
import GameElement from './scripts/GameElement';
import endScreen from './components/endScreen';

const parent1 = document.getElementById('board0');
const parent2 = document.getElementById('board1');

const gameElement0 = new GameElement('Player 1', false, parent1, 0);
const gameElement1 = new GameElement('Player 2', true, parent2, 1);
const gameElements = [gameElement0, gameElement1];

// temporary

gameElement0.placeShip(4, 1, false, 2);
gameElement1.placeShip(3, 2, true, 3);

//

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

function enableEndScreen() {
  const winner = getWinner();
  endScreen.changeWinner(winner);
  endScreen.enable();
}

function disableEndScreen() {
  endScreen.disable();
}

const game = {
  switchElements,

  getCurrentId,
  getOtherId,
  isSomeoneSunk,

  getCurrent,
  getOther,
  getElement,

  enableEndScreen,
  disableEndScreen,
};

// Helpers
function getWinner() {
  let winner = null;

  const isCurrentSunk = current.areAllSunk();
  const isOtherSunk = other.areAllSunk();

  if (isCurrentSunk) {
    winner = other.getName();
  } else if (isOtherSunk) {
    winner = current.getName();
  }

  return winner;
}

export default game;
