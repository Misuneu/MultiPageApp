import { useState } from "react";

type Target = {
  x: number;
  y: number;
};

export default function SurvivalPage() {
  const [target, setTarget] = useState<Target | null>(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [running, setRunning] = useState(false)
  const [scoreSaved, setScoreSaved] = useState(false)

  const spawnTarget = () => {
    setTarget({
      x: Math.random() * 90,
      y: Math.random() * 90,
    });
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setRunning(true);
    spawnTarget();
    setScoreSaved(false)
  };

  const hit = () => {
    if (!running) return;
    setScore((s) => s + 1);
    spawnTarget();
  };

  const miss = () => {
    if (!running) return;

    setLives((l) => {
      const newLives = l - 1;
      if (newLives <= 0) {
        setRunning(false);
        setTarget(null);

        const token = localStorage.getItem("token")

        if (!scoreSaved) {
            setScoreSaved(true)

            fetch("https://masekmi22.sps-prosek.cz/_Web/API_Pixel/save_scores.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    mode: "survival",
                    score: score
                }),
            })
            .then((res) => res.json())
            .then((data) => console.log("Score saved:", data))
            .catch((err) => console.error("Error saving score:", err))
            }
        }
        
      return newLives;
    });
  };

  return (
    <div className="appContainer">
      <h1>Survival Mode</h1>

      {!running && (
        <button onClick={startGame} className="controlButton">
          Start
        </button>
      )}

      <div className="status">
        <div>Lives: {lives}</div>
        <div>Score: {score}</div>
      </div>

      <div
        className="gameArea"
        onClick={miss}
      >
        {target && (
          <button
            className="target"
            style={{
              top: `${target.y}%`,
              left: `${target.x}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              hit();
            }}
          />
        )}
      </div>
    </div>
  );
}
