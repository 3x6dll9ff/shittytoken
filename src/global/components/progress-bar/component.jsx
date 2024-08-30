import './css/progress-bar.css'


const ProgressBar = (
    {
        className,
        currentValue,
        maxValue,
        showValues = false,
        mode = 'classic',
        style
    }
) => {
    const percentage = currentValue / maxValue;

    let r, g;
    if (percentage < 0.5) {
        r = 255;
        g = Math.round(2 * percentage * 255)
    } else if (percentage === 0.5) {
        r = 255;
        g = 255;
    } else {
        r = Math.round(2 * (1 - percentage) * 255);
        g = 255;
    }

    let filledColor;
    let unfilledColor;
    if (mode === 'rainbow') {
        filledColor = `rgb(${r}, ${g}, 0)`;
        unfilledColor = `rgb(${Math.round(r / 2)}, ${Math.round(g / 2)}, 0)`;
    } else {
        filledColor = '';
        unfilledColor = '';
    }

    return (
        <div className={className}>
            <div
                className={`progress-bar-container ${mode}`}
                style={{...style, backgroundColor: unfilledColor}}
            >
                <div
                    style={{
                        width: `${percentage * 100}%`,
                        backgroundColor: filledColor
                    }}
                />
                {showValues && (
                    <h1>{currentValue}/{maxValue}</h1>
                )}
            </div>
        </div>
    );
};

export default ProgressBar;