import Gameboard from '../Gameboard';
import Ship from '../Ship';

describe('Gameboard', () => {
  let gameboard;
  let ship1;
  let ship2;

  let mockShipFloating = {
    hit: jest.fn(),
    isSunk: jest.fn(() => false),
  };

  let mockShipSunk = {
    hit: jest.fn(),
    isSunk: jest.fn(() => true),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    gameboard = new Gameboard();
    ship1 = new Ship(2);
    ship2 = new Ship(3);
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
    gameboard.placeShip(1, 2, true, 3);

    expect(gameboard.board[1][2].ship).toEqual(ship2);
    expect(gameboard.board[2][2].ship).toEqual(ship2);
    expect(gameboard.board[3][2].ship).toEqual(ship2);
  });

  test('Places ship on y axis', () => {
    gameboard.placeShip(2, 3, false, 2);

    expect(gameboard.board[2][3].ship).toEqual(ship1);
    expect(gameboard.board[2][4].ship).toEqual(ship1);
  });

  test('Placing throws an error when coordinates are out of bound', () => {
    expect(() => {
      gameboard.placeShip(8, 5, true, 3);
    }).toThrow();
  });

  test('Receive attack works on empty square', () => {
    gameboard.receiveAttack(3, 2);

    expect(gameboard.board[3][2].isHit).toEqual(true);
  });

  test('Receive attack works on square with ship', () => {
    gameboard.board[3][3].ship = mockShipFloating;

    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(mockShipFloating.hit).toHaveBeenCalled();
  });

  test('Receive attack doesnt hit the square ship twice', () => {
    gameboard.board[3][3].ship = mockShipFloating;

    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(mockShipFloating.hit).toHaveBeenCalledTimes(1);
  });

  test('areAllSunk returns true when all Ships are sunk', () => {
    gameboard.board[2][3].ship = mockShipSunk;

    expect(gameboard.areAllSunk()).toBe(true);
  });

  test('areAllSunk returns false if ship isnt sunk', () => {
    gameboard.board[2][3].ship = mockShipFloating;

    expect(gameboard.areAllSunk()).toBe(false);
  });
});
