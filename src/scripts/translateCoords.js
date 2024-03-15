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

export default translateCoords;
