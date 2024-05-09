const wrapper = document.getElementById('endscreen');
const winnerParagraph = document.getElementById('endscreen-winner');

function enable() {
  wrapper.classList.add('modal-active');
}

function disable() {
  wrapper.classList.remove('modal-active');
}

function changeWinner(winner) {
  winnerParagraph.textContent = `The winner is ${winner}`;
}

const endScreen = {
  enable,
  disable,
  changeWinner,
};

export default endScreen;
