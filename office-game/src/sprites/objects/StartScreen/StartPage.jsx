import React, { useState } from 'react';
import StartImg from './start.jpeg';
import StartButton from './StartButton.png';
import JennyImg from '../../player/Jenny/Jenny-closemouth.png';

export default function StartPage({ onStart }) {
  const [showInstructions, setShowInstructions] = useState(false);


  const handleStart = () => {
    console.log('Start button clicked'); // Debug log
    setShowInstructions(true);
  };

  const handleConfirmStart = () => {
    if (onStart) {
      onStart();
    }
  };



  return (
    <>
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
          @keyframes buttonBounce {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.05);
            }
          }
          @keyframes popupFadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${StartImg})`,
          backgroundSize: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#f0f0f0',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px',
          fontFamily: "'Press Start 2P', monospace"
        }}
      >
      {/* Bouncing Jenny on the left side - bigger size for start screen */}
      <div>
        <img 
          src={JennyImg} 
          alt="Jenny" 
          style={{
            width: '450px',
            height: '470px',
            imageRendering: 'pixelated',
            animation: 'bounce 1s infinite'
          }}
        />
      </div>


      {/* Start button in bottom right corner */}
      <button
        onClick={handleStart}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '80px',
          borderRadius: '12px',
          animation: 'buttonBounce 2s infinite',
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        <img 
        src={StartButton} 
        alt="Start Game" 
        style={{
          width: '320px',
          height: '150px',
          imageRendering: 'pixelated'
        }}
      />
      </button>
      </div>

      {/* Instructions Popup */}
      {showInstructions && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          animation: 'popupFadeIn 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: '#1a1a1a',
            border: '4px solid #ff69b4',
            borderRadius: '15px',
            padding: '40px',
            maxWidth: '600px',
            textAlign: 'center',
            fontFamily: "'Press Start 2P', monospace",
            color: '#ff69b4',
            boxShadow: '0 0 30px rgba(255, 105, 180, 0.5)'
          }}>
            <h2 style={{
              fontSize: '18px',
              marginBottom: '30px',
              color: '#ff69b4',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
            }}>
               GAME OBJECTIVE
            </h2>
            
            <div style={{
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '30px',
              color: '#ffffff'
            }}>
              <p style={{ marginBottom: '20px' }}>
                Complete all tasks to win the game!
              </p>
              <p style={{ marginBottom: '20px', color: '#ff69b4' }}>
                 IMPORTANT: Keep your stress level below 60!
              </p>
              <p style={{ marginBottom: '20px' }}>
                If your stress reaches 60 or higher, you won't be able to talk to the boss and complete the game.
              </p>
              <p style={{ fontSize: '12px', color: '#cccccc' }}>
                 Tip: Balance your tasks with coffee breaks and colleague chats!
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center'
            }}>
              <button
                onClick={handleConfirmStart}
                style={{
                  backgroundColor: '#ff69b4',
                  color: '#000000',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ff1493';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff69b4';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                CONTINUE
              </button>
              
              <button
                onClick={() => setShowInstructions(false)}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ff69b4',
                  border: '2px solid #ff69b4',
                  padding: '15px 30px',
                  borderRadius: '8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#ff69b4';
                  e.target.style.color = '#000000';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ff69b4';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}