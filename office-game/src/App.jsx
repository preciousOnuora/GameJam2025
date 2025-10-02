import React, { useState, useEffect } from "react";
import GameMap from "./Components/Objects/GameBackground.js";
import Sprite from "./Components/Objects/jennySprite.js";
import Cup from "./Components/Objects/CoffeeMachine.jsx";
import Printer from "./Components/Objects/Printer.jsx";
import BossSprite from "./Components/Objects/BossSprite.js";
import BossQuiz from "./Components/Objects/BossQuiz.js";
import StatsComponent from "./Components/Stats/StatsMain.jsx";
import Colleague from "./Components/Objects/colleagues";
import StickyNoteImg from "./sprites/objects/Interactables/stickynote.png";

// Colleague sprites
import ColleagueAlona from "./sprites/player/Alona/Alona.png"; import ColleagueCatherine from "./sprites/player/Catherine/Catherine.png"; import ColleagueEmma from "./sprites/player/Emma/Emma.png"; import ColleaguePrecious from "./sprites/player/Precious/Precious.png"; import ColleagueBlonde from "./sprites/player/Staff/Blondestaff.png"; import ColleagueDirtyBlondeGlassesStaff from "./sprites/player/Staff/DirtyBlondeGlassesStaff.png"; import ColleaguePinkStaff from "./sprites/player/Staff/PinkStaff.png"; import ColleagueBrownhairStaff from "./sprites/player/Staff/Brownhairstaff.png"; import ColleagueTamie from "./sprites/player/Tamie/Tamie.png";
function App() {
  // Jenny position
  const [jennyX, setJennyX] = useState(100);
  const [jennyY, setJennyY] = useState(100);

  // Player position state
const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });

// Update both x and y when Sprite moves
const updatePlayerPos = (x, y) => {
  setPlayerPos({ x, y });
  setJennyX(x);
  setJennyY(y);
};

const startBossQuiz = () => {
  if (quizAvailable) setShowQuiz(true);
};
  // Coffee & printer
  const [coffeeLevel, setCoffeeLevel] = useState(0);
  const [cupFilling, setCupFilling] = useState(false);
  const [printerActive, setPrinterActive] = useState(false);

  // Boss quiz
  const [quizAvailable, setQuizAvailable] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  // Colleague interaction
  const [speakingColleague, setSpeakingColleague] = useState(null);
  const [talkedColleagues, setTalkedColleagues] = useState([]);

  // Task sheet
  const [taskSheetOpen, setTaskSheetOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: "☕ Get a coffee", done: false },
    { id: 2, text: "🖨️ Use the printer", done: false },
    { id: 3, text: "📧 Respond to emails", done: false },
    { id: 4, text: "📡 Connect to Wi-Fi", done: false },
    { id: 5, text: "💰 Try the pension calculator", done: false },
    { id: 6, text: "💬 Talk to colleagues 0/9", done: false },
  ]);

  // Object positions
  const cupX = 300;
  const cupY = 200;
  const printerX = 500;
  const printerY = 250;
  const bossX = 900;
  const bossY = 200;

  // Colleagues
  const colleagues = [
    { id: 1, name: "Alona", sprite: ColleagueAlona, x: 200, y: 300, fact: "Core value: Keep client data confidential." },
    { id: 2, name: "Catherine", sprite: ColleagueCatherine, x: 400, y: 350, fact: "Report security breaches immediately." },
    { id: 3, name: "Emma", sprite: ColleagueEmma, x: 600, y: 250, fact: "Shred sensitive documents when done." },
{ id: 3, name: "Emma", sprite: ColleagueEmma, x: 600, y: 250, fact: "Shred sensitive documents when done." }, { id: 5, name: "Precious", sprite: ColleaguePrecious, x: 450, y: 450, fact: "Daily reports are due by 5 PM." }, { id: 6, name: "Blonde Staff", sprite: ColleagueBlonde, x: 700, y: 400, fact: "Always check client information twice." }, { id: 7, name: "Dirty Blonde Glasses Staff", sprite: ColleagueDirtyBlondeGlassesStaff, x: 550, y: 300, fact: "Never leave sensitive documents unattended." }, { id: 8, name: "Pink Staff", sprite: ColleaguePinkStaff, x: 350, y: 200, fact: "Confidential conversations should be in private rooms." }, { id: 9, name: "Tamie", sprite: ColleagueTamie, x: 600, y: 500, fact: "Use secure channels for client communication." }, { id: 10, name: "Brown hair Staff", sprite: ColleagueBrownhairStaff, x: 650, y: 200, fact: "Use secure channels for client communication." },  ];

  // Coffee
  const handleFillCoffee = () => {
    if (coffeeLevel < 5) {
      setCoffeeLevel(prev => prev + 1);
      setCupFilling(true);
      setTimeout(() => setCupFilling(false), 2000);
      markTaskDone(1);
    }
  };

  // Printer
  const handleUsePrinter = () => {
    setPrinterActive(true);
    setTimeout(() => setPrinterActive(false), 2000);
    markTaskDone(2);
  };

  // Boss
  const handleBossInteract = () => {
    if (quizAvailable) setShowQuiz(true);
  };

  const handleQuizComplete = (passed, score, total) => {
    setShowQuiz(false);
    setQuizAvailable(false);
    alert(`Quiz finished! Score: ${score}/${total}. ${passed ? "✅ You passed!" : "❌ Try again tomorrow!"}`);
  };

  // Mark task done
  const markTaskDone = (taskId) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, done: true } : task));
  };

  // Spacebar interactions
  const handleSpacebar = (event) => {
    if (event.code !== "Space") return;

    // Boss
    const bossDist = Math.hypot(jennyX - bossX, jennyY - bossY);
    if (bossDist < 80 && quizAvailable) {
      handleBossInteract();
      return;
    }

    // Closest colleague
    let closest = null;
    let minDist = Infinity;
    colleagues.forEach(col => {
      const dist = Math.hypot(jennyX - col.x, jennyY - col.y);
      if (dist < minDist) {
        minDist = dist;
        closest = col;
      }
    });

    if (closest && minDist < 120) {
      setSpeakingColleague(closest.id);
      setTimeout(() => setSpeakingColleague(null), 3000);

      setTalkedColleagues(prev => {
        if (!prev.includes(closest.id)) {
          const newList = [...prev, closest.id];
          setTasks(prevTasks => prevTasks.map(task =>
            task.id === 6
              ? { ...task, text: `💬 Talk to colleagues ${newList.length}/9` }
              : task
          ));
          if (newList.length === colleagues.length) markTaskDone(6);
          return newList;
        }
        return prev;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleSpacebar);
    return () => window.removeEventListener("keydown", handleSpacebar);
  }, [jennyX, jennyY, quizAvailable, talkedColleagues]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🏦 Lloyds Bank Office Game</h1>
      <GameMap />
      <StatsComponent />

      {/* Coffee & Printer */}
      <Cup x={cupX} y={cupY} isFilling={cupFilling} />
      <Printer x={printerX} y={printerY} isPrinting={printerActive} />

      {/* Colleagues */}
      {colleagues.map(col => (
        <Colleague key={col.id} x={col.x} y={col.y} sprite={col.sprite} speech={speakingColleague === col.id ? col.fact : null} />
      ))}

      {/* Jenny */}
<Sprite
  cupX={cupX}
  cupY={cupY}
  printerX={printerX}
  printerY={printerY}

  onFillCoffee={handleFillCoffee}
  onUsePrinter={handleUsePrinter}
  onUseComputer={() => alert("Laptop menu placeholder")}
  bossX={bossX}
  bossY={bossY}
  onStartBossQuiz={startBossQuiz}
  setPlayerPos={({ x, y }) => {
    setJennyX(x);
    setJennyY(y);
  }}
  colleagues={colleagues}
/>




      {/* Boss */}
   <BossSprite
        bossX={bossX}
        bossY={bossY}
        playerX={jennyX}
        playerY={jennyY}
        onBossInteract={startBossQuiz}
        isQuizAvailable={quizAvailable}
      />

      {/* Boss Quiz */}
      {showQuiz && <BossQuiz onQuizComplete={handleQuizComplete} />}
      {/* Task Sheet */}
      <div
        style={{ position: "absolute", bottom: "20px", left: "20px", cursor: "pointer", zIndex: 1100 }}
        onClick={() => setTaskSheetOpen(true)}
      >
        <img src={StickyNoteImg} alt="Task Sheet" style={{ width: "60px", height: "60px" }} />
      </div>
      {taskSheetOpen && (
        <div style={{
          position: "absolute", left: "50px", bottom: "100px",
          backgroundColor: "#222", border: "4px solid #FF69B4", padding: "20px",
          zIndex: 1200, width: "300px", fontFamily: "'Press Start 2P', monospace",
          color: "#fff", textAlign: "left", boxShadow: "0 0 0 4px #444, 0 0 0 8px #FF69B4"
        }}>
          <h3 style={{ color: "#FF69B4", marginBottom: "10px" }}>📋 My Tasks</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map(task => (
              <li key={task.id} style={{
                margin: "6px 0", color: task.done ? "#0f0" : "#fff",
                textDecoration: task.done ? "line-through" : "none"
              }}>{task.text}</li>
            ))}
          </ul>
          <button onClick={() => setTaskSheetOpen(false)} style={{
            marginTop: "15px", padding: "8px 12px", fontFamily: "'Press Start 2P', monospace",
            backgroundColor: "#FF69B4", color: "#222", border: "2px solid #fff",
            cursor: "pointer", textShadow: "1px 1px #000", display: "block", width: "100%"
          }}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
