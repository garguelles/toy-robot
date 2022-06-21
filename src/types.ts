export enum DirectionEnum {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
};

export enum TurnEnum {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum CommandEnum {
  PLACE = "PLACE",
  MOVE = "MOVE",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  REPORT = "REPORT"
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

export interface CommandResult {
  location: Coordinates;
  facing: DirectionEnum;
}

export interface CommandPayload {
  location: Coordinates;
  facing: DirectionEnum;
  turnDirection?: DirectionEnum;
};

export interface Command {
  action: CommandEnum;
  payload?: CommandPayload;
};

export interface State {
  matrixSize: MatrixSize,
  location: Nullable<Coordinates>;
  facing: Nullable<DirectionEnum>;
};
