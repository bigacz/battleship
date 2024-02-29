import Ship from '../Ship';

describe('Ship', () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(2);
  });

  test('Instantiates correctly', () => {
    expect(ship.hits).toBe(0);
    expect(ship.length).toBe(2);
  });

  test('Hit() increments hits', () => {
    expect(ship.hits).toBe(0);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('isSunk() returns true if hits are equal or greater than length', () => {
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
