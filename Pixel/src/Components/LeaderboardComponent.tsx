type Score = {
  name: string
  score: number
}

type LeaderboardProps = {
  scores: Score[]
}

export default function Leaderboard({ scores }: LeaderboardProps) {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {scores.map((score, i) => (
          <li key={i} style={{ fontWeight: i === 0 ? "bold" : "normal" }}>
            {i + 1}. {score.name}: {score.score}
          </li>
        ))}
      </ul>
    </div>
  );
}