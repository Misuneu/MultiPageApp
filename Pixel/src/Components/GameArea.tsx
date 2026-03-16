export type Target = {
    id: number
    x: number
    y: number
}

type GameAreaProps = {
    targets: Target[]
    handleHit: (id: number) => void
}

export default function GameArea({ targets, handleHit}: GameAreaProps) {
    return (
        <div className="gameAreaWrapper">
            <div className="gameArea">
                {targets.map((target) => (
                    <button
                    key={target.id}
                    onClick={() => handleHit(target.id)}
                    style={{ top: `${target.y}%`, left: `${target.x}%`}}
                    className="target"
                    />
                ))}
            </div>
        </div>
    )
}