import { useEffect, useRef, useState } from "react";

function Stopwatch() {
  // Stopwatch state
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Theme state
  const [theme, setTheme] = useState("light");

  // Lap state
  const [laps, setLaps] = useState([]);

  // Refs for high-precision timing
  const startTimeRef = useRef(0);
  const animationRef = useRef(null);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Stopwatch logic
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = performance.now() - time;
      animationRef.current = requestAnimationFrame(updateTime);
    } else {
      cancelAnimationFrame(animationRef.current);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning]);

  const updateTime = (currentTime) => {
    setTime(currentTime - startTimeRef.current);
    animationRef.current = requestAnimationFrame(updateTime);
  };

  const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);

    return (
      `${hours.toString().padStart(2, "0")}:` +
      `${minutes.toString().padStart(2, "0")}:` +
      `${seconds.toString().padStart(2, "0")}.` +
      `${milliseconds.toString().padStart(3, "0")}`
    );
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="container">
      <h2>Stopwatch</h2>

      <h1 className="time">{formatTime(time)}</h1>

      <div className="buttons">
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button
          onClick={() => setLaps([...laps, time])}
          disabled={!isRunning}
        >
          Lap
        </button>
      </div>

      <button
        className="theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>

      <ul className="laps">
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stopwatch;
