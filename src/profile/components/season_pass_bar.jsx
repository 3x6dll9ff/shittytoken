import React, {useState, useEffect} from 'react';
import '../css/season_progress.css'; // Убедитесь, что путь к CSS правильный

const SeasonProgressBar = ({initialSeasonProgress}) => {
    const [currentProgress, setCurrentProgress] = useState(initialSeasonProgress);
    const [difference, setDifference] = useState(0);
    const [prevProgress, setPrevProgress] = useState(initialSeasonProgress);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevProgress(currentProgress);
            setCurrentProgress((prev) => Math.min(prev + 0, 100)); // Увеличиваем прогресс на 1% каждую секунду
        }, 1000);

        return () => clearInterval(interval);
    }, [currentProgress]);

    useEffect(() => {
        const newDifference = currentProgress - prevProgress;

        if (newDifference > 0) {
            setDifference(newDifference);

            const timer = setTimeout(() => {
                setDifference(0);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [currentProgress, prevProgress]);

    return (
        <div className="season-progress-bar-container">
            <div
                className="season-progress-bar"
                style={{width: `${prevProgress}%`}}
            ></div>
            {difference > 0 && (
                <div
                    className="season-progress-bar-difference"
                    style={{width: `${difference}%`, left: `${prevProgress}%`}}
                ></div>
            )}
        </div>
    );
};

export default SeasonProgressBar;
