import Gameboard from './Gameboard';

class Player extends Gameboard {
  constructor(name, isAi) {
    super();

    this.name = name;
    this.isAi = isAi;
  }
}

export default Player;
