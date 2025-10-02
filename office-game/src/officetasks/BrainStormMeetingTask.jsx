import React, { useState } from "react";
import Sprite from "../src/sprites"; // if Sprite is there
import MeetingRoom from "../Components/Objects/meetingRoom";

export default function BrainstormTask({ onComplete }) {
  const [joined, setJoined] = useState(false);
  const [spriteX, setSpriteX] = useState(0);
  const [spriteY, setSpriteY] = useState(0);

  const roomX = 400;
  const roomY = 200;

  const handleJoin = () => {
    setSpriteX(roomX - 50); // move sprite beside the room
    setSpriteY(roomY);
    setJoined(true);
    onComplete();
  };

  return (
    <div>
      <button onClick={handleJoin}>
        {joined ? "Joined!" : "Join Brainstorm Session"}
      </button>
      <Sprite x={spriteX} y={spriteY} />
      <MeetingRoom x={roomX} y={roomY} />
    </div>
  );
}
