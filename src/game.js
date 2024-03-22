import PubSub from 'pubsub-js';
import BoardUi from './components/BoardUi';
import Player from './scripts/Player';

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

let currentId = 0;

function switchElements() {
  currentId = currentId === 0 ? 1 : 0;
}

function attackOther(x, y) {
  const otherId = currentId === 0 ? 1 : 0;
  const otherBoardUi = boardUis[otherId];
  const otherPlayer = players[otherId];

  otherBoardUi.hitSquare(x, y);
  otherPlayer.receiveAttack(x, y);
}

function randomAttackOther() {
  const otherId = currentId === 0 ? 1 : 0;
  const otherBoardUi = boardUis[otherId];
  const otherPlayer = players[otherId];

  const [x, y] = otherPlayer.calculateAttack();
  otherBoardUi.hitSquare(x, y);
  otherPlayer.receiveAttack(x, y);
}

function isOtherSunk() {
  const otherId = currentId === 0 ? 1 : 0;
  const otherPlayer = players[otherId];

  return otherPlayer.areAllSunk();
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
  return players[currentId].isAi;
}

function getCurrentId() {
  return currentId;
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
};

export default game;
