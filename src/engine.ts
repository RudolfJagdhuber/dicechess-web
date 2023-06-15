import { exposeWorker } from "react-hooks-worker";
import { DiceProps } from "./components/Dice/helpers";
import { Move, possibleMoves } from "./components/Dice/helpers";

// const fib = (i: number): number => (i <= 1 ? i : fib(i - 1) + fib(i - 2));

interface WorkerData {
  board: (DiceProps | undefined)[];
  isWhitesMove: boolean;
  currentDepth?: number;
  maxDepth?: number;
}
interface WorkerResult {
  result: Move | undefined;
}

const worker = (data: WorkerData | undefined): WorkerResult => {
  if (!data) return { result: undefined };
  const bestMove = engineCalculation(
    data.board,
    data.isWhitesMove,
    data.currentDepth,
    data.maxDepth
  );
  // console.log("Proposed a move!");
  return { result: bestMove as Move };
};

const engineCalculation = (
  board: (DiceProps | undefined)[],
  isWhitesMove: boolean,
  currentDepth: number = 0,
  maxDepth: number = 2
): Move | number => {
  // Collect all possible moves in the given postion
  const allMoves = allMovesList(board, isWhitesMove);

  // For every resulting position: Either compute an evaluation if at maxDepth,
  // or recurse this function with the new position at currentDepth + 1.
  allMoves.forEach((move, i) => {
    // Compute the new board after this move was made.
    const newBoard = simpleMove(board, move);
    if (currentDepth === maxDepth) {
      // On the maximum depth, we finally evaluate the resulting position.
      move.rating = (isWhitesMove ? 1 : -1) * evaluatePosition(newBoard);
    }
    // Check if its already mate. -> Don't recurse deeper to avoid re-mating.
    else if (
      newBoard.filter((d) => d && d.number === 0 && d.isWhite === !isWhitesMove)
        .length === 0
    ) {
      move.rating = 1000;
    }
    // We are not at maxDepth, so we go deeper before we make an evaluation.
    else {
      const deeperBestRating = engineCalculation(
        newBoard,
        !isWhitesMove,
        currentDepth + 1,
        maxDepth
      );
      // The rating will be the one from the best move of the deeper Ranking.
      move.rating = deeperBestRating as number;
    }
  });
  // Whenever we move up a depth level, the viewpoint changes between black and
  // white. Therefore the score needs to be reversed before every return (* -1).
  // Shortcut if current depth > 0, then only return rating
  if (currentDepth > 0)
    return allMoves
      .map((m) => (m.rating ? -m.rating : 0))
      .sort((a, b) => a - b)[0];

  // Find the single best move.
  const bestMove = allMoves.reduce(function (prev, current) {
    if (!prev.rating || !current.rating) return current;
    return prev.rating > current.rating ? prev : current;
  });
  if (bestMove.rating) bestMove.rating = bestMove.rating * -1;
  return bestMove;
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

const simpleMove = (
  board: (DiceProps | undefined)[],
  move: Move
): (DiceProps | undefined)[] => {
  const newBoard = board.slice();
  const newDice: DiceProps = {
    isWhite: move.dice.isWhite,
    number: move.move.endNumber,
    position: move.move.position,
    orientation: move.move.endOrientation,
  };
  // Remove dice from old position
  newBoard[move.dice.position] = undefined;
  // Place new dice at target position (removes whatever was there before).
  newBoard[move.move.position] = newDice;
  return newBoard;
};

const evaluatePosition = (board: (DiceProps | undefined)[]): number => {
  // Evaluate a given position from whites perspective.
  // The evaluation is a sum of factors that influence the position. As a base
  // measure a dice is valued as 1.
  let evaluation = 0;

  // Is the game already over (ie. only one king left)? Exit with +/- 1000
  const kings = board.filter((d) => d && d.number === 0);
  if (kings.length < 2 && kings[0]) return kings[0].isWhite ? 1000 : -1000;
  if (!kings[0] || !kings[1]) return -7777; // Should never happen

  // Who has more dice left? Add +/- 1 per dice to the evaluation.
  evaluation +=
    board.filter((d) => d && d.isWhite).length -
    board.filter((d) => d && !d.isWhite).length;

  // How many possible moves does each player have? Add +/- 0.1 per move.
  const whiteMoves = allMovesList(board, true);
  const blackMoves = allMovesList(board, false);
  evaluation += (whiteMoves.length - blackMoves.length) * 0.1;

  // If a dice attacks the King, this gives a bonus of +/- 0.4.
  const whiteKingPos = kings[0].isWhite ? kings[0].position : kings[1].position;
  const blackKingPos = kings[0].isWhite ? kings[1].position : kings[0].position;
  const whiteInCheck =
    blackMoves.filter((m) => m.move.position === whiteKingPos).length > 0;
  const blackInCheck =
    whiteMoves.filter((m) => m.move.position === blackKingPos).length > 0;
  evaluation += blackInCheck ? 0.4 : 0;
  evaluation += whiteInCheck ? -0.4 : 0;

  // If a dice guards a possibleMove of the king, this gives a bonus of +/- 0.3.
  const blackKingMoves = blackMoves.filter((m) => m.dice.number === 0);
  blackKingMoves.forEach((km) => {
    if (
      whiteMoves.filter((m) => m.move.position === km.move.position).length > 0
    )
      evaluation += 0.3;
  });
  const whiteKingMoves = whiteMoves.filter((m) => m.dice.number === 0);
  whiteKingMoves.forEach((km) => {
    if (
      blackMoves.filter((m) => m.move.position === km.move.position).length > 0
    )
      evaluation -= 0.3;
  });

  // Maybe alternatively add bonus if a king has a non attacked field to go
  // This avoids being better if only one field to go which is not attacked vs
  // 4 fields to go where one is attacked.

  return evaluation;
};

exposeWorker(worker);
