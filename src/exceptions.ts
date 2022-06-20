class InvalidLocationError extends Error {
  constructor(message = "Invalid location.") {
    super(message);
    this.name = "InvalidLocationError";
  }
};

class RobotNotPlacedError extends Error {
  constructor(message = "Robot is not yet placed.") {
    super(message);
    this.name = "InvalidLocationError";
  }
}

export {
  InvalidLocationError,
  RobotNotPlacedError,
};
