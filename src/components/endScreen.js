const wrapper = document.getElementById('endscreen');
const winnerParagraph = document.getElementById('endscreen-winner');

function enable() {
  wrapper.classList.add('endscreen-active');
}

function disable() {
  wrapper.classList.remove('endscreen-active');
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
