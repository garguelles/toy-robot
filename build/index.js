"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repl_1 = __importDefault(require("repl"));
const commands_1 = require("./src/commands");
const matrix_1 = require("./src/matrix");
const types_1 = require("./src/types");
const initialState = {
    matrixSize: { xSize: 5, ySize: 5 },
    location: null,
    facing: null,
};
let state = initialState;
const matrix = (0, matrix_1.createMatrix)(state.matrixSize);
const executeCommand = (command) => {
    switch (command.action) {
        case types_1.CommandEnum.PLACE:
            const placeResult = (0, commands_1.place)(command.payload?.location, command?.payload?.facing);
            state = { ...state, ...placeResult };
            break;
        case types_1.CommandEnum.MOVE:
            const moveResult = (0, commands_1.move)(command.payload?.location, command.payload.facing);
            state = { ...state, ...moveResult };
            break;
        case types_1.DirectionEnum.NORTH:
        case types_1.DirectionEnum.SOUTH:
        case types_1.DirectionEnum.EAST:
        case types_1.DirectionEnum.WEST:
            const directionResult = (0, commands_1.move)(command.payload.location, command.payload.facing, command.payload.direction);
            state = { ...state, ...directionResult };
            break;
        default:
            throw new Error("Invalid command");
    }
};
const r = repl_1.default.start("ToyRobot =>");
// attach the state in repl's context and set to read only
Object.defineProperty(r.context, "state", {
    configurable: false,
    enumerable: true,
    value: state,
});
