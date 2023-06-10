import { DiceProps } from "./Dice";

type Direction = "top" | "right" | "bottom" | "left";

const DIR_VALUE = { top: -8, right: 1, bottom: 8, left: -1 };

// A move made by a specific dice
interface DiceMove {
  direction: Direction | undefined;
  endNumber: number;
  position: number;
}

// The full move information (including the dice that makes the move)
interface Move {
  dice: DiceProps;
  move: DiceMove;
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
    // DiceMove the dice one square in the direction of dir
    nextDice = {
      number: dice.number, // TODO
      isWhite: dice.isWhite,
      position: dice.position + DIR_VALUE[dir],
    };
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

const engineCalculation = (board: (DiceProps | undefined)[]): Move[] => {
  const bestMoves: Move[] = [];

  const allMoves = allMovesList(board);

  bestMoves.push(allMoves[0]);

  return bestMoves;
};

const allMovesList = (
  board: (DiceProps | undefined)[],
  isWhite: boolean = false
): Move[] => {
  const allMoves: Move[] = board
    .filter((d) => d && d.isWhite === isWhite)
    .flatMap((d) => {
      if (!d) return [];
      return possibleMoves(d, board).map((dicemove) => {
        const move: Move = { dice: d, move: dicemove };
        return move;
      });
    });

  return allMoves;
};

export { possibleMoves, engineCalculation };
export type { DiceMove, Move };
