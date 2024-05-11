import PubSub from 'pubsub-js';

const wrapper = document.getElementById('control-panel');
const confirmButton = document.getElementById('confirm-button');
const randomButton = document.getElementById('random-button');

function enable() {
  wrapper.classList.add('control-panel-active');
}

function disable() {
  wrapper.classList.remove('control-panel-active');
}

confirmButton.addEventListener('click', () => {
  PubSub.publish('placement-confirmed');
});

randomButton.addEventListener('click', () => {
  PubSub.publish('replace-ships-clicked');
});

const placementControls = {
  enable,
  disable,
};

export default placementControls;
