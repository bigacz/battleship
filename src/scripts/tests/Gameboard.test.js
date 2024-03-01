import Gameboard from '../Gameboard';

describe('Gameboard', () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('Instantiates correctly', () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach((xAxis) => {
      expect(xAxis.length).toBe(10);
      expect(xAxis.every((yElement) => yElement === null)).toBe(true);
    });
  });
});
