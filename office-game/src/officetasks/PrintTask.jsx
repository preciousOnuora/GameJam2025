import React, { useState } from "react";
import Sprite from "../src/sprites";
import Printer from "../components/PlayableObjects/Printer"; // create a Printer component like CoffeeMachine

export default function PrinterTask({ onComplete }) {
  // Tracks the print progress (0 to 5)
  const [progress, setProgress] = useState(0);

  // Tracks the sprite's position
  const [spriteX, setSpriteX] = useState(0);
  const [spriteY, setSpriteY] = useState(0);

  // Position of the printer (constant)
  const printerX = 300;
  const printerY = 200;

  // Function to simulate waiting for the printer
  const handleWait = () => {
    if (progress < 5) {
      // Increase progress until printing is done
      setProgress(progress + 1);
    } else {
      // Once printing is done, move sprite next to the printer
      setSpriteX(printerX - 50); // adjust to be beside printer
      setSpriteY(printerY);

      // Notify parent component that task is complete
      onComplete();
    }
  };

  return (
    <div>
      {/* Button to simulate waiting for the printer */}
      <button onClick={handleWait}>Wait for Printer</button>

      {/* Sprite positioned according to state */}
      <Sprite x={spriteX} y={spriteY} />

      {/* Printer image positioned at a fixed location */}
      <Printer x={printerX} y={printerY} />
    </div>
  );
}
