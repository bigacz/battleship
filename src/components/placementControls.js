import PubSub from 'pubsub-js';

const confirmButton = document.getElementById('confirm-button');

confirmButton.addEventListener('click', () => {
  PubSub.publish('placement-confirmed');
});
