import Gameboard from '../Gameboard';
import Ship from '../Ship';

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

  test('Places ship on x axis', () => {
    const compareShip = new Ship(3);

    gameboard.placeShip(1, 2, true, 3);
    expect(gameboard.board[1][2]).toEqual(compareShip);
    expect(gameboard.board[2][2]).toEqual(compareShip);
    expect(gameboard.board[3][2]).toEqual(compareShip);
  });

  test('Places ship on y axis', () => {
    const compareShip = new Ship(2);

    gameboard.placeShip(2, 3, false, 2);
    expect(gameboard.board[2][3]).toEqual(compareShip);
    expect(gameboard.board[2][4]).toEqual(compareShip);
  });

  test('Placing throws an error when coordinates are out of bound', () => {
    expect(() => {
      gameboard.placeShip(8, 5, true, 3);
    }).toThrow();
  });
});
