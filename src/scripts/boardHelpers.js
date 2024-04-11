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

export {
  translateCoords,
  isShipOutOfBound,
  getAdjacentCoords,
  getShipAdjacentCoords,
};
