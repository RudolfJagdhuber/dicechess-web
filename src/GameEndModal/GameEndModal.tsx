import { PlayerProps } from "../components/Player/Player";
import "./GameEndModal.css";

const GameEndModal = ({
  players,
  result,
  setVisible,
  newGame,
}: {
  players: PlayerProps[];
  result: number | undefined;
  setVisible: (isVisible: boolean) => void;
  newGame: () => void;
}) => {
  const playAgain = () => {
    newGame();
    setVisible(false);
  };

  const win = !result || players[1].isEngine ? result : -1 * result;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-close">
          <button onClick={() => setVisible(false)}> × </button>
        </div>
        <div className={"modal-title " + (win && win === 1 ? "win" : "")}>
          <h1>
            {!win || win === 0
              ? "Game Over"
              : win === 1
              ? "You Won!"
              : "You Lost!"}
          </h1>
        </div>
        <div className="modal-result">
          <div className="modal-result-avatars">
            <div
              className="modal-avatar"
              style={{ backgroundImage: `url(${players[0].avatarAsset})` }}
            />
            <div className="modal-result-text">
              {!result
                ? "vs"
                : result === 1
                ? "1 - 0"
                : result === -1
                ? "0 - 1"
                : "-"}
            </div>
            <div
              className="modal-avatar"
              style={{ backgroundImage: `url(${players[1].avatarAsset})` }}
            />
          </div>
          <div className="modal-result-names">
            <div className="modal-player-name">{players[0].name}</div>
            <div className="modal-player-name">{players[1].name}</div>
          </div>
        </div>
        <div className="modal-highscore">
          <p>Game Over</p>
        </div>
        <div className="modal-footer">
          <button onClick={playAgain}>Play Again</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
