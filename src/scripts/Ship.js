class Ship {
  constructor(startX, startY, length) {
    this.hits = 0;
    this.length = length;
    this.startX = startX;
    this.startY = startY;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;
