"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatrix = void 0;
function createMatrix(size) {
    const matrix = [];
    const x = Array.from({ length: size.ySize }, (_, value) => value);
    for (let i = 0; i < size.ySize; i++) {
        matrix.push(x);
    }
    return matrix;
}
exports.createMatrix = createMatrix;
