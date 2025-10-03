import PlayerCSS from "../Player.css";
import EmmaImg from "./Emma.png";

function EmmaSprite({ x, y }) {
  return (
    <div className="emma-sprite" style={{ position: "absolute", left: x, top: y }}>
      <img src={EmmaImg} alt="Emma" />
    </div>
  );
}

export default EmmaSprite;