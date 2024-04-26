import PubSub from 'pubsub-js';
import gameLoop from './gameLoop';
import startPlacementPhase from './startPlacementPhase';
import elementsManager from './elementsManager';

import startScreen from '../components/startScreen';
import endScreen from '../components/endScreen';
import switchScreen from '../components/switchScreen';
import boardsWrapper from '../components/boardsWrapper';

PubSub.subscribe('game-loop-ended', () => {
  const winner = elementsManager.getWinner();

  endScreen.changeWinner(winner.getName());
  endScreen.enable();
});

PubSub.subscribe('start-game', async (msg, data) => {
  const [player1, player2] = data;

  elementsManager.changePlayers(...player1, ...player2);
  elementsManager.restartElements();

  await startPlacementPhase();
  gameLoop();
});

PubSub.subscribe('round-started', (msg, data) => {
  const { isFirstRound } = data;
  const current = elementsManager.getCurrent();
  const other = elementsManager.getOther();

  const areHumans = !current.isAi() && !other.isAi();
  if (isFirstRound) {
    other.hideShips();
    current.showShips();

    boardsWrapper.rotateToPlayer(current.id);
  } else if (areHumans) {
    other.hideShips();
    current.showShips();

    boardsWrapper.rotateToPlayer(current.id);
    switchScreen.changePlayer(current.getName());
    switchScreen.enable();
  }
});
