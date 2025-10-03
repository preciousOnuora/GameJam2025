import PlayerCSS from "../Player.css";
import CatherineImg from "./Catherine.png";

function CatherineSprite({ x, y }) {
  return (
    <div className="catherine-sprite" style={{ position: "absolute", left: x, top: y }}>
      <img src={CatherineImg} alt="Catherine" />
    </div>
  );
}

export default CatherineSprite;