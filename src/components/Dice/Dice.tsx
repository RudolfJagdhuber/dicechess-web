import { forwardRef, useImperativeHandle, useRef } from "react";
import "./Dice.css";
import { DiceProps } from "./helpers";

export interface DiceRef {
  getRef: () => React.RefObject<HTMLDivElement>;
}
interface DiceComponentProps {
  dice: DiceProps;
  moveFn: (dice: DiceProps, to: number) => boolean;
  highlightFn: (dice: DiceProps | undefined) => void;
}

const Dice = forwardRef<DiceRef, DiceComponentProps>(
  ({ dice, moveFn, highlightFn }, diceRef) => {
    let activeElement: HTMLElement | undefined;
    let rect: DOMRect;
    let dicePx: { x: number; y: number } = { x: 0, y: 0 };
    let highlightElement: Element | undefined;
    const localRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(diceRef, () => ({
      getRef: () => localRef,
    }));

    // TODO: DAS HIER ERZEUGT DEN BLÖDSINN!!!
    // useEffect(() => {
    //   const cur = localRef.current;
    //   if (cur)
    //     cur.addEventListener("touchstart", grabDiceTouch, { passive: false });
    //   return () => {
    //     if (cur) cur.removeEventListener("touchstart", grabDiceTouch);
    //   };
    // }, []);

    const grabDiceTouch = (event: React.TouchEvent) => {
      event.preventDefault();
      activeElement = event.currentTarget as HTMLElement;
      dicePx = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      grabDice();
    };

    const grabDiceCursor = (event: React.MouseEvent) => {
      activeElement = event.currentTarget as HTMLElement;
      dicePx = { x: event.clientX, y: event.clientY };
      grabDice();
    };

    const grabDice = () => {
      if (!activeElement) return;
      document.addEventListener("mouseup", placeDice);
      document.addEventListener("mousemove", moveDiceCursor);
      document.addEventListener("touchend", placeDiceTouch, { passive: false });
      document.addEventListener("touchmove", moveDiceTouch, { passive: false });
      highlightFn(dice);
      rect = activeElement.getBoundingClientRect();
      const x = dicePx.x - rect.left - rect.width / 2;
      const y = dicePx.y - rect.top - rect.height / 2;
      activeElement.style.transition = "none";
      // activeElement.style.pointerEvents = "none";
      activeElement.style.transform = `translate(${x}px, ${y}px)`;
      activeElement.style.zIndex = "3";
    };

    const moveDiceTouch = (event: TouchEvent): void => {
      event.preventDefault();
      dicePx = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      moveDice();
    };

    const moveDiceCursor = (event: MouseEvent): void => {
      dicePx = { x: event.clientX, y: event.clientY };
      moveDice();
    };

    const moveDice = (): void => {
      if (activeElement) {
        // Find a square to highlight
        const element = document
          .elementsFromPoint(dicePx.x, dicePx.y)
          .filter((e) => e.className.startsWith("preview-inner-container"));
        if (element.length === 0) {
          if (highlightElement) {
            highlightElement?.classList.remove("highlight");
            highlightElement = undefined;
            // console.log("Removed Highlight");
          }
        } else {
          if (element[0].className === "preview-inner-container") {
            highlightElement?.classList.remove("highlight");
            highlightElement = element[0];
            highlightElement.classList.add("highlight");
            // console.log("New Highlight");
          }
        }

        const x = dicePx.x - rect.left - rect.width / 2;
        const y = dicePx.y - rect.top - rect.height / 2;
        activeElement.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const placeDiceTouch = (event: TouchEvent): void => {
      event.preventDefault();
      placeDice();
    };

    const placeDice = (): void => {
      document.removeEventListener("mouseup", placeDice);
      document.removeEventListener("mousemove", moveDiceCursor);
      document.removeEventListener("touchend", placeDiceTouch);
      document.removeEventListener("touchmove", moveDiceTouch);
      highlightFn(undefined);
      if (!activeElement) return;
      // Compute number of quares traversed in x and y direction.
      const squareWidth = rect.width / 0.7;
      const dxFull =
        (dicePx.x - rect.left + (squareWidth - rect.width) / 2) / squareWidth;
      const dx = Math.floor(dxFull);
      const dy = Math.floor(
        (dicePx.y - rect.top + (squareWidth - rect.width) / 2) / squareWidth
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
        ref={localRef}
        style={{ backgroundImage: `url(${asset})` }}
        className="dice"
        onMouseDown={grabDiceCursor}
        onTouchStart={grabDiceTouch}
      />
    );
  }
);

export default Dice;
