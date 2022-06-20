export enum DirectionEnum {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
};

export enum CommandEnum {
  PLACE = "PLACE",
  MOVE = "MOVE",
};

export type CommandPayload<T> = T;

export type Nullable<T = any> = T | null;

export interface MatrixSize {
  xSize: number;
  ySize: number;
};

export interface Coordinates {
  x: number;
  y: number;
};

export interface Command<T> {
  action: CommandEnum & DirectionEnum;
  payload: Nullable<CommandPayload<T>>;
}

export interface State {
  matrixSize: MatrixSize,
  location: Nullable<Coordinates>;
  facing: Nullable<DirectionEnum>;
};

export interface IPlacePayload {
  coordinates: Coordinates,
  facing: DirectionEnum,
}

