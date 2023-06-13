import { RefObject } from "react";
import "./Dice.css";
import { DiceProps } from "./helpers";

const Dice = ({
  dice,
  moveFn,
  highlightFn,
  diceRef,
}: {
  dice: DiceProps;
  moveFn: (dice: DiceProps, to: number) => boolean;
  highlightFn: (dice: DiceProps | undefined) => void;
  diceRef: RefObject<HTMLDivElement>;
}) => {
  let activeElement: HTMLElement | undefined;
  let rect: DOMRect;

  const grabDice = (event: React.MouseEvent) => {
    document.addEventListener("mouseup", placeDice);
    document.addEventListener("mousemove", moveDice);
    highlightFn(dice);
    activeElement = event.currentTarget as HTMLElement;
    rect = activeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    activeElement.style.transition = "none";
    activeElement.style.pointerEvents = "none";
    activeElement.style.transform = `translate(${x}px, ${y}px)`;
    activeElement.style.zIndex = "3";
  };

  const moveDice = (event: MouseEvent): void => {
    if (activeElement) {
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      activeElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const placeDice = (event: MouseEvent): void => {
    document.removeEventListener("mouseup", placeDice);
    document.removeEventListener("mousemove", moveDice);
    highlightFn(undefined);
    if (!activeElement) return;
    // Compute number of quares traversed in x and y direction.
    const squareWidth = rect.width / 0.7;
    const dxFull =
      (event.clientX - rect.left + (squareWidth - rect.width) / 2) /
      squareWidth;
    const dx = Math.floor(dxFull);
    const dy = Math.floor(
      (event.clientY - rect.top + (squareWidth - rect.width) / 2) / squareWidth
    );
    const isRightHalf = dxFull % 1 > Math.sign(dxFull) * 0.5;
    const newPos = dice.position + (8 * dy + dx);
    const newCol = (dice.position % 8) + dx;
    // New position and actual column need to be on the board.
    // => newPos in [0, 63], newCol in [0, 7]
    // Also dont move opponents Dice
    if (
      dice.isWhite &&
      newPos >= 0 &&
      newPos < 64 &&
      newCol >= 0 &&
      newCol < 8 &&
      newPos !== dice.position
    ) {
      // Function checks if its a legal move. Returns false if not. If dice is
      // dropped on the second half of the square, the value is returned
      // negative to indicate that the second move option was chosen.
      if (moveFn(dice, newPos * (isRightHalf ? -1 : 1))) {
        activeElement = undefined;
        return;
      }
    }
    activeElement.style.pointerEvents = "auto";
    activeElement.style.transition = "transform 0.2s";
    activeElement.style.transform = "translate(0px, 0px)";
    activeElement.style.zIndex = "1";
    activeElement = undefined;
  };

  const asset =
    "assets/images/dice/d" +
    (dice.isWhite ? "w" : "b") +
    (dice.number === 0 ? "k" : dice.number === -1 ? 0 : dice.number) +
    ".svg";
  return (
    <div
      ref={diceRef}
      style={{ backgroundImage: `url(${asset})` }}
      className="dice"
      onMouseDown={grabDice}
      // onMouseMove={moveDice}
      // onMouseUp={placeDice}
    />
  );
};

export default Dice;
