class Ship {
  constructor(length) {
    this.hits = 0;
    this.length = length;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    let sunk = false;
    if (this.hits >= this.length) {
      sunk = true;
    }

    return sunk;
  }
}

// idk if it should be property or method isSunk

export default Ship;
