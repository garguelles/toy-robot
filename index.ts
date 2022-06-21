import { program, command } from "bandersnatch";
import { place, move, turn } from "./src/commands";
import { RobotNotPlacedError } from "./src/exceptions";
import { createMatrix } from "./src/matrix";
import { State, Command, CommandEnum, DirectionEnum, TurnEnum } from "./src/types";

const initialState: State = {
  matrixSize: { xSize: 5, ySize: 5 },
  location: null,
  facing: null,
};

let state = initialState;

const executeCommand = (command: Command) => {
  switch (command.action) {
    case CommandEnum.PLACE:
      const placeResult = place(state, command.payload?.location!, command?.payload?.facing!);
      state = { ...state, ...placeResult };
      break;
    case CommandEnum.MOVE:
      const moveResult = move(
        state,
        command.payload!.location!,
        command.payload!.facing!,
      );
      state = { ...state, ...moveResult };
      break;
    case CommandEnum.LEFT:
      state = { ...state, facing: turn(state, TurnEnum.LEFT) };
      break;
    case CommandEnum.RIGHT:
      state = { ...state, facing: turn(state, TurnEnum.RIGHT) };
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
      .action(async () => {
        if (!state.location || !state.facing) {
          throw new RobotNotPlacedError();
        }
        executeCommand({
          action: CommandEnum.MOVE,
          payload: {
            location: state.location,
            facing: state.facing,
          }
        });
      })
  )
  .add(
    command(CommandEnum.LEFT)
      .action(async () => {
        if (!state.location || !state.facing) {
          throw new RobotNotPlacedError();
        }
        executeCommand({
          action: CommandEnum.LEFT,
        });
      })
  )
  .add(
    command(CommandEnum.RIGHT)
      .action(async () => {
        if (!state.location || !state.facing) {
          throw new RobotNotPlacedError();
        }
        executeCommand({
          action: CommandEnum.RIGHT,
        })
      })

  )
  .add(
    command(CommandEnum.REPORT)
      .action(async () => {
        if (!state.location || !state.facing) {
          throw new RobotNotPlacedError();
        }

        const { location, facing } = state;
        const matrix = createMatrix(state.matrixSize);
        matrix[(state.matrixSize.ySize - 1) - location.y][location.x] = "o";

        console.log(`OUTPUT: ${location.x}, ${location.y}, ${facing}`)
        console.log(matrix);
      })
  );

toyRobot.repl().catch(error => console.error("[Failed]", error.message));

