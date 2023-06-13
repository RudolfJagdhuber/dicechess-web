import { RefObject } from "react";
import Dice from "../Dice/Dice";
import { DiceProps } from "../Dice/helpers";
import "./Square.css";

const Square = ({
  index,
  isWhite,
  dice,
  movePreview,
  isWhitePreview,
  moveFn,
  highlightFn,
  diceRef,
}: {
  index: number;
  isWhite: boolean;
  dice?: DiceProps;
  movePreview: number[];
  isWhitePreview: boolean;
  moveFn: (dice: DiceProps, to: number) => boolean;
  highlightFn: (dice: DiceProps | undefined) => void;
  diceRef: RefObject<HTMLDivElement>;
}) => {
  return (
    <div
      className={
        "square " + (isWhite ? "white " : "black ")
        // (dragOver ? "highlight" : "")
      }
    >
      {dice && (
        <Dice
          dice={dice}
          moveFn={moveFn}
          highlightFn={highlightFn}
          diceRef={diceRef}
        />
      )}
      {movePreview.length > 0 && (
        <MovePreview
          movePreview={movePreview}
          isWhitePreview={isWhitePreview}
        />
      )}
    </div>
  );
};

const MovePreview = ({
  movePreview,
  isWhitePreview,
}: {
  movePreview: number[];
  isWhitePreview: boolean;
}) => {
  const diceAssets = movePreview.map(
    (num) =>
      "assets/images/dice/d" +
      (isWhitePreview ? "w" : "b") +
      (num === 0 ? "k" : num === -1 ? 0 : num) +
      ".svg"
  );

  return (
    <div className="preview-container">
      <div
        style={{ backgroundImage: `url(${diceAssets[0]})` }}
        className="dice-preview"
      />
      {diceAssets.length === 2 && <div className="sep" />}
      {diceAssets.length === 2 && (
        <div
          style={{ backgroundImage: `url(${diceAssets[1]})` }}
          className="dice-preview"
        />
      )}
    </div>
  );
};

export default Square;
