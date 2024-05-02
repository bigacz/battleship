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

function appendCoordinates(id) {
  const numbers = document.getElementById(`board-numbers${id}`);
  const letters = document.getElementById(`board-letters${id}`);
  appendNumbers(numbers);
  appendLetters(letters);
}

// Helpers

function appendNumbers(parent) {
  for (let i = 0; i < 10; i += 1) {
    const div = document.createElement('div');
    div.textContent = i;

    parent.append(div);
  }
}

function appendLetters(parent) {
  for (let i = 0; i < 10; i += 1) {
    const div = document.createElement('div');
    const charCode = i + 65;

    div.textContent = String.fromCharCode(charCode);
    parent.append(div);
  }
}

const boardWrappers = {
  rotateToPlayer,
  appendCoordinates,
};

export default boardWrappers;
