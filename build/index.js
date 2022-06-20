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
const matrix = (0, matrix_1.createMatrix)(state.matrixSize);
const executeCommand = (command) => {
    switch (command.action) {
        case types_1.CommandEnum.PLACE:
            const placeResult = (0, commands_1.place)(state, command.payload?.location, command?.payload?.facing);
            state = { ...state, ...placeResult };
            break;
        case types_1.CommandEnum.MOVE:
            const moveResult = (0, commands_1.move)(state, command.payload.location, command.payload.facing, command.payload.direction);
            state = { ...state, ...moveResult };
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
    .add((0, bandersnatch_1.command)(types_1.CommandEnum.REPORT)
    .action(async () => {
    console.log("REPORT -- ", state);
}))
    .add((0, bandersnatch_1.command)(types_1.DirectionEnum.NORTH)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.MOVE,
        payload: {
            location: state.location,
            facing: state.facing,
            direction: types_1.DirectionEnum.NORTH,
        }
    });
}))
    .add((0, bandersnatch_1.command)(types_1.DirectionEnum.SOUTH)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.MOVE,
        payload: {
            location: state.location,
            facing: state.facing,
            direction: types_1.DirectionEnum.SOUTH,
        }
    });
}))
    .add((0, bandersnatch_1.command)(types_1.DirectionEnum.EAST)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.MOVE,
        payload: {
            location: state.location,
            facing: state.facing,
            direction: types_1.DirectionEnum.EAST,
        }
    });
})).add((0, bandersnatch_1.command)(types_1.DirectionEnum.WEST)
    .action(async () => {
    if (!state.location || !state.facing) {
        throw new exceptions_1.RobotNotPlacedError();
    }
    executeCommand({
        action: types_1.CommandEnum.MOVE,
        payload: {
            location: state.location,
            facing: state.facing,
            direction: types_1.DirectionEnum.WEST,
        }
    });
}));
toyRobot.repl().catch(error => console.error("[Failed]", error.message));
