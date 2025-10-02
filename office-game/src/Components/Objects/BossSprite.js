import React, { useState, useEffect } from "react";

import BossImg from "../../sprites/player/Boss/Boss.png";

 

function BossSprite({ bossX, bossY, onBossInteract, isQuizAvailable, playerX, playerY }) {

  const [showLabel, setShowLabel] = useState(false);

 

  useEffect(() => {

    const distance = Math.sqrt(Math.pow(playerX - bossX, 2) + Math.pow(playerY - bossY, 2));

    setShowLabel(distance < 80 && isQuizAvailable);

  }, [playerX, playerY, bossX, bossY, isQuizAvailable]);

 

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key === " " && showLabel) onBossInteract();

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [showLabel, onBossInteract]);

 

  return (

    <>

      <img src={BossImg} alt="CEO Boss" style={{ position: "absolute", left: bossX, top: bossY, width: "150px", height: "150px", transform: "translate(-50%, -100%)", cursor: isQuizAvailable ? "pointer" : "not-allowed", opacity: isQuizAvailable ? 1 : 0.6 }} />

      
    </>

  );

}

 

export default BossSprite;
