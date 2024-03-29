import Gameboard from '../scripts/Gameboard';
import Ship from '../scripts/Ship';

jest.spyOn(global.Math, 'random').mockReturnValue(0.0001);

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

describe('Instantiation', () => {
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
});

describe('placeShip', () => {
  test('on x axis', () => {
    gameboard.placeShip(1, 2, true, 3);

    expect(gameboard.board[1][2].ship).toEqual(ship2);
    expect(gameboard.board[2][2].ship).toEqual(ship2);
    expect(gameboard.board[3][2].ship).toEqual(ship2);
  });

  test('on y axis', () => {
    gameboard.placeShip(2, 3, false, 2);

    expect(gameboard.board[2][3].ship).toEqual(ship1);
    expect(gameboard.board[2][4].ship).toEqual(ship1);
  });

  test('throws an error when coordinates are out of bound', () => {
    expect(() => {
      gameboard.placeShip(8, 5, true, 3);
    }).toThrow();
  });
});

describe('receiveAttack', () => {
  test('on empty square', () => {
    gameboard.receiveAttack(3, 2);

    expect(gameboard.board[3][2].isHit).toEqual(true);
  });

  test('on square with ship', () => {
    gameboard.board[3][3].ship = mockShipFloating;

    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(mockShipFloating.hit).toHaveBeenCalled();
  });

  test('doesnt hit the square ship twice', () => {
    gameboard.board[3][3].ship = mockShipFloating;

    gameboard.receiveAttack(3, 3);
    gameboard.receiveAttack(3, 3);

    expect(gameboard.board[3][3].isHit).toEqual(true);
    expect(mockShipFloating.hit).toHaveBeenCalledTimes(1);
  });
});

describe('areAllSunk', () => {
  test('returns true when all Ships are sunk', () => {
    gameboard.board[2][3].ship = mockShipSunk;

    expect(gameboard.areAllSunk()).toBe(true);
  });

  test('returns false if ship isnt sunk', () => {
    gameboard.board[2][3].ship = mockShipFloating;

    expect(gameboard.areAllSunk()).toBe(false);
  });
});

describe('calculateAttack', () => {
  test('doesnt return hit square', () => {
    gameboard.board[0][0].isHit = true;

    const [x, y] = gameboard.calculateAttack();
    const square = gameboard.board[x][y];

    expect(square.isHit).toBe(false);
  });
});

describe('isLegalToPlaceShip', () => {
  test('returns false if ship is out of bound', () => {
    expect(gameboard.isLegalToPlaceShip(8, 0, true, 3)).toBe(false);
  });

  test('returns true if ship is in bound', () => {
    expect(gameboard.isLegalToPlaceShip(5, 0, true, 3)).toBe(true);
  });

  test('returns false if ship is adjacent', () => {
    gameboard.board[0][0].ship = mockShipFloating;

    expect(gameboard.isLegalToPlaceShip(1, 1, true, 3)).toBe(false);
  });

  test('returns true if ship isnt adjacent', () => {
    expect(gameboard.isLegalToPlaceShip(1, 1, true, 3)).toBe(true);
  });
});

describe('getShipCoords', () => {
  test('returns coordinates of ship', () => {
    gameboard.board[3][3].ship = mockShipFloating;
    gameboard.board[3][4].ship = mockShipFloating;
    gameboard.board[3][5].ship = mockShipFloating;
    gameboard.board[3][6].ship = mockShipFloating;
    expect(gameboard.getShipCoords(3, 4).sort()).toEqual(
      [
        [3, 3],
        [3, 4],
        [3, 5],
        [3, 6],
      ].sort()
    );
  });
});
