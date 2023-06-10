import "./Player.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

const Player = ({
  isPlayer = false,
  isToMove = false,
}: {
  isPlayer: boolean;
  isToMove: boolean;
}) => {
  const avatar = "assets/images/" + (isPlayer ? "user" : "engine") + ".svg";

  return (
    <div className="player-layout">
      <div className="avatar" style={{ backgroundImage: `url(${avatar})` }} />
      <div className="name">{isPlayer ? "Player" : "Computer"}</div>
      <div className={`clock ${isToMove ? "active" : "inactive"}`}>
        {!isPlayer && isToMove && <LoadingSpinner />}
        {!isToMove ? "" : isPlayer ? "Your move" : "Thinking..."}
      </div>
    </div>
  );
};

export default Player;
