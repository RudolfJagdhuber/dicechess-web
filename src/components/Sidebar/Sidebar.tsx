import "./Sidebar.css";

const Sidebar = ({
  gameResult,
  resignFn,
  newGameFn,
}: {
  gameResult: number | undefined;
  resignFn: () => void;
  newGameFn: () => void;
}) => {
  return (
    <div className="sidebar-container">
      <div style={{ flex: 1 }} />
      <div className="sidebar-footer">
        <button
          className={
            "sidebar-action-button " + (gameResult ? "newgame" : "resign")
          }
          onClick={gameResult ? newGameFn : resignFn}
        >
          {gameResult ? "New Game" : "Resign"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
