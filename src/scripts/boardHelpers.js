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

export { translateCoords, isShipOutOfBound };
