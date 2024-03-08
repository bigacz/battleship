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

      xAxis.forEach((square) => {
        expect(square.isHit).toEqual(false);
        expect(square.ship).toEqual(null);
      });
    });
  });

  test('Places ship on x axis', () => {
    const compareShip = new Ship(3);

    gameboard.placeShip(1, 2, true, 3);
    expect(gameboard.board[1][2].ship).toEqual(compareShip);
    expect(gameboard.board[2][2].ship).toEqual(compareShip);
    expect(gameboard.board[3][2].ship).toEqual(compareShip);
  });

  test('Places ship on y axis', () => {
    const compareShip = new Ship(2);

    gameboard.placeShip(2, 3, false, 2);
    expect(gameboard.board[2][3].ship).toEqual(compareShip);
    expect(gameboard.board[2][4].ship).toEqual(compareShip);
  });

  test('Placing throws an error when coordinates are out of bound', () => {
    expect(() => {
      gameboard.placeShip(8, 5, true, 3);
    }).toThrow();
  });

  test('Receive attack works on empty square', () => {
    expect(gameboard.board[3][2].isHit).toEqual(false);

    gameboard.placeShip(2, 3, true, 3);
    gameboard.receiveAttack(3, 2);

    expect(gameboard.board[3][2].isHit).toEqual(true);
  });

  test('Receive attack works on square with ship', () => {
    gameboard.placeShip(2, 3, true, 3);

    expect(gameboard.board[3][3].isHit).toEqual(false);
    expect(gameboard.board[3][3].ship.hits).toEqual(0);

    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(gameboard.board[3][3].ship.hits).toEqual(1);
  });

  test('Receive attack doesnt hit the square ship twice', () => {
    gameboard.placeShip(2, 3, true, 3);

    expect(gameboard.board[3][3].isHit).toEqual(false);
    expect(gameboard.board[3][3].ship.hits).toEqual(0);

    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(gameboard.board[3][3].ship.hits).toEqual(1);
  });

  test('areAllSunk returns correct value', () => {
    expect(gameboard.areAllSunk()).toBe(true);

    gameboard.placeShip(2, 3, true, 3);

    expect(gameboard.areAllSunk()).toBe(false);

    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(4, 3);

    expect(gameboard.areAllSunk()).toBe(true);
  });
});
