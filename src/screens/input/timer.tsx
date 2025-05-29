import { useState, useEffect } from "react";

import "./timer.css";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: number | null = null;

    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(60); // reset to 60 seconds
    setIsActive(true);
  };

  return (
    <div className="timer-box">
      <h2>00:{timeLeft}</h2>
      <button onClick={startTimer}>Start Timer</button>
    </div>
  );
}

export default CountdownTimer;
