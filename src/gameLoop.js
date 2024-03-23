import PubSub from 'pubsub-js';
import game from './game';

function continueRound() {
  if (game.isCurrentAi()) {
    game.randomAttackOther();

    if (game.isOtherSunk()) {
      // end game
    }

    game.switchElements();
    PubSub.publish('player-attacked');
  }
}

PubSub.subscribe('square-clicked', (msg, data) => {
  const { boardId, x, y } = data;

  const otherId = game.getOtherId();

  if (otherId === boardId) {
    game.attackOther(x, y);

    if (game.isOtherSunk()) {
      // end game
    }

    game.switchElements();
    PubSub.publish('player-attacked');
  }
});

PubSub.subscribe('player-attacked', () => {
  continueRound();
});

continueRound();
