function translateCoords(startX, startY, isAxisX, length) {
  const coordinates = [];

  if (isAxisX === true) {
    for (let x = startX; x - startX < length; x += 1) {
      coordinates.push([x, startY]);
    }
  } else if (isAxisX === false) {
    for (let y = startY; y - startY < length; y += 1) {
      coordinates.push([startX, y]);
    }
  }

  return coordinates;
}

function isShipOutOfBound(startX, startY, isAxisX, length) {
  let endCoordinate = isAxisX === true ? startX + length : startY + length;

  return endCoordinate - 1 > 9;
}

function getShipAdjacentCoords(startX, startY, isAxisX, length) {
  const adjacentCoords = [];

  if (isAxisX) {
    for (let x = startX; x - startX < length; x += 1) {
      const lower = [x, startY - 1];
      const upper = [x, startY + 1];

      if (isInBound(...lower)) {
        adjacentCoords.push(lower);
      }

      if (isInBound(...upper)) {
        adjacentCoords.push(upper);
      }
    }

    const leftX = startX - 1;
    const rightX = startX + length;

    for (let i = -1; i <= 1; i += 1) {
      const leftCoords = [leftX, startY + i];
      const rightCoords = [rightX, startY + i];

      if (isInBound(...leftCoords)) {
        adjacentCoords.push(leftCoords);
      }

      if (isInBound(...rightCoords)) {
        adjacentCoords.push(rightCoords);
      }
    }
  } else {
    for (let y = startY; y - startY < length; y += 1) {
      const left = [startX - 1, y];
      const right = [startX + 1, y];

      if (isInBound(...left)) {
        adjacentCoords.push(left);
      }

      if (isInBound(...right)) {
        adjacentCoords.push(right);
      }
    }

    const upY = startY - 1;
    const downY = startY + length;

    for (let i = -1; i <= 1; i += 1) {
      const upCoords = [startX + i, upY];
      const downCoords = [startX + i, downY];

      if (isInBound(...upCoords)) {
        adjacentCoords.push(upCoords);
      }

      if (isInBound(...downCoords)) {
        adjacentCoords.push(downCoords);
      }
    }
  }

  return adjacentCoords;
}

function generateRandomShips() {
  const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  let validCoords = shuffleArray(generateBoardCoords());
  const ships = [];

  shipsLengths.forEach((length) => {
    const isAxisX = Math.random() < 0.5;

    for (let i = 0; i < validCoords.length; i += 1) {
      const [startX, startY] = validCoords[i];

      const shipParameters = [startX, startY, isAxisX, length];
      const tailCoords = getTailCoords(...shipParameters);

      const tailStringified = tailCoords.toString();

      const isValid = validCoords.some((coords) => {
        const coordsStringified = coords.toString();

        return tailStringified === coordsStringified;
      });

      if (isValid) {
        const adjacentCoords = getShipAdjacentCoords(...shipParameters);
        const shipCoords = translateCoords(...shipParameters);
        const coordsToRemove = adjacentCoords.concat(shipCoords);

        validCoords = removeCoordsFromArray(validCoords, coordsToRemove);

        ships.push(shipParameters);

        break;
      }
    }
  });

  return ships;
}

function getAdjacentCoords(midX, midY) {
  const coordinates = [];

  for (let x = midX - 1; x <= midX + 1; x += 1) {
    for (let y = midY - 1; y <= midY + 1; y += 1) {
      if ((x !== midX || y !== midY) && isOutBound(x, y)) {
        coordinates.push([x, y]);
      }
    }
  }

  return coordinates;
}

function getAdjacentHorizontalCoords(x, y) {
  const coords = [];

  const left = [x - 1, y];
  if (isInBound(...left)) {
    coords.push(left);
  }

  const right = [x + 1, y];
  if (isInBound(...right)) {
    coords.push(right);
  }

  return coords;
}

function getAdjacentVerticalCoords(x, y) {
  const coords = [];

  const up = [x, y - 1];
  if (isInBound(...up)) {
    coords.push(up);
  }

  const down = [x, y + 1];
  if (isInBound(...down)) {
    coords.push(down);
  }

  return coords;
}

// rename - confusing
function isOutBound(x, y) {
  const isX = x >= 0 && x <= 9;
  const isY = y >= 0 && y <= 9;

  return isX && isY;
}

function isInBound(x, y) {
  const isX = x >= 0 && x <= 9;
  const isY = y >= 0 && y <= 9;

  return isX && isY;
}

function generateBoardCoords() {
  const coords = [];

  for (let x = 0; x < 10; x += 1) {
    for (let y = 0; y < 10; y += 1) {
      coords.push([x, y]);
    }
  }

  return coords;
}

// Helpers

function getTailCoords(startX, startY, isAxisX, length) {
  let tail;

  if (isAxisX) {
    const lastX = startX + length - 1;
    tail = [lastX, startY];
  } else {
    const lastY = startY + length - 1;
    tail = [startX, lastY];
  }

  return tail;
}

function removeCoordsFromArray(array, removeValues) {
  const filtered = array.filter((coords) => {
    const index = removeValues.findIndex(
      (removeCoords) => coords.toString() === removeCoords.toString()
    );

    return index === -1;
  });

  return filtered;
}

function shuffleArray(preArray) {
  let array = [...preArray];

  for (let i = array.length - 1; i > 0; i -= 1) {
    let randomIndex = Math.floor((i + 1) * Math.random());

    const temp = array[randomIndex];
    array[randomIndex] = array[i];
    array[i] = temp;
  }

  return array;
}

export {
  translateCoords,
  isShipOutOfBound,
  getAdjacentCoords,
  getShipAdjacentCoords,
  generateRandomShips,
  generateBoardCoords,
  getAdjacentVerticalCoords,
  getAdjacentHorizontalCoords,
};
