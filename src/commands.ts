import { Coordinates, DirectionEnum, Nullable } from "./types";

export function place(coordinates: Coordinates, facing: DirectionEnum): Coordinates {
  return { x: 0, y: 1 }
};

export function move(location: Coordinates, facing: Nullable<DirectionEnum>): Coordinates {
  return { x: 0, y: 0 };
};
