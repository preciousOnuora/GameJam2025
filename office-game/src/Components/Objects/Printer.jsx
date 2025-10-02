// src/Components/Objects/Printer.js
import React from "react";
import PrinterImg from "../../sprites/objects/Interactables/printer-removebg-preview.png";
import PrinterGif from "../../sprites/objects/Interactables/printeranimation.gif"; 

function Printer({ x, y, isPrinting }) {
  return (
    <img
      src={isPrinting ? PrinterGif : PrinterImg}
      alt="Printer"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "100px",
        height: "100px",
      }}
    />
  );
}

export default Printer;
