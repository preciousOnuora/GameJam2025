import React, { useEffect } from 'react';
import StartImg from './start.jpeg';
import StartButton from './StartButton.png';
import JennyImg from '../../player/Jenny/Jenny-closemouth.png';
import GameSound from '../../../Sounds/gameSound.mp3';

export default function StartPage({ onStart }) {
  // Try to start sound on first user interaction
  useEffect(() => {
    const tryStartSound = () => {
      console.log('StartPage: Attempting to start sound on user interaction');
      const audio = new Audio(GameSound);
      audio.loop = true;
      audio.volume = 0.3;
      
      audio.play().then(() => {
        console.log('✅ StartPage: Sound started successfully on user interaction');
      }).catch(error => {
        console.log('❌ StartPage: Sound failed on user interaction:', error);
      });
    };

    // Try to start sound on any user interaction
    const handleUserInteraction = () => {
      tryStartSound();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    // Add listeners for user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handleStart = () => {
    console.log('Start button clicked'); // Debug log
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

      {/* Sound indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: '#ff69b4',
        padding: '10px 15px',
        borderRadius: '8px',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '12px',
        border: '2px solid #ff69b4'
      }}>
        🔊 Click anywhere to start music
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
    </>
  );
}