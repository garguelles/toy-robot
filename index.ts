import { program, command } from "bandersnatch";
import { place, move } from "./src/commands";
import { RobotNotPlacedError } from "./src/exceptions";
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
      const placeResult = place(state, command.payload?.location, command?.payload?.facing);
      state = { ...state, ...placeResult };
      break;
    case CommandEnum.MOVE:
      const moveResult = move(
        state,
        command.payload.location,
        command.payload.facing,
        command.payload.direction,
      );
      state = { ...state, ...moveResult };
      break;
    default:
      throw new Error("Invalid command");
  }
};


const toyRobot = program()
  .add(
    command(CommandEnum.PLACE)
      .option("x", { default: 0 })
      .option("y", { default: 0 })
      .option("f", {
        default: DirectionEnum.NORTH,
        choices: [DirectionEnum.NORTH, DirectionEnum.SOUTH, DirectionEnum.EAST, DirectionEnum.WEST],
      })
      .action(async (args) => {
        executeCommand({
          action: CommandEnum.PLACE,
          payload: {
            location: { x: args.x, y: args.y },
            facing: args.f as DirectionEnum,
          }
        });
      }),
  )
  .add(
    command(CommandEnum.MOVE)
      .action(async (args) => {
        if (!state.location) {
          throw new RobotNotPlacedError();
        }
        console.log("MOVE  -- ", args);
      })
  )
  .add(
    command(CommandEnum.REPORT)
      .action(async () => {
        console.log("REPORT -- ", state);
      })
  )
  .add(
    command(DirectionEnum.NORTH)
      .action(async (args) => {
        console.log("MOVING NORTH -- ", args);
      })
  )
  .add(
    command(DirectionEnum.SOUTH)
      .action(async (args) => {
        console.log("MOVING SOUTH -- ", args);
      })
  )
  .add(
    command(DirectionEnum.EAST)
      .action(async (args) => {
        console.log("MOVING EAST  -- ", args);
      })
  ).add(
    command(DirectionEnum.WEST)
      .action(async (args) => {
        console.log("MOVING WEST -- ", args);
      })
  );

toyRobot.repl().catch(error => console.error("[Failed]", error.message));

