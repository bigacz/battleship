import PubSub from 'pubsub-js';
import game from './game';

PubSub.subscribe('square-clicked', (msg, data) => {
  const { boardId, x, y } = data;

  const otherId = game.getOtherId();
  const isHit = game.isOtherHit(x, y);

  if (otherId === boardId && !game.isSomeoneSunk() && !isHit) {
    game.attackOther(x, y);

    endRound();
  }
});

function endRound() {
  if (game.isOtherSunk()) {
    game.enableEndScreen();
  } else {
    game.switchElements();
    checkIfPlayerIsAi();
  }
}

function checkIfPlayerIsAi() {
  if (game.isCurrentAi()) {
    game.randomAttackOther();

    endRound();
  }
}

checkIfPlayerIsAi();
