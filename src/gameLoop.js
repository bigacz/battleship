import PubSub from 'pubsub-js';
import game from './game';

function continueRound() {
  if (game.isCurrentAi()) {
    game.randomAttackOther();
    game.switchElements();

    PubSub.publish('player-attacked');
  }

  if (game.isOtherSunk()) {
    // end game
  }
}

PubSub.subscribe('square-clicked', (msg, data) => {
  const { boardId, x, y } = data;

  const currentId = game.getCurrentId();
  if (currentId === boardId) {
    game.attackOther(x, y);

    game.switchElements();
    PubSub.publish('player-attacked');
  }

  if (game.isOtherSunk()) {
    // end game
  }
});

PubSub.subscribe('player-attacked', () => {
  continueRound();
});

continueRound();
