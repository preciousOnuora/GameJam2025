import React, { useState } from "react";
import Sprite from "./Components/Sprite/";
import CoffeeMachine from "./Components/Objects/CoffeeMachine";
import StressStat from "../Components/Stats/StressStat.jsx";
import BonusSound from "../Sounds/BonusSound.jsx";

// Main component for the coffee task
export default function CoffeeTask({ onComplete }) {
  // Tracks the current coffee level (0 to 5)
  const [level, setLevel] = useState(0);

  // Tracks the sprite's current position on the screen
  const [spriteX, setSpriteX] = useState(0);
  const [spriteY, setSpriteY] = useState(0);

  // Position of the coffee machine (constant, doesn’t move)
  const coffeeMachineX = 300;
  const coffeeMachineY = 200;

  // Function to handle pouring coffee
  const handlePour = () => {
    if (level < 5) {
      // Increase coffee level by 1 until full
      setLevel(level + 1);
    } else {
      // Once full, move sprite next to coffee machine
      setSpriteX(coffeeMachineX - 50); // adjust so sprite is beside machine
      setSpriteY(coffeeMachineY);

      // Notify parent component that task is complete
      onComplete();
    }
  };

  // Render the button, sprite, and coffee machine
  return (
    <div>
      {/* Button to pour coffee */}
      <button onClick={handlePour}>Fill Coffee</button>

      {/* Sprite image, positioned using spriteX and spriteY */}
      <Sprite x={spriteX} y={spriteY} />

      {/* Coffee machine image, positioned using constants */}
      <CoffeeMachine x={coffeeMachineX} y={coffeeMachineY} />
      <StressStat stressStat={stressStat} setStress={+7} />
      <BonusSound />
    </div>
  );
}
