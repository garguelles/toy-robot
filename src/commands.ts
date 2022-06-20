import { Coordinates, DirectionEnum, CommandPayload, Nullable } from "./types";

export function place(coordinates: Coordinates, facing: DirectionEnum): CommandPayload {
  return { location: { x: 0, y: 1 }, facing: DirectionEnum.NORTH };
};

export function move(currentLocation: Coordinates, currentFacing: DirectionEnum, direction?: Nullable<DirectionEnum>): CommandPayload {
  return { location: { x: 0, y: 0 }, facing: DirectionEnum.SOUTH };
};
