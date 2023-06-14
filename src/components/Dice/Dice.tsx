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

  const grabDiceTouch = (event: React.TouchEvent) => {
    event.preventDefault();
    activeElement = event.currentTarget as HTMLElement;
    grabDice(event.touches[0].clientX, event.touches[0].clientY);
  };

  const grabDiceCursor = (event: React.MouseEvent) => {
    activeElement = event.currentTarget as HTMLElement;
    grabDice(event.clientX, event.clientY);
  };

  const grabDice = (clientX: number, clientY: number) => {
    if (!activeElement) return;
    document.addEventListener("mouseup", placeDiceCursor);
    document.addEventListener("mousemove", moveDiceCursor);
    document.addEventListener("touchend", placeDiceTouch);
    document.addEventListener("touchmove", moveDiceTouch);
    highlightFn(dice);
    rect = activeElement.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;
    activeElement.style.transition = "none";
    activeElement.style.pointerEvents = "none";
    activeElement.style.transform = `translate(${x}px, ${y}px)`;
    activeElement.style.zIndex = "3";
  };

  const moveDiceTouch = (event: TouchEvent): void => {
    event.preventDefault();
    moveDice(event.touches[0].clientX, event.touches[0].clientY);
  };

  const moveDiceCursor = (event: MouseEvent): void => {
    moveDice(event.clientX, event.clientY);
  };

  const moveDice = (clientX: number, clientY: number): void => {
    if (activeElement) {
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      activeElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const placeDiceTouch = (event: TouchEvent): void => {
    event.preventDefault();
    placeDice(event.touches[0].clientX, event.touches[0].clientY);
  };

  const placeDiceCursor = (event: MouseEvent): void => {
    placeDice(event.clientX, event.clientY);
  };

  const placeDice = (clientX: number, clientY: number): void => {
    document.removeEventListener("mouseup", placeDiceCursor);
    document.removeEventListener("mousemove", moveDiceCursor);
    document.removeEventListener("touchend", placeDiceTouch);
    document.removeEventListener("touchmove", moveDiceTouch);
    highlightFn(undefined);
    if (!activeElement) return;
    // Compute number of quares traversed in x and y direction.
    const squareWidth = rect.width / 0.7;
    const dxFull =
      (clientX - rect.left + (squareWidth - rect.width) / 2) / squareWidth;
    const dx = Math.floor(dxFull);
    const dy = Math.floor(
      (clientY - rect.top + (squareWidth - rect.width) / 2) / squareWidth
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
      onMouseDown={grabDiceCursor}
      onTouchStart={grabDiceTouch}
    />
  );
};

export default Dice;
