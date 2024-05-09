import PubSub from 'pubsub-js';

const wrapper = document.getElementById('startscreen');

const nameParagraph0 = document.getElementById('startscreen-name-0');
const nameParagraph1 = document.getElementById('startscreen-name-1');

const modeRadio0 = document.getElementById('startscreen-mode-0');
const modeRadio1 = document.getElementById('startscreen-mode-1');
const modeRadios = [modeRadio0, modeRadio1];

const switchButton = document.getElementById('startscreen-switch');
const playButton = document.getElementById('startscreen-play');

let areComputers = [false, true];

function enable() {
  wrapper.classList.add('modal-active');
}

function disable() {
  wrapper.classList.remove('modal-active');
}

// Helpers

function getNames() {
  const name0 = nameParagraph0.textContent;
  const name1 = nameParagraph1.textContent;

  return [name0, name1];
}

function updateNames(isComputer0, isComputer1) {
  if (!isComputer0 && !isComputer1) {
    nameParagraph0.textContent = 'Player 1';
    nameParagraph1.textContent = 'Player 2';
  } else if (isComputer0) {
    nameParagraph0.textContent = 'Computer';
    nameParagraph1.textContent = 'Human';
  } else if (isComputer1) {
    nameParagraph0.textContent = 'Human';
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

playButton.addEventListener('click', () => {
  const names = getNames();

  const player0 = [names[0], areComputers[0]];
  const player1 = [names[1], areComputers[1]];

  PubSub.publish('start-game', [player0, player1]);

  disable();
});

const startScreen = {
  enable,
  disable,
};

export default startScreen;
