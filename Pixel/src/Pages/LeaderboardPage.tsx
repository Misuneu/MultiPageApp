import Leaderboard from "../Components/LeaderboardComponent";
import { useState, useEffect } from "react";

type Score = {
  name: string
  score: number
}

export function LeaderboardPage() {

    const [score, setScores] = useState<Score[]>([]);

    const loadScores = async () => {
    try {
      const res = await fetch("https://masekmi22.sps-prosek.cz/_Web/API_Pixel/get_scores.php");
      const data = await res.text()
      console.log(data)
     // setScores(data)
    } catch (err) {
      console.error("Chyba při načítání:", err)
    }
  };

  useEffect(() => {
    loadScores(); 
  }, []);

    return (
        <>
            <Leaderboard scores={score} />
        </>
    )
}