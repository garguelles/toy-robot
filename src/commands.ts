import { Coordinates, DirectionEnum, Nullable, State, MatrixSize, CommandResult } from "./types";
import { InvalidLocationError, RobotNotPlacedError } from "./exceptions";

const moveInDirection = {
  [DirectionEnum.NORTH]: (coordinates: Coordinates) => ({
    x: coordinates.x, y: coordinates.y + 1,
  }),
  [DirectionEnum.SOUTH]: (coordinates: Coordinates) => ({
    x: coordinates.x, y: coordinates.y - 1,
  }),
  [DirectionEnum.EAST]: (coordinates: Coordinates) => ({
    x: coordinates.x + 1, y: coordinates.y,
  }),
  [DirectionEnum.WEST]: (coordinates: Coordinates) => ({
    x: coordinates.x - 1, y: coordinates.y,
  }),
};

function isLocationValid(location: Coordinates, matrixSize: MatrixSize): boolean {
  // x = 0, y = 1
  return (
    !(location.x > matrixSize.xSize - 1 || location.x < 0) &&
    !(location.y > matrixSize.ySize - 1 || location.y < 0)
  );
};

export function place(state: State, coordinates: Coordinates, facing: DirectionEnum): CommandResult {
  if (!isLocationValid(coordinates, state.matrixSize)) {
    throw new InvalidLocationError();
  }

  return {
    location: coordinates,
    facing,
  };
};

export function move(state: State, currentLocation: Coordinates, currentFacing: DirectionEnum, direction?: Nullable<DirectionEnum>): CommandResult {
  if (!state.location) {
    throw new RobotNotPlacedError();
  }

  const facing = direction || currentFacing;
  const newLocation = moveInDirection[facing](currentLocation);

  if (!isLocationValid(newLocation, state.matrixSize)) {
    throw new InvalidLocationError("You cannot go that way.");
  }

  return {
    location: newLocation,
    facing,
  };
};

