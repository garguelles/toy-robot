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

export type Nullable<T = any> = T | null | undefined;

export interface MatrixSize {
  xSize: number;
  ySize: number;
};

export interface Coordinates {
  x: number;
  y: number;
};

export interface CommandPayload {
  location: Coordinates;
  facing: DirectionEnum;
  direction?: DirectionEnum;
};

export interface Command {
  action: CommandEnum & DirectionEnum;
  payload: CommandPayload;
};

export interface State {
  matrixSize: MatrixSize,
  location: Nullable<Coordinates>;
  facing: Nullable<DirectionEnum>;
};
