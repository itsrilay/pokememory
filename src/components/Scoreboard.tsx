interface ScoreboardProps {
    score: number;
    restart: () => void;
}

export default function Scoreboard({ score, restart }: ScoreboardProps) {
    return (
        <>
            <div className='scoreboard'>
                <p className='score'>Score: {score}</p>
                <button className='btn restart' onClick={restart}>
                    Restart
                </button>
            </div>
        </>
    );
}
