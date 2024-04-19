import PubSub from 'pubsub-js';

const nameInput0 = document.getElementById('startscreen-name-0');
const nameInput1 = document.getElementById('startscreen-name-1');

const modeRadio0 = document.getElementById('startscreen-mode-0');
const modeRadio1 = document.getElementById('startscreen-mode-1');
const modeRadios = [modeRadio0, modeRadio1];

const switchButton = document.getElementById('startscreen-switch');
const playButton = document.getElementById('startscreen-play');

function getInputNameValues() {
  const name0 = nameInput0.value;
  const name1 = nameInput1.value;

  return { name0, name1 };
}

function isSelectedComputer() {
  const mode0 = modeRadio0.checked;

  return mode0;
}
