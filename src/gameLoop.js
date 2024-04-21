import PubSub from 'pubsub-js';
import game from './game';

async function gameLoop() {
  let isSomeoneSunk = game.isSomeoneSunk();

  while (!game.isSomeoneSunk()) {
    const current = game.getCurrent();
    const other = game.getOther();

    if (current.isAi()) {
      let lastWasShip = true;

      while (lastWasShip && !isSomeoneSunk) {
        const [x, y] = other.calculateAttack();
        other.receiveAttack(x, y);

        lastWasShip = other.isShip(x, y);
        isSomeoneSunk = game.isSomeoneSunk();
      }
    } else {
      let lastWasShip = true;

      while (lastWasShip && !isSomeoneSunk) {
        // eslint-disable-next-line
        const clicked = await createSquareClickPromise();
        if (clicked) {
          const { x, y } = clicked;

          other.receiveAttack(x, y);

          lastWasShip = other.isShip(x, y);
          isSomeoneSunk = game.isSomeoneSunk();
        }
      }
    }

    game.switchElements();
  }

  game.enableEndScreen();
}

function createSquareClickPromise() {
  return new Promise((resolve, reject) => {
    const clickToken = PubSub.subscribe('square-clicked', (msg, data) => {
      const { boardId, x, y } = data;

      const other = game.getOther();
      const otherId = game.getOtherId();

      const isHit = other.isHit(x, y);
      const isSameBoard = otherId === boardId;

      if (!isHit && isSameBoard) {
        resolve({ boardId, x, y });
      } else {
        resolve(null);
      }

      PubSub.unsubscribe(clickToken);
    });
  });
}

export default gameLoop;
