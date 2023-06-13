interface DiceOrientation {
  top: number;
  right: number;
  bottom: number;
  left: number;
  opposing: number;
}
interface DiceProps {
  number: number;
  orientation: DiceOrientation;
  position: number;
  isWhite: boolean;
}

const makeDice = (
  number: number,
  leftSideNumber: number,
  position: number,
  isWhite: boolean
): DiceProps => {
  return {
    number: number,
    orientation: getOrientation(number, leftSideNumber),
    position: position,
    isWhite: isWhite,
  };
};

const getOrientation = (
  number: number,
  leftSideNumber: number
): DiceOrientation => {
  const arrayToOrientation = (arr: number[]): DiceOrientation => {
    return {
      top: arr[0],
      right: arr[1],
      bottom: arr[2],
      left: arr[3],
      opposing: arr[4],
    };
  };

  switch (number) {
    case -1:
      return arrayToOrientation(Array(5).fill(-1));
    case 0:
      return arrayToOrientation(Array(5).fill(0));
    case 1:
      switch (leftSideNumber) {
        case 2:
          return arrayToOrientation([4, 5, 3, 2, 6]);
        case 3:
          return arrayToOrientation([2, 4, 5, 3, 6]);
        case 5:
          return arrayToOrientation([3, 2, 4, 5, 6]);
        case 4:
          return arrayToOrientation([5, 3, 2, 4, 6]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    case 2:
      switch (leftSideNumber) {
        case 1:
          return arrayToOrientation([3, 6, 4, 1, 5]);
        case 4:
          return arrayToOrientation([1, 3, 6, 4, 5]);
        case 6:
          return arrayToOrientation([4, 1, 3, 6, 5]);
        case 3:
          return arrayToOrientation([6, 4, 1, 3, 5]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    case 3:
      switch (leftSideNumber) {
        case 1:
          return arrayToOrientation([5, 6, 2, 1, 4]);
        case 2:
          return arrayToOrientation([1, 5, 6, 2, 4]);
        case 6:
          return arrayToOrientation([2, 1, 5, 6, 4]);
        case 5:
          return arrayToOrientation([6, 2, 1, 5, 4]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    case 4:
      switch (leftSideNumber) {
        case 1:
          return arrayToOrientation([2, 6, 5, 1, 3]);
        case 5:
          return arrayToOrientation([1, 2, 6, 5, 3]);
        case 6:
          return arrayToOrientation([5, 1, 2, 6, 3]);
        case 2:
          return arrayToOrientation([6, 5, 1, 2, 3]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    case 5:
      switch (leftSideNumber) {
        case 1:
          return arrayToOrientation([4, 6, 3, 1, 2]);
        case 3:
          return arrayToOrientation([1, 4, 6, 3, 2]);
        case 6:
          return arrayToOrientation([3, 1, 4, 6, 2]);
        case 4:
          return arrayToOrientation([6, 3, 1, 4, 2]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    case 6:
      switch (leftSideNumber) {
        case 2:
          return arrayToOrientation([3, 5, 4, 2, 1]);
        case 4:
          return arrayToOrientation([2, 3, 5, 4, 1]);
        case 5:
          return arrayToOrientation([4, 2, 3, 5, 1]);
        case 3:
          return arrayToOrientation([5, 4, 2, 3, 1]);
        default:
          return arrayToOrientation(Array(5).fill(-1));
      }
    default:
      return arrayToOrientation(Array(5).fill(-1));
  }
};

const moveDice = (dice: DiceProps, direction: Direction): DiceProps => {
  const newNumber =
    direction === "top"
      ? dice.orientation.bottom
      : direction === "right"
      ? dice.orientation.left
      : direction === "bottom"
      ? dice.orientation.top
      : direction === "left"
      ? dice.orientation.right
      : 0;
  const newLeftSideNumber =
    direction === "top" || direction === "bottom"
      ? dice.orientation.left
      : direction === "right"
      ? dice.orientation.opposing
      : direction === "left"
      ? dice.number
      : 0;
  const newPosition = dice.position + DIR_VALUE[direction];
  return makeDice(newNumber, newLeftSideNumber, newPosition, dice.isWhite);
};

type Direction = "top" | "right" | "bottom" | "left";

const DIR_VALUE = { top: -8, right: 1, bottom: 8, left: -1 };

// A move made by a specific dice
interface DiceMove {
  direction: Direction | undefined;
  endNumber: number;
  endOrientation: DiceOrientation;
  position: number;
}

// The full move information (including the dice that makes the move)
interface Move {
  dice: DiceProps;
  move: DiceMove;
  rating?: number;
}

const recursiveMoveList = (
  dice: DiceProps,
  dirs: Direction[],
  stepsLeft: number,
  startDir: Direction | undefined,
  board: Array<DiceProps | undefined>,
  moveList: DiceMove[]
) => {
  // Return if the dice moved off the board.
  if (dice.position < 0 || dice.position > 63) return moveList;
  // Also
  if (stepsLeft === 0) {
    // Final square reached. Check if an own dice is already here
    const diceOnField = board[dice.position];
    if (diceOnField && diceOnField.isWhite === dice.isWhite) return moveList;
    // A possible move was found. Add it to the list.
    moveList.push({
      direction: startDir,
      endNumber: dice.number,
      endOrientation: dice.orientation,
      position: dice.position,
    });
    return moveList;
  }
  // Continue Recursively as long as there are moves left to make
  // Return if there is a dice in the way (that is not us).
  if (board[dice.position] && startDir) return moveList;
  // Filter directions that would go horizontally off the board next
  if (dice.position % 8 === 0) dirs = dirs.filter((x) => x !== "left");
  if (dice.position % 8 === 7) dirs = dirs.filter((x) => x !== "right");
  // Make a copy of the current dice, that is moved around in the following.
  let nextDice: DiceProps;
  let nextDirs: Direction[];
  for (let dir of dirs) {
    // If its the first move, set the starting direction
    const nextStartDir = startDir ?? dir;
    // Move the dice one square in the direction of dir
    nextDice = moveDice(dice, dir);
    // Update what directions are now still possible.
    nextDirs = dirs;
    // No move in the opposite direction is possible anymore
    if (dir === "top") nextDirs = nextDirs.filter((x) => x !== "bottom");
    else if (dir === "bottom") nextDirs = nextDirs.filter((x) => x !== "top");
    else if (dir === "left") nextDirs = nextDirs.filter((x) => x !== "right");
    else if (dir === "right") nextDirs = nextDirs.filter((x) => x !== "left");
    // If a direction change was made, only the current direction remains
    if (nextStartDir !== dir) nextDirs = nextDirs.filter((x) => x === dir);

    // Go to the next level of recursion with the new setup
    moveList = recursiveMoveList(
      nextDice,
      nextDirs,
      stepsLeft - 1,
      nextStartDir,
      board,
      moveList
    );
  }
  return moveList;
};

const possibleMoves = (
  dice: DiceProps,
  board: Array<DiceProps | undefined>
) => {
  return recursiveMoveList(
    dice,
    ["top", "right", "bottom", "left"],
    dice.number === 0 ? 1 : dice.number,
    undefined,
    board,
    []
  );
};

export { makeDice, possibleMoves };
export type { DiceMove, DiceProps, Move };
