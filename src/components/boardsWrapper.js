const wrapper = document.getElementById('boards-wrapper');

function rotateToPlayer(id) {
  if (id === 0) {
    wrapper.classList.remove('boards-wrapper-rotated');
  } else if (id === 1) {
    wrapper.classList.add('boards-wrapper-rotated');
  }
}

const boardsWrapper = {
  rotateToPlayer,
};

export default boardsWrapper;
