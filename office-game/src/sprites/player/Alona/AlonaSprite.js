import PlayerCSS from "../Player.css";
import AlonaImg from "./Alona.png";

function AlonaSprite({ x, y }) {
  return (
    <div className="alona-sprite" style={{ position: "absolute", left: x, top: y }}>
      <img src={AlonaImg} alt="Alona" />
    </div>
  );
}

export default AlonaSprite;