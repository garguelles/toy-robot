"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = exports.place = void 0;
const types_1 = require("./types");
function place(coordinates, facing) {
    return { location: { x: 0, y: 1 }, facing: types_1.DirectionEnum.NORTH };
}
exports.place = place;
;
function move(currentLocation, currentFacing, direction) {
    return { location: { x: 0, y: 0 }, facing: types_1.DirectionEnum.SOUTH };
}
exports.move = move;
;
