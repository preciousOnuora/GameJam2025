// GameBackground.js
import React from "react";
import officeStart from '../../sprites/background/BackgroundTestIMGG.png';

function GameBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 50,
        left: 0,
        width: "100vw",
        height: "90vh",
        backgroundImage: `url(${officeStart})`,
        backgroundSize: "contain", // Changed from "cover" to "contain"
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffffff", // White background
        zIndex: -1
      }}
    />
  );
}

export default GameBackground;