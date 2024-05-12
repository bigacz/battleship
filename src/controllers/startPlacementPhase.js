import PubSub from 'pubsub-js';
import elementsManager from './elementsManager';
import boardWrappers from '../components/boardWrappers';
import controlPanel from '../components/controlPanel';
import switchScreen from '../components/switchScreen';

async function startPlacementPhase() {
  controlPanel.enable();

  await startPlacementRound();

  await startPlacementRound();

  boardWrappers.rotateToPlayer(0);

  const current = elementsManager.getCurrent();
  const other = elementsManager.getOther();

  current.hideShips();
  other.hideShips();

  controlPanel.disable();

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

    boardWrappers.rotateToPlayer(current.id);

    current.showShips();
    current.enableDragging();

    other.hideShips();

    await createConfirmPromise();

    current.disableDragging();
  }

  elementsManager.switchElements();
}

function createConfirmPromise() {
  return new Promise((resolve) => {
    const token = PubSub.subscribe('placement-confirmed', () => {
      resolve();

      PubSub.unsubscribe(token);
    });
  });
}

export default startPlacementPhase;
