"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMatrix = void 0;
function createMatrix(size) {
    return Array.from(Array(size.ySize), () => new Array(size.xSize).fill("x"));
}
exports.createMatrix = createMatrix;
