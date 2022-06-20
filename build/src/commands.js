"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.move = exports.place = void 0;
const types_1 = require("./types");
const exceptions_1 = require("./exceptions");
const moveInDirection = {
    [types_1.DirectionEnum.NORTH]: (coordinates) => ({
        x: coordinates.x, y: coordinates.y + 1,
    }),
    [types_1.DirectionEnum.SOUTH]: (coordinates) => ({
        x: coordinates.x, y: coordinates.y - 1,
    }),
    [types_1.DirectionEnum.EAST]: (coordinates) => ({
        x: coordinates.x + 1, y: coordinates.y,
    }),
    [types_1.DirectionEnum.WEST]: (coordinates) => ({
        x: coordinates.x - 1, y: coordinates.y,
    }),
};
function isLocationValid(location, matrixSize) {
    // x = 0, y = 1
    return (!(location.x > matrixSize.xSize - 1 || location.x < 0) &&
        !(location.y > matrixSize.ySize - 1 || location.y < 0));
}
;
function place(state, coordinates, facing) {
    if (!isLocationValid(coordinates, state.matrixSize)) {
        throw new exceptions_1.InvalidLocationError();
    }
    return {
        location: coordinates,
        facing,
    };
}
exports.place = place;
;
function move(state, currentLocation, currentFacing, direction) {
    if (!state.location) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    const facing = direction || currentFacing;
    const newLocation = moveInDirection[facing](currentLocation);
    console.log("NEW LOCATION", newLocation, facing);
    if (!isLocationValid(newLocation, state.matrixSize)) {
        throw new Error("Invalid coordinates");
    }
    return {
        location: newLocation,
        facing,
    };
}
exports.move = move;
;
