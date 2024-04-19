const nameParagraph0 = document.getElementById('startscreen-name-0');
const nameParagraph1 = document.getElementById('startscreen-name-1');

const modeRadio0 = document.getElementById('startscreen-mode-0');
const modeRadio1 = document.getElementById('startscreen-mode-1');
const modeRadios = [modeRadio0, modeRadio1];

const switchButton = document.getElementById('startscreen-switch');
const playButton = document.getElementById('startscreen-play');

let areComputers = [false, true];

function getNames() {
  const name0 = nameParagraph0.value;
  const name1 = nameParagraph1.value;

  return [name0, name1];
}

function updateNames(isComputer0, isComputer1) {
  if (!isComputer0 && !isComputer1) {
    nameParagraph0.textContent = 'Player 1';
    nameParagraph1.textContent = 'Player 2';
  } else if (isComputer0) {
    nameParagraph0.textContent = 'Computer';
    nameParagraph1.textContent = 'Player';
  } else if (isComputer1) {
    nameParagraph0.textContent = 'Player';
    nameParagraph1.textContent = 'Computer';
  }
}

function isSelectedComputer() {
  const mode0 = modeRadio0.checked;

  return mode0;
}

function enableSwitchButton() {
  switchButton.classList.add('startscreen-switch-active');
}

function disableSwitchButton() {
  switchButton.classList.remove('startscreen-switch-active');
}

// Helpers

function switchPlayers() {
  if (isSelectedComputer()) {
    areComputers = areComputers.toReversed();
  }

  updateNames(...areComputers);
}

function changeMode() {
  if (isSelectedComputer()) {
    areComputers = [false, true];
    enableSwitchButton();
  } else {
    areComputers = [false, false];
    disableSwitchButton();
  }

  updateNames(...areComputers);
}

// Events

modeRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    changeMode();
  });
});

switchButton.addEventListener('click', () => {
  switchPlayers();
});
