import PubSub from 'pubsub-js';

const confirmButton = document.getElementById('confirm-button');
const randomButton = document.getElementById('random-button');

confirmButton.addEventListener('click', () => {
  PubSub.publish('placement-confirmed');
});

randomButton.addEventListener('click', () => {
  PubSub.publish('replace-ships-clicked');
});
