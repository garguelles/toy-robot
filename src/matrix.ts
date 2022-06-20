import { MatrixSize } from "./types";

export function createMatrix(size: MatrixSize): string[][] {
  return Array.from(Array(size.ySize), () => new Array(size.xSize).fill("x"));
}
