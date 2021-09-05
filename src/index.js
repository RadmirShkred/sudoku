module.exports = function solveSudoku(matrix) {
  //size for all field

  const size = 9;

  //size for single box

  const boxSize = 3;

  //function for find empty square

  const findEmpty = (matrix) => {
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        if (matrix[row][column] === 0) return [row, column];
      }
    }
    return null;
  };

  //check rows, columns and boxes

  const validate = (num, position, matrix) => {
    const [row, column] = position;

    //check rows

    for (let i = 0; i < size; i++) {
      if (matrix[i][column] === num && i !== row) return false;
    }

    //check columns

    for (let i = 0; i < size; i++) {
      if (matrix[row][i] === num && i !== column) return false;
    }

    //check box

    const boxRow = Math.floor(row / boxSize) * boxSize;
    const boxColumn = Math.floor(column / boxSize) * boxSize;

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxColumn; j < boxColumn + boxSize; j++) {
        if (matrix[i][j] === num && i !== row && j !== column) return false;
      }
    }
    return true;
  };

  //solving task

  const solve = () => {
    const currentPosition = findEmpty(matrix);

    if (currentPosition === null) return true;

    for (let i = 1; i < size + 1; i++) {
      const currentNum = i;
      const isValid = validate(currentNum, currentPosition, matrix);

      if (isValid) {
        const [x, y] = currentPosition;
        matrix[x][y] = currentNum;

        if (solve()) return true;

        matrix[x][y] = 0;
      }
    }
    return false;
  };
  solve();
  return matrix;
};
