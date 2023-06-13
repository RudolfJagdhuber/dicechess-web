import { RefObject } from "react";
import Dice from "../Dice/Dice";
import { DiceProps } from "../Dice/helpers";
import "./Square.css";

const Square = ({
  index,
  isWhite,
  dice,
  movePreview,
  moveFn,
  highlightFn,
  diceRef,
}: {
  index: number;
  isWhite: boolean;
  dice?: DiceProps;
  movePreview: number[];
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
          isWhitePreview={movePreview[0] % 1 === 0}
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
  const diceAssets = movePreview.map((num) => {
    const rounded = Math.round(num);
    return (
      "assets/images/dice/d" +
      (isWhitePreview ? "w" : "b") +
      (rounded === 0 ? "k" : rounded === -1 ? 0 : rounded) +
      ".svg"
    );
  });

  return (
    <div className="preview-container">
      <div className="preview-inner-container">
        <div
          style={{ backgroundImage: `url(${diceAssets[0]})` }}
          className="dice-preview"
        />
      </div>
      {diceAssets.length === 2 && <div className="sep" />}
      {diceAssets.length === 2 && (
        <div className="preview-inner-container">
          <div
            style={{ backgroundImage: `url(${diceAssets[1]})` }}
            className="dice-preview"
          />
        </div>
      )}
    </div>
  );
};

export default Square;
