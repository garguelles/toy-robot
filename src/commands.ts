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
  return (
    (location.x > matrixSize.xSize || location.x < matrixSize.xSize) ||
    (location.y > matrixSize.ySize || location.y < matrixSize.ySize)
  );
};

export function place(state: State, coordinates: Coordinates, facing: DirectionEnum): CommandResult {
  if (isLocationValid(coordinates, state.matrixSize)) {
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
  if (isLocationValid(newLocation, state.matrixSize)) {
    return {
      location: newLocation,
      facing,
    }
  }

  throw new Error("Invalid coordinates")

};

