// GameBackground.js
import React from "react";
import officeStart from '../../sprites/background/BackgroundIMG.png';

function GameBackground() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${officeStart})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

export default GameBackground;
