import PlayerCSS from "../Player.css";
import PreciousImg from "./Precious.png";

function PreciousSprite({ x, y }) {
  return (
    <div className="precious-sprite" style={{ position: "absolute", left: x, top: y }}>
      <img src={PreciousImg} alt="Precious" />
    </div>
  );
}

export default PreciousSprite;