import { createRef, RefObject, useEffect, useRef, useState } from "react";
import "./Board.css";
import Square from "../Square/Square";
import { DiceProps } from "../Dice/Dice";
import {
  possibleMoves,
  DiceMove,
  Move,
  engineCalculation,
} from "../Dice/helpers";
import Player from "../Player/Player";

const makeDice = (
  number: number,
  pos: number,
  isWhite: boolean = false
): DiceProps => {
  return {
    number: number,
    isWhite: isWhite,
    // orientation: { top: 1, right: 2, bottom: 3, left: 4, opposing: 5 },
    position: pos,
  };
};

const boardX = Array<DiceProps | undefined>(64).fill(undefined);
boardX[0] = makeDice(2, 0);
boardX[1] = makeDice(3, 1);
boardX[2] = makeDice(2, 2);
boardX[3] = makeDice(1, 3);
boardX[4] = makeDice(0, 4);
boardX[5] = makeDice(1, 5);
boardX[6] = makeDice(3, 6);
boardX[7] = makeDice(2, 7);
boardX[56] = makeDice(2, 56, true);
boardX[57] = makeDice(3, 57, true);
boardX[58] = makeDice(2, 58, true);
boardX[59] = makeDice(1, 59, true);
boardX[60] = makeDice(0, 60, true);
boardX[61] = makeDice(1, 61, true);
boardX[62] = makeDice(3, 62, true);
boardX[63] = makeDice(2, 63, true);

let isWhitesMove = true;
let possibleMoveList: DiceMove[] = [];

const Board = () => {
  const [board, setBoard] = useState<Array<DiceProps | undefined>>(boardX);
  const [highlightedSquares, setHighlightedSquares] = useState<number[]>([]);
  const diceRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    // initialize the array of refs
    diceRefs.current = Array(64)
      .fill(null)
      .map(() => createRef<HTMLDivElement>());
  }, []);

  const updateBoard = (move: Move) => {
    setBoard((d) => {
      const oldPosition = move.dice.position;
      move.dice.position = move.move.position;
      move.dice.number = move.move.endNumber;
      return d.map((dx, i) => {
        if (i === oldPosition) return undefined;
        if (i === move.move.position) return move.dice;
        return dx;
      });
    });
  };

  const moveDice = (dice: DiceProps, to: number): boolean => {
    // Find from the list of possible moves
    let move = possibleMoveList.filter((m) => m.position === to)[0];
    if (!move) return false;
    // Check if its the players turn
    if (isWhitesMove !== dice.isWhite) return false;
    // Make the move
    updateBoard({ dice: dice, move: move });
    possibleMoveList = [];
    isWhitesMove = !isWhitesMove;
    return true;
  };

  // Highlight moves of a dice, or reset highlighting if undefined.
  const highlightMoves = (dice: DiceProps | undefined) => {
    if (!dice) {
      // Avoid rerender while opponent thinks
      if (isWhitesMove) setHighlightedSquares([]);
      return;
    }
    if (isWhitesMove !== dice.isWhite) return;
    possibleMoveList = possibleMoves(dice, board);
    setHighlightedSquares(possibleMoveList.map((m) => m.position));
    console.log(possibleMoveList);
  };

  const engine = async () => {
    // Compute the best move
    const bestMoves = await new Promise<Move[]>((resolve) => {
      setTimeout(() => {
        resolve(engineCalculation(board));
      }, 500);
    });
    const move = bestMoves[0];

    // Animate the Move
    const diceDiv = diceRefs.current[move.dice.position].current;
    if (!diceDiv) return;
    const handleMoveAnimationEnd = () => {
      diceDiv.removeEventListener("transitionend", handleMoveAnimationEnd);
      // Perform the move
      updateBoard(move);
      isWhitesMove = !isWhitesMove;
      console.log("Transition completed");
    };
    const translateString = translatePxFromMove(
      move,
      diceDiv.getBoundingClientRect().height / 0.7
    );
    diceDiv.addEventListener("transitionend", handleMoveAnimationEnd);
    diceDiv.style.transition = "transform 0.3s";
    diceDiv.style.zIndex = "2";
    diceDiv.style.transform = `translate(${translateString})`;
  };

  const translatePxFromMove = (move: Move, size: number): string => {
    const from = move.dice.position;
    const to = move.move.position;
    const yPx = (~~(to / 8) - ~~(from / 8)) * size;
    const xPx = ((to % 8) - (from % 8)) * size;
    return `${xPx}px, ${yPx}px`;
  };

  console.log("Rendered. WhiteToMove = " + isWhitesMove);
  if (!isWhitesMove) {
    engine();
  }

  return (
    <div id="board-layout">
      <Player isPlayer={false} isToMove={!isWhitesMove} />
      <div id="board">
        {board.map((square, i) => (
          <Square
            key={i}
            index={i}
            isWhite={i % 2 === ~~(i / 8) % 2}
            dice={square}
            highlight={highlightedSquares.includes(i)}
            moveFn={moveDice}
            highlightFn={highlightMoves}
            diceRef={diceRefs.current[i]}
          />
        ))}
      </div>
      <Player isPlayer={true} isToMove={isWhitesMove} />
    </div>
  );
};

export default Board;
