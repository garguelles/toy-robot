"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bandersnatch_1 = require("bandersnatch");
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
const toyRobot = (0, bandersnatch_1.program)()
    .add((0, bandersnatch_1.command)("PLACE")
    .option("x", { default: 0 })
    .option("y", { default: 0 })
    .option("f", { default: types_1.DirectionEnum.NORTH })
    .action(async (args) => {
    console.log("PLACE ARGS -- ", args);
}))
    .add((0, bandersnatch_1.command)("MOVE")
    .action(async (args) => {
    console.log("MOVE  -- ", args);
}));
toyRobot.repl();
