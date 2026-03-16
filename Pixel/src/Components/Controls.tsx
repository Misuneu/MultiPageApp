type ControlsProps = {
    running: boolean
    startGame: () => void
    timeLeft: number
    score: number
}

export default function Controls({
    running,
    startGame,
    timeLeft,
    score
}: ControlsProps) {
    return (
        <div className="controls">
            {!running && (
                <button onClick={startGame} className="controlButton">
                    Start Game
                </button>
            )}
            <div className="status">
                <div>Time Left: {timeLeft}</div>
                <div>Score: {score}</div>
            </div>
        </div>
    )
}