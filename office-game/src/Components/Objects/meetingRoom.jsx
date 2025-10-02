import React from "react";

function meetingRoom({ x, y }) {
  return (
    <img
      src="meeting-room.png" // your office room image
      alt="Meeting Room"
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
    />
  );
}

export default meetingRoom;
