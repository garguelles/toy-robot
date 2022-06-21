const {place, move} = require("../src/commands");
const {DirectionEnum} = require("../src/types");
const {InvalidLocationError} = require("../src/exceptions");

const MATRIX_SIZE = { xSize: 5, ySize: 5 };

test("can place the robot", () => {
  const state = {
    location: null,
    facing: null,
    matrixSize: MATRIX_SIZE,
  };
  const coordinates = { x: 1, y: 0 };
  const facing = DirectionEnum.NORTH;
  const expected = {
    location: coordinates,
    facing,
  };

  expect(place(state, coordinates, facing)).toEqual(expected);
});

test("cannot place the robot outside the table", () => {
  const state = {
    location: null,
    facing: null,
    matrixSize: MATRIX_SIZE,
  };
  const coordinates = { x: 1, y: 6 };
  const facing = DirectionEnum.NORTH;
  const expected = {
    location: coordinates,
    facing,
  };

  expect(() => place(state, coordinates, facing)).toThrow(InvalidLocationError);
});

test("can move a robot", () => {
  const state = {
    location: { x: 0, y: 0},
    facing: DirectionEnum.NORTH,
    matrixSize: MATRIX_SIZE,
  };

  const expected = {
    location: { x: 0, y: 1 },
    facing: DirectionEnum.NORTH,
  };

  expect(move(state, state.location, state.facing)).toEqual(expected);
});

test("ensure robot does not fall of the edge", () => {
  const state = {
    location: { x: 4, y: 0},
    facing: DirectionEnum.EAST,
    matrixSize: MATRIX_SIZE,
  };

  expect(() => move(state, state.location, state.facing)).toThrow(InvalidLocationError);
});

