import {
  isShipOutOfBound,
  translateCoords,
  getShipAdjacentCoords,
} from '../scripts/boardHelpers';

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

describe('getShipAdjacentCoords', () => {
  test('ship in the middle', () => {
    expect(getShipAdjacentCoords(2, 2, true, 3).sort()).toEqual([
      [1, 1],
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 3],
      [4, 1],
      [4, 3],
      [5, 1],
      [5, 2],
      [5, 3],
    ]);
  });

  test('ship at the edge', () => {
    expect(getShipAdjacentCoords(0, 0, true, 2).sort()).toEqual(
      [
        [0, 1],
        [1, 1],
        [2, 0],
        [2, 1],
      ].sort()
    );
  });

  test('ship in y axis', () => {
    expect(getShipAdjacentCoords(2, 2, false, 2).sort()).toEqual(
      [
        [1, 1],
        [2, 1],
        [3, 1],
        [1, 2],
        [3, 2],
        [1, 3],
        [3, 3],
        [1, 4],
        [2, 4],
        [3, 4],
      ].sort()
    );
  });
});
