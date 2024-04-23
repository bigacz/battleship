import PubSub from 'pubsub-js';
import gameLoop from './gameLoop';
import elementsManager from './elementsManager';
import endScreen from '../components/endScreen';
import startScreen from '../components/startScreen';

PubSub.subscribe('game-loop-ended', () => {
  const winner = elementsManager.getWinner();

  endScreen.changeWinner(winner.getName());
  endScreen.enable();
});

PubSub.subscribe('start-game', (msg, data) => {
  const [player1, player2] = data;

  elementsManager.changePlayers(...player1, ...player2);
  elementsManager.restartElements();
});
