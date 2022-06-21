"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turn = exports.move = exports.place = void 0;
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
const turnDirection = {
    [types_1.DirectionEnum.NORTH]: {
        [types_1.TurnEnum.LEFT]: types_1.DirectionEnum.WEST,
        [types_1.TurnEnum.RIGHT]: types_1.DirectionEnum.EAST,
    },
    [types_1.DirectionEnum.SOUTH]: {
        [types_1.TurnEnum.LEFT]: types_1.DirectionEnum.EAST,
        [types_1.TurnEnum.RIGHT]: types_1.DirectionEnum.WEST,
    },
    [types_1.DirectionEnum.EAST]: {
        [types_1.TurnEnum.LEFT]: types_1.DirectionEnum.NORTH,
        [types_1.TurnEnum.RIGHT]: types_1.DirectionEnum.SOUTH,
    },
    [types_1.DirectionEnum.WEST]: {
        [types_1.TurnEnum.LEFT]: types_1.DirectionEnum.SOUTH,
        [types_1.TurnEnum.RIGHT]: types_1.DirectionEnum.NORTH,
    },
};
function isLocationValid(location, matrixSize) {
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
function move(state, currentLocation, currentFacing) {
    if (!state.location) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    const newLocation = moveInDirection[currentFacing](currentLocation);
    if (!isLocationValid(newLocation, state.matrixSize)) {
        throw new exceptions_1.InvalidLocationError("You cannot go that way.");
    }
    return {
        location: newLocation,
        facing: currentFacing, // TODO: can remove this here;
    };
}
exports.move = move;
;
function turn(state, turn) {
    return turnDirection[state.facing][turn];
}
exports.turn = turn;
