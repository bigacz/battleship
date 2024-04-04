class Ship {
  constructor(startX, startY, isAxisX, length) {
    this.hits = 0;
    this.startX = startX;
    this.startY = startY;
    this.isAxisX = isAxisX;
    this.length = length;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

export default Ship;
