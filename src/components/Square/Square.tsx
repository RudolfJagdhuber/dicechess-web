import Dice, { DiceProps } from "../Dice/Dice";
import "./Square.css";

const Square = ({
  index,
  isWhite,
  dice,
  highlight,
  moveFn,
  highlightFn,
}: {
  index: number;
  isWhite: boolean;
  dice?: DiceProps;
  highlight: boolean;
  moveFn: (dice: DiceProps, to: number) => boolean;
  highlightFn: (dice: DiceProps | undefined) => void;
}) => {
  return (
    <div
      className={
        "square " + (isWhite ? "white " : "black ")
        // (dragOver ? "highlight" : "")
      }
    >
      {dice && <Dice dice={dice} moveFn={moveFn} highlightFn={highlightFn} />}
      {highlight && <div className="highlight" />}
    </div>
  );
};

export default Square;
