const wrapper = document.getElementById('switchscreen');
const playerParagraph = document.getElementById('switchscreen-player');
const playButton = document.getElementById('switchscreen-play');

function changePlayer(name) {
  playerParagraph.textContent = `${name}'s turn`;
}

function enable() {
  wrapper.classList.add('modal-active');
}

function disable() {
  wrapper.classList.remove('modal-active');
}

playButton.addEventListener('click', () => {
  disable();
});

const switchScreen = {
  changePlayer,
  enable,
  disable,
};

export default switchScreen;
