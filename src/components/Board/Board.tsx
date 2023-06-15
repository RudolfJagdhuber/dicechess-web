import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useWorker } from "react-hooks-worker";
import "./Board.css";
import Square from "../Square/Square";
import { DiceProps, makeDice } from "../Dice/helpers";
import { possibleMoves, DiceMove, Move } from "../Dice/helpers";
import Player, { PlayerProps } from "../Player/Player";
import GameEndModal from "../GameEndModal/GameEndModal";
import Sidebar from "../Sidebar/Sidebar";

interface WorkerResult {
  result: Move | undefined;
}

const createWorker = () => new Worker(new URL("../../engine", import.meta.url));

const boardX = Array<DiceProps | undefined>(64).fill(undefined);
boardX[0] = makeDice(2, 1, 0, false);
boardX[1] = makeDice(3, 1, 1, false);
boardX[2] = makeDice(2, 1, 2, false);
boardX[3] = makeDice(1, 4, 3, false);
boardX[4] = makeDice(0, 0, 4, false);
boardX[5] = makeDice(1, 4, 5, false);
boardX[6] = makeDice(3, 1, 6, false);
boardX[7] = makeDice(2, 1, 7, false);
boardX[56] = makeDice(2, 1, 56, true);
boardX[57] = makeDice(3, 1, 57, true);
boardX[58] = makeDice(2, 1, 58, true);
boardX[59] = makeDice(1, 4, 59, true);
boardX[60] = makeDice(0, 0, 60, true);
boardX[61] = makeDice(1, 4, 61, true);
boardX[62] = makeDice(3, 1, 62, true);
boardX[63] = makeDice(2, 1, 63, true);

// Array(2): [whitePlayer, blackPlayer]
const players: PlayerProps[] = [
  { name: "Player", avatarAsset: "assets/images/user.svg", isEngine: false },
  { name: "Computer", avatarAsset: "assets/images/engine.svg", isEngine: true },
];

let isWhitesMove = true;
let possibleMoveList: DiceMove[] = [];

const Board = () => {
  const [board, setBoard] = useState<Array<DiceProps | undefined>>(boardX);
  const [previewSquares, setPreviewSquares] = useState<number[][]>(
    Array(64).fill([])
  );
  const [gameEndVisible, setGameEndVisible] = useState(false);
  const [gameResult, setGameResult] = useState<number | undefined>(undefined);
  const diceRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    // initialize the array of refs
    diceRefs.current = Array(64)
      .fill(null)
      .map(() => createRef<HTMLDivElement>());
  }, []);

  const newGame = () => {
    isWhitesMove = true;
    possibleMoveList = [];
    setBoard(boardX);
    setGameResult(undefined);
  };

  const resign = () => {
    setGameResult(-1);
    setTimeout(() => setGameEndVisible(true), 500);
  };

  const updateBoard = (move: Move) => {
    // Check Game End
    const beatDice = board[move.move.position];
    if (beatDice && beatDice.number === 0) {
      setGameResult(beatDice.isWhite ? -1 : 1);
      setTimeout(() => setGameEndVisible(true), 500);
    }
    setBoard((d) => {
      const newDice: DiceProps = {
        number: move.move.endNumber,
        orientation: move.move.endOrientation,
        isWhite: move.dice.isWhite,
        position: move.move.position,
      };
      return d.map((dx, i) => {
        if (i === move.dice.position) return undefined;
        if (i === move.move.position) return newDice;
        return dx;
      });
    });
  };

  // The caller does not have the explicit move, but only the position that the
  // dice was dropped at. If two moves are possible at a field, it is split in
  // two halves. We indicate that it was dropped on the second half by making
  // the 'to' variable negative. Ie to = -7 => Second possible move to field 7.
  const moveDice = (dice: DiceProps, to: number): boolean => {
    // Find from the list of possible moves
    const movesTo = possibleMoveList.filter((m) => m.position === Math.abs(to));
    const move = movesTo[movesTo.length === 1 || to > 0 ? 0 : 1];
    if (!move) return false;
    // Check if its the players turn, or game ended already
    if (isWhitesMove !== dice.isWhite || gameResult) return false;
    // Make the move
    updateBoard({ dice: dice, move: move });
    possibleMoveList = [];
    isWhitesMove = !isWhitesMove;
    return true;
  };

  // set preview squares to display from moves of a dice. reset if undefined.
  // To indicate the dice is black we add 0.1 to the preview.
  const highlightMoves = (dice: DiceProps | undefined) => {
    if (!dice) {
      // Avoid rerender while opponent thinks
      setPreviewSquares(Array(64).fill([]));
      return;
    }
    possibleMoveList = possibleMoves(dice, board);
    const prevSquares = Array(64).fill([]);
    possibleMoveList.forEach(
      (m) =>
        (prevSquares[m.position] = [
          ...new Set([
            ...prevSquares[m.position],
            m.endNumber + (dice.isWhite ? 0 : 0.1),
          ]),
        ])
    );
    // Also highlight original dice position. Indicate by negative number
    prevSquares[dice.position] = [-dice.number];
    setPreviewSquares(prevSquares);
  };

  const animateEngineMove = (move: Move) => {
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
  const engineData = useMemo(
    () =>
      isWhitesMove || gameResult
        ? undefined
        : {
            board: board,
            isWhitesMove: isWhitesMove,
          },
    [board, gameResult]
  );
  const { result } = useWorker(createWorker, engineData);
  if (result) {
    const bestMove = (result as WorkerResult).result;
    if (bestMove) animateEngineMove(bestMove);
  }

  return (
    <div className="game">
      <div id="board-layout">
        <Player player={players[1]} isToMove={!gameResult && !isWhitesMove} />
        <div id="board">
          {board.map((square, i) => (
            <Square
              key={i}
              index={i}
              isWhite={i % 2 === ~~(i / 8) % 2}
              dice={square}
              movePreview={previewSquares[i]}
              moveFn={moveDice}
              highlightFn={highlightMoves}
              diceRef={diceRefs.current[i]}
            />
          ))}
        </div>
        <Player player={players[0]} isToMove={!gameResult && isWhitesMove} />
        {gameEndVisible && (
          <GameEndModal
            players={players}
            result={gameResult}
            setVisible={setGameEndVisible}
            newGame={newGame}
          />
        )}
      </div>
      <Sidebar gameResult={gameResult} newGameFn={newGame} resignFn={resign} />
    </div>
  );
};

export default Board;
