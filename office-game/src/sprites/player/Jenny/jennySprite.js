import React, { useState, useEffect, useCallback } from "react";
import JennyImg from "./Jenny-closemouth.png";

function Sprite({
  cupX,
  cupY,
  printerX,
  printerY,
  computerX,
  computerY,
  onFillCoffee,
  onUsePrinter,
  onUseComputer,
  bossX,
  bossY,
  onStartBossQuiz,
  setPlayerPos,
  colleagues,
  onColleagueTalk
}) {
  const [x, setX] = useState(220);
  const [y, setY] = useState(370);
  const step = 10;
  const [showLabel, setShowLabel] = useState("");

  const handleKeyDown = useCallback((event) => {
    let moved = false;

    switch (event.key) {
      case "ArrowUp":
        setY(prev => Math.max(prev - step, 0));
        moved = true;
        break;
      case "ArrowDown":
        setY(prev => prev + step);
        moved = true;
        break;
      case "ArrowLeft":
        setX(prev => Math.max(prev - step, 0));
        moved = true;
        break;
      case "ArrowRight":
        setX(prev => prev + step);
        moved = true;
        break;
      case " ":
        // Coffee
        if (Math.abs(x - cupX) < 50 && Math.abs(y - cupY) < 50) {
          onFillCoffee();
        }

        // Printer
        if (Math.abs(x - printerX) < 50 && Math.abs(y - printerY) < 50) {
          onUsePrinter();
        }

        // Computer
        if (Math.abs(x - computerX) < 50 && Math.abs(y - computerY) < 50) onUseComputer();

        // Boss
        if (Math.abs(x - bossX) < 80 && Math.abs(y - bossY) < 80) {
          onStartBossQuiz?.();
        }

        // Colleagues
        if (colleagues && colleagues.length > 0) {
          let nearest = null;
          let minDist = Infinity;
          colleagues.forEach(col => {
            const dx = col.x - x;
            const dy = col.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < minDist) {
              minDist = dist;
              nearest = col;
            }
          });
          if (nearest && minDist < 150) {
            onColleagueTalk?.(nearest.id);
          }
        }
        break;
      default:
        break;
    }

    if (moved) setPlayerPos({ x, y });
  }, [x, y, cupX, cupY, printerX, printerY, computerX, computerY, bossX, bossY, colleagues, onFillCoffee, onUsePrinter, onUseComputer, onStartBossQuiz, onColleagueTalk, setPlayerPos]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    // Object labels
    if (Math.abs(x - cupX) < 50 && Math.abs(y - cupY) < 50) {
      setShowLabel("Drink Coffee\n[Space]");
      return;
    }
    if (Math.abs(x - printerX) < 50 && Math.abs(y - printerY) < 50) {
      setShowLabel("Use Printer\n[Space]");
      return;
    }
    if (Math.abs(x - computerX) < 50 && Math.abs(y - computerY) < 50) {
      setShowLabel("Use Computer\n[Space]");
      return;
    }

    // Colleagues
    if (colleagues && colleagues.length > 0) {
      let nearest = null;
      let minDist = Infinity;
      colleagues.forEach(col => {
        const dx = col.x - x;
        const dy = col.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          nearest = col;
        }
      });
      if (nearest && minDist < 150) {
        setShowLabel(`Talk to ${nearest.name}\n[Space]`);
        return;
      }
    }

    // Boss
    if (Math.abs(x - bossX) < 80 && Math.abs(y - bossY) < 80) {
      setShowLabel("Final Boss Quiz\n[Space]");
      return;
    }

    setShowLabel("");
  }, [x, y, cupX, cupY, printerX, printerY, computerX, computerY, colleagues, bossX, bossY]);

  
  return (
    <>
      <img
        src={JennyImg}
        alt="Player"
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: "100px",
          height: "100px",
          imageRendering: "pixelated",
        }}
      />
      {showLabel && (
        <div
          style={{
            position: "absolute",
            left: x + 50,
            top: y - 10,
            transform: "translate(-50%, -100%)",
            backgroundColor: "#111111cc",
            color: "#ff69b4",
            padding: "6px 10px",
            border: "2px solid #ff69b4",
            borderRadius: "6px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "14px",
            lineHeight: "1.3",
            textAlign: "center",
            textShadow: "1px 1px #000",
            whiteSpace: "pre-line",
            pointerEvents: "none",
            zIndex: 100,
            minWidth: "120px",
          }}
        >
          {showLabel}
          <div
            style={{
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid #ff69b4",
            }}
          />
        </div>
      )}
    </>
  );
}

export default Sprite;
