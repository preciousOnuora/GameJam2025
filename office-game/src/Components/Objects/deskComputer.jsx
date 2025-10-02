// src/Components/Objects/DeskComputer.js
import React from "react";
import ComputerImg from "../../sprites/objects/Interactables/Laptop.png";

function DeskComputer({ x, y }) {
  return (
    <img
      src={ComputerImg}
      alt="Desk Computer"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "50px", 
        height: "50px",
      }}
    />
  );
}

export default DeskComputer;
