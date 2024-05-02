const boardWrapper0 = document.getElementById('board-wrapper0');
const boardWrapper1 = document.getElementById('board-wrapper1');
const board0 = document.getElementById('board0');
const board1 = document.getElementById('board1');

function rotateToPlayer(id) {
  if (id === 0) {
    board0.remove();
    boardWrapper0.appendChild(board0);

    board1.remove();
    boardWrapper1.appendChild(board1);
  } else if (id === 1) {
    board1.remove();
    boardWrapper0.appendChild(board1);

    board0.remove();
    boardWrapper1.appendChild(board0);
  }
}

const boardWrappers = {
  rotateToPlayer,
};

export default boardWrappers;
