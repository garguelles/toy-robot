"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bandersnatch_1 = require("bandersnatch");
const commands_1 = require("./src/commands");
const exceptions_1 = require("./src/exceptions");
const matrix_1 = require("./src/matrix");
const types_1 = require("./src/types");
const initialState = {
    matrixSize: { xSize: 5, ySize: 5 },
    location: null,
    facing: null,
};
let state = initialState;
const executeCommand = (command) => {
    switch (command.action) {
        case types_1.CommandEnum.PLACE:
            const placeResult = (0, commands_1.place)(state, command.payload?.location, command?.payload?.facing);
            state = { ...state, ...placeResult };
            break;
        case types_1.CommandEnum.MOVE:
            const moveResult = (0, commands_1.move)(state, command.payload.location, command.payload.facing);
            state = { ...state, ...moveResult };
            break;
        case types_1.CommandEnum.LEFT:
            state = { ...state, facing: (0, commands_1.turn)(state, types_1.TurnEnum.LEFT) };
            break;
        case types_1.CommandEnum.RIGHT:
            state = { ...state, facing: (0, commands_1.turn)(state, types_1.TurnEnum.RIGHT) };
            break;
        default:
            throw new Error("Invalid command");
    }
};
const toyRobot = (0, bandersnatch_1.program)()
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.PLACE)
    .option("x", { default: 0 })
    .option("y", { default: 0 })
    .option("f", {
    default: types_1.DirectionEnum.NORTH,
    choices: [types_1.DirectionEnum.NORTH, types_1.DirectionEnum.SOUTH, types_1.DirectionEnum.EAST, types_1.DirectionEnum.WEST],
})
    .action(async (args) => {
    executeCommand({
        action: types_1.CommandEnum.PLACE,
        payload: {
            location: { x: args.x, y: args.y },
            facing: args.f,
        }
    });
}))
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.MOVE)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.MOVE,
        payload: {
            location: state.location,
            facing: state.facing,
        }
    });
}))
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.LEFT)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.LEFT,
    });
}))
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.RIGHT)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.RIGHT,
    });
}))
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.REPORT)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    const { location, facing } = state;
    const matrix = (0, matrix_1.createMatrix)(state.matrixSize);
    matrix[(state.matrixSize.ySize - 1) - location.y][location.x] = "o";
    console.log(`OUTPUT: ${location.x}, ${location.y}, ${facing}`);
    console.log(matrix);
}));
toyRobot.repl().catch(error => console.error("[Failed]", error.message));
