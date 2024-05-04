import Gameboard from '../scripts/Gameboard';
import Ship from '../scripts/Ship';

jest.spyOn(global.Math, 'random').mockReturnValue(0.0001);

let gameboard;
let ship1;

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
});

describe('Instantiation', () => {
  test('Instantiates correctly', () => {
    expect(gameboard.board.length).toBe(10);

    gameboard.board.forEach((xAxis) => {
      expect(xAxis.length).toEqual(10);

      xAxis.forEach((square) => {
        expect(square.isHit).toEqual(false);
        expect(square.ship).toEqual(null);
      });
    });
  });
});

describe('placeShip', () => {
  test('on x axis', () => {
    let ship = new Ship(1, 2, true, 3);
    gameboard.placeShip(1, 2, true, 3);

    expect(gameboard.board[1][2].ship).toEqual(ship);
    expect(gameboard.board[2][2].ship).toEqual(ship);
    expect(gameboard.board[3][2].ship).toEqual(ship);
  });

  test('on y axis', () => {
    let ship = new Ship(2, 3, false, 2);
    gameboard.placeShip(2, 3, false, 2);

    expect(gameboard.board[2][3].ship).toEqual(ship);
    expect(gameboard.board[2][4].ship).toEqual(ship);
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

  test('returns a non hit square around one hitted non sunk ship', () => {
    mockShipFloating.hits = 1;
    gameboard.board[4][4].isHit = true;
    gameboard.board[4][4].ship = mockShipFloating;
    gameboard.board[5][4].ship = mockShipFloating;

    const coords = gameboard.calculateAttack();

    expect(String(coords)).toBe(String([3, 4]));
  });

  test('returns a horizontally adjacent coords', () => {
    mockShipFloating.isAxisX = true;
    mockShipFloating.hits = 2;
    gameboard.board[5][4].isHit = true;
    gameboard.board[6][4].isHit = true;
    gameboard.board[4][4].ship = mockShipFloating;
    gameboard.board[5][4].ship = mockShipFloating;
    gameboard.board[6][4].ship = mockShipFloating;

    const coords = gameboard.calculateAttack();

    expect(String(coords)).toBe(String([4, 4]));
  });

  test('returns a vertically adjacent coords', () => {
    mockShipFloating.isAxisX = false;
    mockShipFloating.hits = 2;
    gameboard.board[4][5].isHit = true;
    gameboard.board[4][6].isHit = true;
    gameboard.board[4][4].ship = mockShipFloating;
    gameboard.board[4][5].ship = mockShipFloating;
    gameboard.board[4][6].ship = mockShipFloating;

    const coords = gameboard.calculateAttack();

    expect(String(coords)).toBe(String([4, 4]));
  });
});

describe('isLegalToPlaceShip', () => {
  test('returns false if ship is out of bound', () => {
    expect(gameboard.isLegalToPlaceShip(8, 0, true, 3)).toBe(false);
  });

  test('returns true if ship is in bound', () => {
    expect(gameboard.isLegalToPlaceShip(5, 0, true, 3)).toBe(true);
  });

  test('returns false if ship is on starting square', () => {
    gameboard.board[0][0].ship = mockShipFloating;

    expect(gameboard.isLegalToPlaceShip(0, 0, true, 3)).toBe(false);
  });

  test('returns false if ship is on a non starting square', () => {
    gameboard.board[1][0].ship = mockShipFloating;

    expect(gameboard.isLegalToPlaceShip(0, 0, true, 3)).toBe(false);
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

describe('removeShip', () => {
  test('sets ship to null', () => {
    gameboard.board[3][3].ship = mockShipFloating;
    gameboard.board[3][4].ship = mockShipFloating;
    gameboard.board[3][5].ship = mockShipFloating;

    gameboard.removeShip(3, 3);

    expect(gameboard.board[3][3].ship).toBe(null);
    expect(gameboard.board[3][4].ship).toBe(null);
    expect(gameboard.board[3][5].ship).toBe(null);
  });
});

describe('getShip', () => {
  test('returns ship', () => {
    gameboard.board[3][3].ship = mockShipFloating;

    expect(gameboard.getShip(3, 3)).toBe(mockShipFloating);
  });
});
