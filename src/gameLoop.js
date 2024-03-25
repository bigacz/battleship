import PubSub from 'pubsub-js';
import game from './game';

function continueRound() {
  if (game.isCurrentAi()) {
    game.randomAttackOther();

    endRound();
  }
}

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
    // end game
  } else {
    game.switchElements();
    continueRound();
  }
}

function playAiRound(x, y) {}

continueRound();
