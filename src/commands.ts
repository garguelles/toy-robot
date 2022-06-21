import { Coordinates, DirectionEnum, State, MatrixSize, CommandResult, TurnEnum } from "./types";
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

const turnDirection = {
  [DirectionEnum.NORTH]: {
    [TurnEnum.LEFT]: DirectionEnum.WEST,
    [TurnEnum.RIGHT]: DirectionEnum.EAST,
  },
  [DirectionEnum.SOUTH]: {
    [TurnEnum.LEFT]: DirectionEnum.EAST,
    [TurnEnum.RIGHT]: DirectionEnum.WEST,
  },
  [DirectionEnum.EAST]: {
    [TurnEnum.LEFT]: DirectionEnum.NORTH,
    [TurnEnum.RIGHT]: DirectionEnum.SOUTH,
  },
  [DirectionEnum.WEST]: {
    [TurnEnum.LEFT]: DirectionEnum.SOUTH,
    [TurnEnum.RIGHT]: DirectionEnum.NORTH,
  },

}

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

export function move(state: State, currentLocation: Coordinates, currentFacing: DirectionEnum,): CommandResult {
  if (!state.location) {
    throw new RobotNotPlacedError();
  }

  const newLocation = moveInDirection[currentFacing](currentLocation);

  if (!isLocationValid(newLocation, state.matrixSize)) {
    throw new InvalidLocationError("You cannot go that way.");
  }

  return {
    location: newLocation,
    facing: currentFacing, // TODO: can remove this here;
  };
};

export function turn(state: State, turn: TurnEnum): DirectionEnum {
  return turnDirection[state.facing!][turn];
}
