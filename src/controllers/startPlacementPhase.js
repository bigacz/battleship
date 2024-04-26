import PubSub from 'pubsub-js';
import elementsManager from './elementsManager';
import boardsWrapper from '../components/boardsWrapper';
import '../components/placementControls';
import switchScreen from '../components/switchScreen';

async function startPlacementPhase() {
  await startPlacementRound();

  await startPlacementRound();

  boardsWrapper.rotateToPlayer(0);

  const current = elementsManager.getCurrent();
  const other = elementsManager.getOther();

  current.hideShips();
  other.hideShips();

  PubSub.publish('placement-phase-ended');
}

async function startPlacementRound() {
  const current = elementsManager.getCurrent();
  const other = elementsManager.getOther();

  if (!current.isAi()) {
    if (!other.isAi()) {
      switchScreen.changePlayer(current.getName());
      switchScreen.enable();
    }

    boardsWrapper.rotateToPlayer(current.id);

    current.showShips();
    current.enableDragging();

    other.hideShips();

    await createConfirmPromise();

    current.disableDragging();
  }

  elementsManager.switchElements();
}

function createConfirmPromise() {
  return new Promise((resolve, reject) => {
    const token = PubSub.subscribe('placement-confirmed', () => {
      resolve();

      PubSub.unsubscribe(token);
    });
  });
}

export default startPlacementPhase;