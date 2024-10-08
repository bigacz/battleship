import PubSub from 'pubsub-js';
import startGameLoop from './startGameLoop';
import startPlacementPhase from './startPlacementPhase';
import elementsManager from './elementsManager';

import startScreen from '../components/startScreen';
import endScreen from '../components/endScreen';
import switchScreen from '../components/switchScreen';
import boardWrappers from '../components/boardWrappers';
import messageBoard from '../components/messageBoard';

PubSub.subscribe('game-loop-ended', () => {
  const winner = elementsManager.getWinner();

  endScreen.changeWinner(winner.getName());
  endScreen.enable();
});

PubSub.subscribe('start-game', async (msg, data) => {
  const [player1, player2] = data;

  elementsManager.changePlayers(...player1, ...player2);
  elementsManager.restartElements();

  messageBoard.setPlaceShips();
  await startPlacementPhase();

  messageBoard.setAttackEnemy();
  startGameLoop();
});

PubSub.subscribe('replace-ships-clicked', () => {
  const current = elementsManager.getCurrent();
  current.cleanBoard();
  current.placeRandomShips();
});

PubSub.subscribe('round-started', () => {
  const current = elementsManager.getCurrent();
  const other = elementsManager.getOther();

  const isCurrentHuman = !current.isAi();
  const areHumans = isCurrentHuman && !other.isAi();

  if (areHumans) {
    other.hideShips();
    current.showShips();

    boardWrappers.rotateToPlayer(current.id);

    switchScreen.changePlayer(current.getName());
    switchScreen.enable();
  } else if (isCurrentHuman) {
    other.hideShips();
    current.showShips();

    boardWrappers.rotateToPlayer(current.id);
  }
});

PubSub.subscribe('play-again-clicked', () => {
  elementsManager.clearElements();
  startScreen.enable();
});
