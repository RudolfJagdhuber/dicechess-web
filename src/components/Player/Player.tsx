import "./Player.css";

export interface PlayerProps {
  name: string;
  avatarAsset: string;
  isEngine: boolean;
}

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

const Player = ({
  player,
  isToMove = false,
}: {
  player: PlayerProps;
  isToMove: boolean;
}) => {
  // const avatar = "assets/images/" + (isPlayer ? "user" : "engine") + ".svg";

  return (
    <div className="player-layout">
      <div
        className="avatar"
        style={{ backgroundImage: `url(${player.avatarAsset})` }}
      />
      <div className="name">{player.name}</div>
      <div className={`clock ${isToMove ? "active" : "inactive"}`}>
        {player.isEngine && isToMove && <LoadingSpinner />}
        {!isToMove ? "" : player.isEngine ? "Thinking..." : "Your Turn"}
      </div>
    </div>
  );
};

export default Player;
