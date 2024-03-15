import translateCoords from '../translateCoords';

describe('translateCoords', () => {
  test('works on X axis', () => {
    expect(translateCoords(1, 2, true, 3)).toEqual([
      [1, 2],
      [2, 2],
      [3, 2],
    ]);
  });
});
