import { createMatrix } from "./src/matrix";
import { DirectionEnum, State } from "./src/types";

const initialState: State = {
  matrixSize: { xSize: 5, ySize: 5 },
  location: null,
  facing: null,
};

const state = initialState;

const matrixOld = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
];


console.log("direction", DirectionEnum, matrixOld, createMatrix(state.matrixSize));


