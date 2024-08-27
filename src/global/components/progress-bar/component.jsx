import './css/progress-bar.css';

const ProgressBar = ({className, currentValue, maxValue, style}) => {
    return (
        <div className={className}>
            <div
                className={`progress-bar-container`}
                style={style}
            >
                <div style={{width: `${(currentValue / maxValue) * 100}%`}}/>
            </div>
        </div>
    );
};

export default ProgressBar;
