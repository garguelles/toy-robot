import { place } from "./src/commands";
import { createMatrix } from "./src/matrix";
import { State, Command, CommandEnum } from "./src/types";

const initialState: State = {
  matrixSize: { xSize: 5, ySize: 5 },
  location: null,
  facing: null,
};

let state = initialState;
const matrix = createMatrix(state.matrixSize);

const executeCommand = (command: Command<any>) => {
  switch (command.action) {
    case CommandEnum.PLACE:
      place(command.payload.coordinates, command.payload.facing);
      break;
    default:
      throw new Error("Invalid command");
  }
};


