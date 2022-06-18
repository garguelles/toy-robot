export enum DirectionEnum {
  NORTH,
  SOUTH,
  EAST,
  WEST,
};

export type Nullable<T = any> = T | null;

export interface MatrixSize {
  xSize: number;
  ySize: number;
}

export interface Coordinates {
  x: number;
  y: number;
};

export interface State {
  matrixSize: MatrixSize,
  location: Nullable<Coordinates>;
  facing: Nullable<DirectionEnum>;
};
