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
  if (isAxisX) {
    for (let x = startX - 1; x - startX < length; x += 1) {
      for (let i = -1; i <= 1; i += 1) {}
    }
  }
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

function isOutBound(x, y) {
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
