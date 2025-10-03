// src/App.js
import React, { useState, useEffect } from "react";
import GameMap from "./Components/Objects/GameBackground.js";
import Sprite from "./sprites/player/Jenny/jennySprite.js";
import Cup from "./Components/Objects/CoffeeMachine.jsx";
import Printer from "./Components/Objects/Printer.jsx";
import BossSprite from "./Components/Objects/BossSprite.js";
import BossQuiz from "./Components/Objects/BossQuiz.js";
import StatsComponent from "./Components/Stats/StatsMain.jsx";
import Colleague from "./Components/Objects/colleagues";
import StickyNoteImg from "./sprites/objects/Interactables/stickynote.png";
import DeskComputer from "./Components/Objects/deskComputer";
import StartPage from "./sprites/objects/StartScreen/StartPage.jsx";
import GameSound from "./Sounds/gameSound.mp3";
import PointAddSound from "./Sounds/pointAdd.mp3";

// Colleague sprites
import ColleagueAlona from "./sprites/player/Alona/Alona.png";
import ColleagueCatherine from "./sprites/player/Catherine/Catherine.png";
import ColleagueEmma from "./sprites/player/Emma/Emma.png";
import ColleaguePrecious from "./sprites/player/Precious/Precious.png";
import ColleagueBlonde from "./sprites/player/Staff/Blondestaff.png";
import ColleagueDirtyBlondeGlassesStaff from "./sprites/player/Staff/DirtyBlondeGlassesStaff.png";
import ColleaguePinkStaff from "./sprites/player/Staff/PinkStaff.png";
import ColleagueBrownhairStaff from "./sprites/player/Staff/Brownhairstaff.png";
import ColleagueTamie from "./sprites/player/Tamie/Tamie.png";

function App() {
  // Start screen state
  const [gameStarted, setGameStarted] = useState(false);

  // Jenny position
  const [jennyX, setJennyX] = useState(100);
  const [jennyY, setJennyY] = useState(100);
  const [playerPos, setPlayerPos] = useState({ x: 100, y: 100 });

  // Laptop mini-game state
  const [laptopMenuActive, setLaptopMenuActive] = useState(false);
  const [emailGameActive, setEmailGameActive] = useState(false);
  const [wifiGameActive, setWifiGameActive] = useState(false);
  const [pensionGameActive, setPensionGameActive] = useState(false);

  // Email game
  const [emails, setEmails] = useState([]);
  const [score, setScore] = useState(0);

  // Pension calculator
  const [age, setAge] = useState(30);
  const [contribution, setContribution] = useState(200);
  const [growth, setGrowth] = useState(5);
  const [years, setYears] = useState(35);
  const [pensionResult, setPensionResult] = useState(null);

  // Coffee & printer
  const [coffeeLevel, setCoffeeLevel] = useState(0);
  const [cupFilling, setCupFilling] = useState(false);
  const [printerActive, setPrinterActive] = useState(false);

  // Boss quiz
  const [quizAvailable, setQuizAvailable] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Caffeine warning
  const [showCaffeineWarning, setShowCaffeineWarning] = useState(false);
  
  // Game sound
  const [gameAudio, setGameAudio] = useState(null);
  
  // Function to play point add sound
  const playPointAddSound = () => {
    const audio = new Audio(PointAddSound);
    audio.volume = 0.5; // Set volume to 50%
    audio.play().catch(error => {
      console.log('Point add sound failed:', error);
    });
  };

  // Colleague interaction
  const [speakingColleague, setSpeakingColleague] = useState(null);
  const [talkedColleagues, setTalkedColleagues] = useState([]);

  // Stress points
  const [stressPoints, setStressPoints] = useState(0);
  const [showStressPopup, setShowStressPopup] = useState(false);

  // Learning stat
  const [learningStat, setLearningStat] = useState(0);

  // Personal work stat
  const [personalWorkStat, setPersonalWorkStat] = useState(0);

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
  const cupX = 470, cupY = 20;
  const printerX = 1080, printerY = 320;
  const bossX = 1000, bossY = 200;
  const computerX = 1050, computerY = 500;
 
  // Colleagues
  const colleagues = [
    { id: 1, name: "Alona", sprite: ColleagueAlona, x: 300, y: 155, fact: "On average, women are on track to receive £7,000 less per year in retirement income than men.Core value: Keep client data confidential.", },
    { id: 2, name: "Catherine", sprite: ColleagueCatherine, x: 687, y: 655, fact: "Approximately 1.4 million women in the UK miss out on auto-enrolment into a pension because they earn under £10,000 a year." },
     { id: 3, name: "Precious", sprite: ColleaguePrecious, x: 330, y: 600, fact: "Taking a career break of just 2.5 years can reduce a mother's pension pot by £8,000." },
    { id: 4, name: "Jemma", sprite: ColleagueBlonde, x: 700, y: 340, fact: "A striking 60% of divorced women do not discuss pensions during their divorce proceedings." },
    { id: 5, name: "Sarah", sprite: ColleagueDirtyBlondeGlassesStaff, x: 530, y: 400, fact: "In the UK, women are significantly more likely to work part-time than men, impacting their ability to save." },
    { id: 6, name: "Rose", sprite: ColleaguePinkStaff, x: 490, y: 260, fact: "Combining multiple old pensions into a single pot is a common and effective way to simplify tracking and management." },
    { id: 7, name: "Tamie", sprite: ColleagueTamie, x: 555, y: 520, fact: "For every £80 you put into your pension, the government typically tops it up by £20 in tax relief." },
    { id: 8, name: "Lucy", sprite: ColleagueBrownhairStaff, x: 920, y: 550, fact: "The minimum age you can access your private pension is rising to 57 in 2028." },
    { id: 9, name: "Emma", sprite: ColleagueEmma, x: 850, y: 680, fact: "The primary reason women often have smaller pensions is that time off for childcare and career breaks reduces their contributions." }
  ];
  // Update player position
  const updatePlayerPos = (x, y) => {
    setPlayerPos({ x, y });
    setJennyX(x);
    setJennyY(y);
  };

  // Coffee
  const handleFillCoffee = () => {
    // Add 10 stress points directly when coffee is poured
    handleStressChange(10);
    markTaskDone(1); // Mark coffee task as done
  };

  // Printer
  const handleUsePrinter = () => {
    setPrinterActive(true);
    setTimeout(() => setPrinterActive(false), 2000);
    markTaskDone(2);
    // Add 10 points to personal work stat (capped at 100)
    setPersonalWorkStat(prev => {
      const newValue = Math.min(prev + 10, 100);
      playPointAddSound();
      return newValue;
    });
  };

  // Boss
  const handleBossInteract = () => {
    if (quizAvailable) setShowQuiz(true);
  };

  // Colleague interaction
  const handleColleagueTalk = (colleagueId) => {
    setSpeakingColleague(colleagueId);
    // Auto-hide speech bubble after 3 seconds
    setTimeout(() => {
      setSpeakingColleague(null);
    }, 3000);

    // Add 10 points to learning stat (capped at 100)
    setLearningStat(prev => {
      const newValue = Math.min(prev + 10, 100);
      playPointAddSound();
      return newValue;
    });

    setTalkedColleagues(prev => {
      if (!prev.includes(colleagueId)) {
        const newList = [...prev, colleagueId];
        setTasks(prevTasks => prevTasks.map(task =>
          task.id === 6 ? { ...task, text: `💬 Talk to colleagues ${newList.length}/9`, done: newList.length >= 9 } : task
        ));
        return newList;
      }
      return prev;
    });
  };


  const handleStressChange = (points) => {
    setStressPoints(prev => {
      const newTotal = Math.min(prev + points, 100);
      
      // Play sound effect when stat is updated
      playPointAddSound();
      
      // Check if stress reaches 100 or more
      if (newTotal >= 100) {
        setShowStressPopup(true);
      }
      
      return newTotal;
    });
  };

  const handleQuizComplete = (passed, score, total) => {
    setShowQuiz(false);
    setQuizAvailable(false);
    alert(`Quiz finished! Score: ${score}/${total}. ${passed ? "✅ You passed!" : "❌ Try again tomorrow!"}`);
  };

  // Tasks
  const markTaskDone = (taskId) => {
    setTasks(prev => prev.map(task => task.id === taskId ? { ...task, done: true } : task));
  };

  // Pension Calculator Function
  const calculatePension = () => {
    let futureValue = 0;
    for (let i = 0; i < years; i++) {
      futureValue = (futureValue + contribution * 12) * (1 + growth / 100);
    }
    setPensionResult(futureValue.toFixed(2));
    markTaskDone(5);
  };

  // Mini-game functions
  const startEmailGame = () => {
    setScore(0);
    setEmails([
      { id: 1, text: "Email: Urgent client issue"},
      { id: 2, text: "Email: Team meeting invite"},
      { id: 3, text: "Email: Newsletter subscription"},
    ]);
    setEmailGameActive(true);
    setLaptopMenuActive(false);
    markTaskDone(3); // Mark email task as done when started
  };

  const startWifiGame = () => {
    setWifiGameActive(true);
    setLaptopMenuActive(false);
    markTaskDone(4); // Mark Wi-Fi task as done when started
  };

  const startPensionGame = () => {
    setPensionGameActive(true);
    setLaptopMenuActive(false);
  };

  const handleClickEmail = (email) => {
    if (emails[0].id === email.id) {
      setScore(score + 1);
      setEmails(emails.slice(1));
      if (emails.length === 1) {
        setTimeout(() => {
          alert("All emails sorted! ✅");
          setEmailGameActive(false);
        }, 500);
      }
    } else {
      alert("Oops! Wrong email. Try again.");
    }
  };

  const handleWifiConnect = (network) => {
    if (network === "Office_WiFi") {
      alert("Connected to Wi-Fi! ✅");
      setWifiGameActive(false);
    } else {
      alert("Wrong network! ❌ Try 'Office_WiFi'");
    }
  };

  // Spacebar interactions for all objects
  const handleSpacebar = (event) => {
    if (event.code !== "Space") return;

    // Laptop/Computer interaction
    const distToComputer = Math.hypot(jennyX - computerX, jennyY - computerY);
    if (distToComputer < 50) {
      setLaptopMenuActive(true);
      return;
    }

    // Boss interaction
    const bossDist = Math.hypot(jennyX - bossX, jennyY - bossY);
    if (bossDist < 80 && quizAvailable) {
      handleBossInteract();
      return;
    }

    // Coffee machine interaction is now handled by the Sprite component

    // Printer interaction is now handled by the Sprite component

    // Colleague interaction
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
  }, [jennyX, jennyY, quizAvailable, talkedColleagues, emails, score]);

  useEffect(() => {
    const allDone = tasks.every(task => task.done);
    const stressLowEnough = stressPoints < 60;
    setQuizAvailable(allDone && stressLowEnough);
    
    // Show caffeine warning if all tasks done but stress is too high
    if (allDone && stressPoints >= 60) {
      setShowCaffeineWarning(true);
    } else {
      setShowCaffeineWarning(false);
    }
  }, [tasks, stressPoints]);

  // Sound that plays immediately when page loads and continues throughout
  useEffect(() => {
    console.log('App component mounted - starting background sound for start screen');
    
    // Stop any existing audio first
    if (gameAudio) {
      console.log('Stopping existing audio');
      gameAudio.pause();
      gameAudio.currentTime = 0;
    }
    
    const audio = new Audio(GameSound);
    audio.loop = true;
    audio.volume = 0.3; // Lower volume to be less intrusive
    audio.preload = 'auto';
    
    // Add event listeners for debugging
    audio.addEventListener('loadstart', () => {
      console.log('Background sound loading...');
    });
    
    audio.addEventListener('canplay', () => {
      console.log('Background sound can play');
    });
    
    audio.addEventListener('play', () => {
      console.log('🎵 Background sound is now playing on start screen');
    });
    
    audio.addEventListener('ended', () => {
      console.log('Background sound ended - should loop automatically');
    });
    
    audio.addEventListener('error', (e) => {
      console.log('❌ Audio error:', e);
    });
    
    // Try to play immediately with more aggressive retry
    const playAudio = async () => {
      try {
        console.log('Attempting to play background sound...');
        await audio.play();
        console.log('✅ Background sound started successfully');
      } catch (error) {
        console.log('❌ Background sound failed:', error);
        console.log('Error details:', error.name, error.message);
        
        // More aggressive retry attempts
        const retryPlay = (attempt = 1) => {
          console.log(`Retry attempt ${attempt} for background sound...`);
          audio.play().catch(err => {
            console.log(`Retry ${attempt} failed:`, err);
            if (attempt < 5) {
              setTimeout(() => retryPlay(attempt + 1), 1000 * attempt);
            }
          });
        };
        
        setTimeout(() => retryPlay(), 500);
      }
    };
    
    // Start playing immediately when component mounts
    playAudio();
    setGameAudio(audio);
    
    return () => {
      console.log('Background sound cleanup on unmount');
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []); // Empty dependency array - runs once when component mounts

  return (
    <div>
      {/* Global CSS for bouncing animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}
      </style>
      
      {/* Start Screen (only show when game is not started) */}
      {!gameStarted && <StartPage onStart={() => setGameStarted(true)} />}
      
      {/* Main Game (only show when game is started) */}
      {gameStarted && (
        <>
          <h1 style={{ textAlign: "center", marginTop: "-0.2px", marginBottom: "-30px", backgroundColor: "#FFFFFF" }}>🏦 Jenny's First Day at Lloyds Bank </h1>
          <GameMap />
          <StatsComponent stressPoints={stressPoints} learningStat={learningStat} setLearningStat={setLearningStat} personalWorkStat={personalWorkStat} setPersonalWorkStat={setPersonalWorkStat} />

      {/* Coffee & Printer */}
      <Cup x={cupX} y={cupY} isFilling={cupFilling} />
      <Printer x={printerX} y={printerY} isPrinting={printerActive} />

      {/* Colleagues */}
      {colleagues.map(col => (
        <Colleague key={col.id} x={col.x} y={col.y} sprite={col.sprite} speech={speakingColleague === col.id ? col.fact : null} />
      ))}

      {/* Jenny Sprite */}
      <Sprite
        cupX={cupX} cupY={cupY}
        printerX={printerX} printerY={printerY}
        computerX={computerX} computerY={computerY}
        onFillCoffee={handleFillCoffee}
        onUsePrinter={handleUsePrinter}
        onUseComputer={() => {
          setLaptopMenuActive(true);
          // Add 10 points to personal work stat when using laptop (capped at 100)
          setPersonalWorkStat(prev => {
            const newValue = Math.min(prev + 10, 100);
            playPointAddSound();
            return newValue;
          });
        }}
        bossX={bossX} bossY={bossY}
        onStartBossQuiz={handleBossInteract}
        setPlayerPos={updatePlayerPos}
        colleagues={colleagues}
        onColleagueTalk={handleColleagueTalk}
      />

      {/* Boss */}
      <BossSprite bossX={bossX} bossY={bossY} playerX={jennyX} playerY={jennyY} onBossInteract={handleBossInteract} isQuizAvailable={quizAvailable} />

      {/* Desk computer */}
      <DeskComputer x={computerX} y={computerY} />

      {/* Boss Quiz */}
      {showQuiz && <BossQuiz onQuizComplete={handleQuizComplete} />}

      {/* Stress Popup */}
      {showStressPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3000,
          fontFamily: "'Press Start 2P', monospace"
        }}>
          <div style={{
            backgroundColor: '#222',
            border: '4px solid #FF69B4',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            color: '#fff',
            maxWidth: '500px',
            boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)'
          }}>
            <h2 style={{ 
              color: '#FF69B4', 
              marginBottom: '20px',
              fontSize: '18px',
              lineHeight: '1.5'
            }}>
              😰 STRESS OVERLOAD! 😰
            </h2>
            <p style={{ 
              marginBottom: '30px',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Jenny was too stressed on her first day<br/>
              that she had to go home!<br/><br/>
              Stress Level: {stressPoints}/100
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowStressPopup(false);
                  setShowCaffeineWarning(false);
                  // Stop game audio
                  if (gameAudio) {
                    gameAudio.pause();
                    gameAudio.currentTime = 0;
                  }
                  // Reset the entire game
                  setGameStarted(false);
                  setStressPoints(0);
                  setLearningStat(0);
                  setPersonalWorkStat(0);
                  setSpeakingColleague(null);
                  setTalkedColleagues([]);
                  setTaskSheetOpen(false);
                  setTasks([
                    { id: 1, text: "☕ Get a coffee", done: false },
                    { id: 2, text: "🖨️ Use the printer", done: false },
                    { id: 3, text: "📧 Respond to emails", done: false },
                    { id: 4, text: "📡 Connect to Wi-Fi", done: false },
                    { id: 5, text: "💰 Try the pension calculator", done: false },
                    { id: 6, text: "💬 Talk to colleagues 0/9", done: false },
                  ]);
                  // quizAvailable will be set by useEffect based on tasks and stress
                  setShowQuiz(false);
                  setLaptopMenuActive(false);
                }}
                style={{
                  padding: '15px 30px',
                  fontFamily: "'Press Start 2P', monospace",
                  backgroundColor: '#FF69B4',
                  color: '#222',
                  border: '2px solid #fff',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  fontSize: '14px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF1493'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FF69B4'}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Caffeine Warning Popup */}
      {showCaffeineWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 3000,
          fontFamily: "'Press Start 2P', monospace"
        }}>
          <div style={{
            backgroundColor: '#222',
            border: '4px solid #FFA500',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            color: '#fff',
            maxWidth: '500px',
            boxShadow: '0 0 20px rgba(255, 165, 0, 0.5)'
          }}>
            <h2 style={{ 
              color: '#FFA500', 
              marginBottom: '20px',
              fontSize: '18px',
              lineHeight: '1.4'
            }}>
              ☕ Too Much Caffeine! ☕
            </h2>
            <p style={{ 
              marginBottom: '30px',
              fontSize: '12px',
              lineHeight: '1.5',
              color: '#FFD700'
            }}>
              Jenny has had too much coffee and is too stressed to face the boss!<br/>
              She needs to calm down (stress &lt; 60) before taking the final quiz.
            </p>
            <button
              onClick={() => setShowCaffeineWarning(false)}
              style={{
                backgroundColor: '#FFA500',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                fontSize: '12px',
                fontFamily: "'Press Start 2P', monospace",
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#FFD700'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FFA500'}
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Laptop Menu Popup */}
      {laptopMenuActive && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffebf3',
    padding: '25px',
    border: '4px solid #ff69b4',
    borderRadius: '0px',
    zIndex: 1000,
    minWidth: '400px',
    boxShadow: '8px 8px 0px #d1478c',
    borderImage: 'repeating-linear-gradient(45deg, #ff69b4, #ff69b4 4px, #ffebf3 4px, #ffebf3 8px) 4',
    fontFamily: "'Press Start 2P', monospace",
    imageRendering: 'pixelated'
  }}>
    <h2 style={{
      color: '#ff1493',
      textAlign: 'center',
      fontSize: '18px',
      textShadow: '2px 2px 0px #ff69b4',
      marginBottom: '20px'
    }}>💻 LAPTOP MENU</h2>
    <p style={{
      textAlign: 'center',
      color: '#8b008b',
      fontSize: '10px',
      marginBottom: '25px'
    }}>Select a task to complete:</p>
   
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
      <button
        onClick={startEmailGame}
        style={{
          padding: '15px',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: '3px solid #cc5555',
          borderRadius: '0px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '2px 2px 0px #cc5555',
          boxShadow: '4px 4px 0px #cc5555',
          transition: 'all 0.1s',
          imageRendering: 'pixelated'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #cc5555';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #cc5555';
        }}
      >
        📧 RESPOND TO EMAILS
      </button>
     
      <button
        onClick={startWifiGame}
        style={{
          padding: '15px',
          backgroundColor: '#4ecdc4',
          color: 'white',
          border: '3px solid #2da8a0',
          borderRadius: '0px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '2px 2px 0px #2da8a0',
          boxShadow: '4px 4px 0px #2da8a0',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #2da8a0';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #2da8a0';
        }}
      >
        📡 CONNECT TO WI-FI
      </button>
     
      <button
        onClick={startPensionGame}
        style={{
          padding: '15px',
          backgroundColor: '#45b7d1',
          color: 'white',
          border: '3px solid #2a8fa5',
          borderRadius: '0px',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '2px 2px 0px #2a8fa5',
          boxShadow: '4px 4px 0px #2a8fa5',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #2a8fa5';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #2a8fa5';
        }}
      >
        💰 PENSION CALCULATOR
      </button>
    </div>
   
    <button
      onClick={() => setLaptopMenuActive(false)}
      style={{
        padding: '12px 20px',
        backgroundColor: '#999',
        color: 'white',
        border: '3px solid #777',
        borderRadius: '0px',
        cursor: 'pointer',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '10px',
        textShadow: '2px 2px 0px #777',
        boxShadow: '4px 4px 0px #777',
        transition: 'all 0.1s',
        display: 'block',
        margin: '0 auto'
      }}
      onMouseDown={e => {
        e.target.style.transform = 'translate(4px, 4px)';
        e.target.style.boxShadow = '2px 2px 0px #777';
      }}
      onMouseUp={e => {
        e.target.style.transform = 'translate(0px, 0px)';
        e.target.style.boxShadow = '4px 4px 0px #777';
      }}
    >
      CLOSE MENU
    </button>
  </div>
)}
 
 {/* Email Mini-Game Popup */}
{emailGameActive && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff9c4',
    padding: '25px',
    border: '4px solid #ffd700',
    borderRadius: '0px',
    zIndex: 1000,
    minWidth: '500px',
    boxShadow: '8px 8px 0px #ccaa00',
    fontFamily: "'Press Start 2P', monospace",
    imageRendering: 'pixelated'
  }}>
    <h2 style={{
      color: '#b8860b',
      textAlign: 'center',
      fontSize: '16px',
      textShadow: '2px 2px 0px #ffd700',
      marginBottom: '15px'
    }}>📧 EMAIL PRIORITY CHALLENGE!</h2>
    <p style={{ textAlign: 'center', color: '#8b7500', fontSize: '9px', marginBottom: '5px' }}>
      Click emails in order of priority (1 = highest priority):
    </p>
    <p style={{ textAlign: 'center', color: '#8b7500', fontSize: '10px', marginBottom: '20px' }}>
      <strong>SCORE: {score}</strong>
    </p>
   
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '20px 0' }}>
      {emails.map((email) => (
        <button
          key={email.id}
          onClick={() => handleClickEmail(email)}
          style={{
            padding: '12px',
            backgroundColor: '#ffeaa7',
            border: '3px solid #fdcb6e',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '10px',
            textAlign: 'left',
            fontFamily: "'Press Start 2P', monospace",
            boxShadow: '4px 4px 0px #d4ac0d',
            transition: 'all 0.1s',
            color: '#8b7500'
          }}
          onMouseDown={e => {
            e.target.style.transform = 'translate(4px, 4px)';
            e.target.style.boxShadow = '2px 2px 0px #d4ac0d';
          }}
          onMouseUp={e => {
            e.target.style.transform = 'translate(0px, 0px)';
            e.target.style.boxShadow = '4px 4px 0px #d4ac0d';
          }}
        >
          <strong>{email.text}</strong> (Priority: {email.priority})
        </button>
      ))}
    </div>
 
    <button
      onClick={() => setEmailGameActive(false)}
      style={{
        padding: '10px 20px',
        backgroundColor: '#999',
        color: 'white',
        border: '3px solid #777',
        borderRadius: '0px',
        cursor: 'pointer',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px',
        textShadow: '2px 2px 0px #777',
        boxShadow: '4px 4px 0px #777',
        transition: 'all 0.1s',
        display: 'block',
        margin: '0 auto'
      }}
      onMouseDown={e => {
        e.target.style.transform = 'translate(4px, 4px)';
        e.target.style.boxShadow = '2px 2px 0px #777';
      }}
      onMouseUp={e => {
        e.target.style.transform = 'translate(0px, 0px)';
        e.target.style.boxShadow = '4px 4px 0px #777';
      }}
    >
      CLOSE EMAIL GAME
    </button>
  </div>
)}
     
     {/* Wi-Fi Mini-Game Popup */}
{wifiGameActive && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#e0f7fa',
    padding: '25px',
    border: '4px solid #4ecdc4',
    borderRadius: '0px',
    zIndex: 1000,
    minWidth: '400px',
    boxShadow: '8px 8px 0px #2da8a0',
    fontFamily: "'Press Start 2P', monospace",
    imageRendering: 'pixelated'
  }}>
    <h2 style={{
      color: '#008b8b',
      textAlign: 'center',
      fontSize: '16px',
      textShadow: '2px 2px 0px #4ecdc4',
      marginBottom: '15px'
    }}>📡 CONNECT TO WI-FI</h2>
    <p style={{ textAlign: 'center', color: '#006666', fontSize: '9px', marginBottom: '20px' }}>
      Select the correct office network:
    </p>
   
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
      {["Guest_WiFi", "Office_WiFi", "Cafe_Free"].map((network) => (
        <button
          key={network}
          onClick={() => handleWifiConnect(network)}
          style={{
            padding: '15px',
           
            border: '3px solid #4ecdc4',
            borderRadius: '0px',
            cursor: 'pointer',
            fontSize: '12px',
          
            fontFamily: "'Press Start 2P', monospace",
          
            boxShadow: '4px 4px 0px #2da8a0',
            transition: 'all 0.1s'
          }}
          onMouseDown={e => {
            e.target.style.transform = 'translate(4px, 4px)';
            e.target.style.boxShadow = '2px 2px 0px #2da8a0';
          }}
          onMouseUp={e => {
            e.target.style.transform = 'translate(0px, 0px)';
            e.target.style.boxShadow = '4px 4px 0px #2da8a0';
          }}
        >
          {network}
        </button>
      ))}
    </div>
 
    <button
      onClick={() => setWifiGameActive(false)}
      style={{
        padding: '10px 20px',
        backgroundColor: '#999',
        color: 'white',
        border: '3px solid #777',
        borderRadius: '0px',
        cursor: 'pointer',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '9px',
        textShadow: '2px 2px 0px #777',
        boxShadow: '4px 4px 0px #777',
        transition: 'all 0.1s',
        display: 'block',
        margin: '0 auto'
      }}
      onMouseDown={e => {
        e.target.style.transform = 'translate(4px, 4px)';
        e.target.style.boxShadow = '2px 2px 0px #777';
      }}
      onMouseUp={e => {
        e.target.style.transform = 'translate(0px, 0px)';
        e.target.style.boxShadow = '4px 4px 0px #777';
      }}
    >
      CLOSE WI-FI GAME
    </button>
  </div>
)}{/* Pension Calculator Popup */}
{pensionGameActive && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#e3f2fd',
    padding: '25px',
    border: '4px solid #45b7d1',
    borderRadius: '0px',
    zIndex: 1000,
    minWidth: '450px',
    boxShadow: '8px 8px 0px #2a8fa5',
    fontFamily: "'Press Start 2P', monospace",
    imageRendering: 'pixelated'
  }}>
    <h2 style={{
      color: '#1565c0',
      textAlign: 'center',
      fontSize: '16px',
      textShadow: '2px 2px 0px #45b7d1',
      marginBottom: '15px'
    }}>💰 PENSION CALCULATOR</h2>
    <p style={{ textAlign: 'center', color: '#0d47a1', fontSize: '9px', marginBottom: '20px' }}>
      Estimate your future pension savings:
    </p>
   
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
      {[
        { label: "CURRENT AGE:", value: age, min: 18, max: 65, onChange: setAge },
        { label: "MONTHLY CONTRIBUTION (£):", value: contribution, min: 50, max: 2000, onChange: setContribution },
        { label: "EXPECTED GROWTH RATE (%):", value: growth, min: 1, max: 15, step: 0.5, onChange: setGrowth },
        { label: "YEARS UNTIL RETIREMENT:", value: years, min: 1, max: 50, onChange: setYears }
      ].map((field, index) => (
        <div key={index}>
          <label style={{ color: '#0d47a1', fontSize: '8px', display: 'block', marginBottom: '5px' }}>
            <strong>{field.label}</strong>
          </label>
          <input
            type="number"
            value={field.value}
            min={field.min}
            max={field.max}
            step={field.step || 1}
            onChange={(e) => field.onChange(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              border: '3px solid #45b7d1',
              borderRadius: '0px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              backgroundColor: '#ffffff',
              imageRendering: 'pixelated'
            }}
          />
        </div>
      ))}
    </div>
 
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
      <button
        onClick={calculatePension}
        style={{
          padding: '12px 20px',
          backgroundColor: '#45b7d1',
          color: 'white',
          border: '3px solid #2a8fa5',
          borderRadius: '0px',
          cursor: 'pointer',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '2px 2px 0px #2a8fa5',
          boxShadow: '4px 4px 0px #2a8fa5',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #2a8fa5';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #2a8fa5';
        }}
      >
        CALCULATE
      </button>
    </div>
 
    {pensionResult && (
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#bbdefb',
        border: '3px solid #1565c0',
        borderRadius: '0px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#0d47a1', fontSize: '12px', marginBottom: '10px' }}>💰 ESTIMATED PENSION POT:</h3>
        <p style={{ fontSize: '18px', color: '#1565c0', fontWeight: 'bold', textShadow: '2px 2px 0px #90caf9' }}>
          £{parseFloat(pensionResult).toLocaleString()}
        </p>
        <p style={{ fontSize: '8px', color: '#0d47a1', marginTop: '8px' }}>
          Based on {years} years of contributions with {growth}% annual growth
        </p>
      </div>
    )}
 
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button
        onClick={() => setPensionGameActive(false)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#999',
          color: 'white',
          border: '3px solid #777',
          borderRadius: '0px',
          cursor: 'pointer',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          textShadow: '2px 2px 0px #777',
          boxShadow: '4px 4px 0px #777',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #777';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #777';
        }}
      >
        CLOSE CALCULATOR
      </button>
    </div>
  </div>
)}
      {/* Pension Calculator Popup */}
{pensionGameActive && (
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#e3f2fd',
    padding: '25px',
    border: '4px solid #45b7d1',
    borderRadius: '0px',
    zIndex: 1000,
    minWidth: '450px',
    boxShadow: '8px 8px 0px #2a8fa5',
    fontFamily: "'Press Start 2P', monospace",
    imageRendering: 'pixelated'
  }}>
    <h2 style={{
      color: '#1565c0',
      textAlign: 'center',
      fontSize: '16px',
      textShadow: '2px 2px 0px #45b7d1',
      marginBottom: '15px'
    }}>💰 PENSION CALCULATOR</h2>
    <p style={{ textAlign: 'center', color: '#0d47a1', fontSize: '9px', marginBottom: '20px' }}>
      Estimate your future pension savings:
    </p>
   
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
      {[
        { label: "CURRENT AGE:", value: age, min: 18, max: 65, onChange: setAge },
        { label: "MONTHLY CONTRIBUTION (£):", value: contribution, min: 50, max: 2000, onChange: setContribution },
        { label: "EXPECTED GROWTH RATE (%):", value: growth, min: 1, max: 15, step: 0.5, onChange: setGrowth },
        { label: "YEARS UNTIL RETIREMENT:", value: years, min: 1, max: 50, onChange: setYears }
      ].map((field, index) => (
        <div key={index}>
          <label style={{ color: '#0d47a1', fontSize: '8px', display: 'block', marginBottom: '5px' }}>
            <strong>{field.label}</strong>
          </label>
          <input
            type="number"
            value={field.value}
            min={field.min}
            max={field.max}
            step={field.step || 1}
            onChange={(e) => field.onChange(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '8px',
              border: '3px solid #45b7d1',
              borderRadius: '0px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '10px',
              backgroundColor: '#ffffff',
              imageRendering: 'pixelated'
            }}
          />
        </div>
      ))}
    </div>
 
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
      <button
        onClick={calculatePension}
        style={{
          padding: '12px 20px',
          backgroundColor: '#45b7d1',
          color: 'white',
          border: '3px solid #2a8fa5',
          borderRadius: '0px',
          cursor: 'pointer',
          fontSize: '10px',
          fontWeight: 'bold',
          fontFamily: "'Press Start 2P', monospace",
          textShadow: '2px 2px 0px #2a8fa5',
          boxShadow: '4px 4px 0px #2a8fa5',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #2a8fa5';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #2a8fa5';
        }}
      >
        CALCULATE
      </button>
    </div>
 
    {pensionResult && (
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#bbdefb',
        border: '3px solid #1565c0',
        borderRadius: '0px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#0d47a1', fontSize: '12px', marginBottom: '10px' }}>💰 ESTIMATED PENSION POT:</h3>
        <p style={{ fontSize: '18px', color: '#1565c0', fontWeight: 'bold', textShadow: '2px 2px 0px #90caf9' }}>
          £{parseFloat(pensionResult).toLocaleString()}
        </p>
        <p style={{ fontSize: '8px', color: '#0d47a1', marginTop: '8px' }}>
          Based on {years} years of contributions with {growth}% annual growth
        </p>
      </div>
    )}
 
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <button
        onClick={() => setPensionGameActive(false)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#999',
          color: 'white',
          border: '3px solid #777',
          borderRadius: '0px',
          cursor: 'pointer',
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '9px',
          textShadow: '2px 2px 0px #777',
          boxShadow: '4px 4px 0px #777',
          transition: 'all 0.1s'
        }}
        onMouseDown={e => {
          e.target.style.transform = 'translate(4px, 4px)';
          e.target.style.boxShadow = '2px 2px 0px #777';
        }}
        onMouseUp={e => {
          e.target.style.transform = 'translate(0px, 0px)';
          e.target.style.boxShadow = '4px 4px 0px #777';
        }}
      >
        CLOSE CALCULATOR
      </button>
    </div>
  </div>
)}

      {/* Task Sheet */}
      <div
        style={{ position: "absolute", bottom: "20px", left: "20px", cursor: "pointer", zIndex: 1100 }}
        onClick={() => setTaskSheetOpen(true)}
      >
        <img src={StickyNoteImg} alt="Task Sheet" style={{ width: "100px", height: "100px" }} />
      </div>
      {taskSheetOpen && (
        <div style={{
          position: "absolute", left: "50px", bottom: "100px",
          backgroundColor: "#222", border: "4px solid #FF69B4", padding: "20px",
          zIndex: 1200, width: "350px", fontFamily: "'Press Start 2P', monospace",
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
        </>
      )}
    </div>
  );
}

export default App;
