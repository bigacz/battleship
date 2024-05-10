import PubSub from 'pubsub-js';

const wrapper = document.getElementById('endscreen');
const winnerParagraph = document.getElementById('endscreen-winner');
const playButton = document.getElementById('endscreen-play-button');

function enable() {
  wrapper.classList.add('modal-active');
}

function disable() {
  wrapper.classList.remove('modal-active');
}

function changeWinner(winner) {
  winnerParagraph.textContent = `The winner is ${winner}`;
}

playButton.addEventListener('click', () => {
  disable();
  PubSub.publish('play-again-clicked');
});

const endScreen = {
  enable,
  disable,
  changeWinner,
};

export default endScreen;
