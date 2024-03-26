import PubSub from 'pubsub-js';
import game from './game';

PubSub.subscribe('square-clicked', (msg, data) => {
  const { boardId, x, y } = data;
  const other = game.getOther();

  const otherId = game.getOtherId();
  const isHit = other.isHit(x, y);

  if (otherId === boardId && !game.isSomeoneSunk() && !isHit) {
    other.receiveAttack(x, y);

    // should continue round when hit
    other.isShip(x, y);
    endRound();
  }
});

function endRound() {
  const other = game.getOther();

  if (other.areAllSunk()) {
    game.enableEndScreen();
  } else {
    game.switchElements();
    checkIfPlayerIsAi();
  }
}

function checkIfPlayerIsAi() {
  const current = game.getCurrent();
  const other = game.getOther();

  if (current.isAi()) {
    other.receiveRandomAttack();

    endRound();
  }
}

checkIfPlayerIsAi();
