"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_1 = require("./src/matrix");
const types_1 = require("./src/types");
const initialState = {
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
console.log("direction", types_1.DirectionEnum, matrixOld, (0, matrix_1.createMatrix)(state.matrixSize));
