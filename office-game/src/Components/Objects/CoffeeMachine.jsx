// src/Components/Objects/CoffeeMachine.js
import React from "react";
//import CupImg from "../../sprites/objects/Interactables/coffeeMachine.png";
import CupImg from "../../sprites/objects/Interactables/coffeeMachineEmpty.png"
import CupGif from "../../sprites/objects/Interactables/coffeeMachineAnimation.gif";

function Cup({ x, y, isFilling }) {
  return (
    <img
      src={isFilling ? CupGif : CupImg}
      alt="Coffee Cup"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "150px",   
        height: "120px", 
      }}
    />
  );
}

export default Cup;
