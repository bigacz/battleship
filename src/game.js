import PubSub from 'pubsub-js';
import BoardUi from './components/BoardUi';
import Player from './scripts/Player';
import endScreen from './components/endScreen';

// Temporary

const player0 = new Player('Anna', false);
const player1 = new Player('John', true);

//

const parent1 = document.getElementById('board1');
const parent2 = document.getElementById('board2');

const boardUi0 = new BoardUi(parent1, 0);
const boardUi1 = new BoardUi(parent2, 1);

const boardUis = [boardUi0, boardUi1];
const players = [player0, player1];

// temporary

player0.placeShip(2, 2, true, 3);
player1.placeShip(2, 2, true, 3);

boardUi0.placeShip(2, 2, true, 3);
boardUi1.placeShip(2, 2, true, 3);

//

let currentId = 0;
let otherId = 1;

let currentPlayer = players[currentId];
let otherPlayer = players[otherId];

let currentBoardUi = boardUis[currentId];
let otherBoardUi = boardUis[otherId];

function switchElements() {
  otherId = currentId;
  currentId = currentId === 0 ? 1 : 0;

  currentPlayer = players[currentId];
  otherPlayer = players[otherId];

  currentBoardUi = boardUis[currentId];
  otherBoardUi = boardUis[otherId];
}

function attackOther(x, y) {
  otherBoardUi.hitSquare(x, y);
  otherPlayer.receiveAttack(x, y);
}

function randomAttackOther() {
  const [x, y] = otherPlayer.calculateAttack();

  otherBoardUi.hitSquare(x, y);
  otherPlayer.receiveAttack(x, y);
}

function isCurrentSunk() {
  return currentPlayer.areAllSunk();
}

function isOtherSunk() {
  return otherPlayer.areAllSunk();
}

function isSomeoneSunk() {
  return isCurrentSunk() || isOtherSunk();
}

function replacePlayers([name0, isAi0], [name1, isAi1]) {
  players[0] = new Player(name0, isAi0);
  players[1] = new Player(name1, isAi1);
}

function cleanBoards() {
  // TODO: Add logic board cleaning
  boardUis.forEach((board) => {
    board.cleanBoard();
  });
}

function isCurrentAi() {
  return currentPlayer.isAi;
}

function getCurrentId() {
  return currentId;
}

function getOtherId() {
  return otherId;
}

function isCurrentHit(x, y) {
  return currentPlayer.isHit(x, y);
}

function isOtherHit(x, y) {
  return otherPlayer.isHit(x, y);
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
  attackOther,
  randomAttackOther,
  isOtherSunk,
  replacePlayers,
  cleanBoards,
  isCurrentAi,
  getCurrentId,
  getOtherId,
  isSomeoneSunk,
  isCurrentHit,
  isOtherHit,
  enableEndScreen,
  disableEndScreen,
};

// Helpers
function getWinner() {
  let winner = null;

  if (isCurrentSunk()) {
    winner = otherPlayer.name;
  } else if (isOtherSunk()) {
    winner = currentPlayer.name;
  }

  return winner;
}

export default game;
