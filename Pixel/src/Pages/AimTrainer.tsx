// App.tsx
import { useEffect, useState } from "react";
import "../App.css";
import Controls from "../Components/Controls";
import GameArea, { type Target } from "../Components/GameArea";

const spawn = 500 //ms

function App() {
    const [targets, setTargets] = useState<Target[]>([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [running, setRunning] = useState(false);

    // Spawn targets
    useEffect(() => {
        if (!running) return;
        
        const interval = setInterval(() => {
          const id = Date.now();
          const newTarget: Target = {
            id,
            x: Math.random() * 90,
            y: Math.random() * 90,
          };
      
          setTargets((prev) => [...prev, newTarget]);
      
          setTimeout(() => {
            setTargets((prev) => prev.filter((t) => t.id !== id));
          }, 1000);
        }, spawn);
    
        return () => clearInterval(interval);
    }, [running]);

    // Timer
    useEffect(() => {
      if (!running) return;
    
      if (timeLeft <= 0) {
        setRunning(false);
        saveScore();
        return;
      }
    
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }, [timeLeft, running]);
  
    const handleHit = (id: number) => {
      if (!running) return;
      setScore((prev) => prev + 1);
      setTargets((prev) => prev.filter((t) => t.id !== id));
    };

    const saveScore = async () => {
        const token = localStorage.getItem("token");

        fetch("https://masekmi22.sps-prosek.cz/_Web/API_Pixel/save_scores.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: token,
              score: score,
              mode: "classic",
            }),
        });
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setRunning(true);
        setTargets([]);
    };

    return (
        <div className="appContainer">
        <h1>Classic Mode</h1>

        <Controls
            running={running}
            startGame={startGame}
            timeLeft={timeLeft}
            score={score}
        />

        <div className="gameAreaContainer">
            <GameArea targets={targets} handleHit={handleHit} />
        </div>
        </div>
    );
}

export default App;
