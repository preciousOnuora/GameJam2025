// src/Components/Objects/ColleagueSprite.js
import React from "react";

function Colleague({ x, y, sprite, speech }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: "80px", textAlign: "center" }}>
      {/* Sprite */}
      <img
        src={sprite}
        alt="Colleague"
        style={{ width: "80px", height: "80px" }}
      />

      {/* Speech bubble */}
      {speech && (
        <div
          style={{
            position: "absolute",
            bottom: "100%", // above the sprite
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            color: "#000",
            padding: "6px 10px",
            borderRadius: "12px",
            fontSize: "12px",
            fontFamily: "'Press Start 2P', monospace",
            whiteSpace: "nowrap",
            boxShadow: "0 0 4px #000",
            zIndex: 1000,
          }}
        >
          {speech}
        </div>
      )}
    </div>
  );
}

export default Colleague;
