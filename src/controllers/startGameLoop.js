import PubSub from 'pubsub-js';
import elementsManager from './elementsManager';

async function startGameLoop() {
  let isFirstRound = true;
  let isSomeoneSunk = elementsManager.isSomeoneSunk();

  while (!elementsManager.isSomeoneSunk()) {
    PubSub.publish('round-started', { isFirstRound });

    const current = elementsManager.getCurrent();
    const other = elementsManager.getOther();

    if (current.isAi()) {
      let lastWasShip = true;

      while (lastWasShip && !isSomeoneSunk) {
        const [x, y] = other.calculateAttack();
        other.receiveAttack(x, y);

        lastWasShip = other.isShip(x, y);
        isSomeoneSunk = elementsManager.isSomeoneSunk();
      }
    } else {
      let lastWasShip = true;

      while (lastWasShip && !isSomeoneSunk) {
        const clicked = await createSquareClickPromise();
        if (clicked) {
          const { x, y } = clicked;

          other.receiveAttack(x, y);

          lastWasShip = other.isShip(x, y);
          isSomeoneSunk = elementsManager.isSomeoneSunk();
        }
      }
    }

    elementsManager.switchElements();

    if (isFirstRound) {
      isFirstRound = false;
    }
  }

  PubSub.publish('game-loop-ended');
}

function createSquareClickPromise() {
  return new Promise((resolve) => {
    const clickToken = PubSub.subscribe('square-clicked', (msg, data) => {
      const { boardId, x, y } = data;

      const other = elementsManager.getOther();
      const otherId = elementsManager.getOtherId();

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

export default startGameLoop;
