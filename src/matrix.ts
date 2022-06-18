import { MatrixSize } from "./types";

export function createMatrix(size: MatrixSize): number[][] {
  const matrix = [];
  const x = Array.from({ length: size.ySize }, (_, value) => value);

  for (let i = 0; i < size.ySize; i++) {
    matrix.push(x);
  }

  return matrix
}
