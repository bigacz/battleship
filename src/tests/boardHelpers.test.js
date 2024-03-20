import { isShipOutOfBound, translateCoords } from '../scripts/boardHelpers';

describe('translateCoords', () => {
  test('works on X axis', () => {
    expect(translateCoords(1, 2, true, 3)).toEqual([
      [1, 2],
      [2, 2],
      [3, 2],
    ]);
  });
});

describe('isShipOutOfBound', () => {
  test('returns false if ship is in bound', () => {
    expect(isShipOutOfBound(1, 2, true, 3)).toEqual(false);
  });
  test('returns true if ship is out of bound', () => {
    expect(isShipOutOfBound(8, 8, false, 4)).toEqual(true);
  });
});
