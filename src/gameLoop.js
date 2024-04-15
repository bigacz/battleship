import PubSub from 'pubsub-js';
import game from './game';

PubSub.subscribe('ship-dropped', (msg, data) => {
  const { oldX, oldY, newX, newY, boardId } = data;

  if (oldX === newX && oldY === newY) {
    return;
  }

  const gameElement = game.getElement(boardId);
  gameElement.relocateShip(oldX, oldY, newX, newY);
});

PubSub.subscribe('ship-rotated', (msg, data) => {
  const { shipX, shipY, boardId } = data;

  const gameElement = game.getElement(boardId);
  gameElement.rotateShip(shipX, shipY);
});

PubSub.subscribe('square-clicked', (msg, data) => {
  const { boardId, x, y } = data;
  const other = game.getOther();

  const otherId = game.getOtherId();
  const isHit = other.isHit(x, y);

  if (otherId === boardId && !game.isSomeoneSunk() && !isHit) {
    other.receiveAttack(x, y);

    const isShip = other.isShip(x, y);

    if (isEnd()) {
      endGame();

      return;
    }

    if (!isShip) {
      startNextRound();
    }
  }
});

function startNextRound() {
  game.switchElements();
  checkIfCurrentIsAi();
}

function playAiRound() {
  const other = game.getOther();

  const [x, y] = other.calculateAttack();
  other.receiveAttack(x, y);

  if (isEnd()) {
    endGame();

    return;
  }

  const isShip = other.isShip(x, y);
  if (isShip) {
    playAiRound();
  } else {
    startNextRound();
  }
}

function endGame() {
  game.enableEndScreen();
}

function isEnd() {
  const other = game.getOther();

  return other.areAllSunk();
}

function checkIfCurrentIsAi() {
  const current = game.getCurrent();

  if (current.isAi()) {
    playAiRound();
  }
}

checkIfCurrentIsAi();
