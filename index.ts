import { program, command } from "bandersnatch";
import { place, move } from "./src/commands";
import { createMatrix } from "./src/matrix";
import { State, Command, CommandEnum, DirectionEnum } from "./src/types";

const initialState: State = {
  matrixSize: { xSize: 5, ySize: 5 },
  location: null,
  facing: null,
};

let state = initialState;
const matrix = createMatrix(state.matrixSize);

const executeCommand = (command: Command) => {
  switch (command.action) {
    case CommandEnum.PLACE:
      const placeResult = place(command.payload?.location, command?.payload?.facing);
      state = { ...state, ...placeResult };
      break;
    case CommandEnum.MOVE:
      const moveResult = move(
        command.payload?.location,
        command.payload.facing
      );
      state = { ...state, ...moveResult };
      break;
    case DirectionEnum.NORTH:
    case DirectionEnum.SOUTH:
    case DirectionEnum.EAST:
    case DirectionEnum.WEST:
      const directionResult = move(
        command.payload.location,
        command.payload.facing,
        command.payload.direction,
      );
      state = { ...state, ...directionResult };
      break;
    default:
      throw new Error("Invalid command");
  }
};


const toyRobot = program()
  .add(
    command("PLACE")
      .option("x", { default: 0 })
      .option("y", { default: 0 })
      .option("f", { default: DirectionEnum.NORTH })
      .action(async (args) => {
        console.log("PLACE ARGS -- ", args)
      })
  )
  .add(
    command("MOVE")
      .action(async (args) => {
        console.log("MOVE  -- ", args)
      })
  );

toyRobot.repl();

