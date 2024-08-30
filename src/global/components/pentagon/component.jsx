import {useEffect, useRef} from "react";
import {splitValueProperty, assembleValueProperty} from "../../scripts/utils.js";

import "./css/pentagon.css";


const pentagonAspectRatio = 1 / 0.94;

const Pentagon = ({
    className,
    text = null,
    fontSize = 0,
    color = 'black',
    width,
    height,
    borderSize = 2,
    effect
}) => {
    const mainContainerRef = useRef(null);

    let frontColor;
    let backColor;
    switch (color) {
        case ('black'): {
            frontColor = 'black';
            backColor = 'white';
            break;
        }
        case ('white'): {
            frontColor = 'white';
            backColor = 'black';
            break;
        }
        default: {
            frontColor = 'black';
            backColor = 'white';
            break;
        }
    }

    let filter = '';
    if (effect) {
        switch (effect) {
            case ('disabled'): {
                filter = 'brightness(0.5)';
                break;
            }
        }
    }

    if (width === undefined && height !== undefined) {
        width = countPentagonWidth(height);
    } else {
        height = countPentagonHeight(width);
    }

    useEffect(() => {
        if (mainContainerRef.current) {
            const containerStyles = window.getComputedStyle(mainContainerRef.current);

            const widthList = splitValueProperty(containerStyles.width);
            const heightList = splitValueProperty(containerStyles.height);

            if (widthList[0] === 0) {
                widthList[0] = countPentagonWidth(heightList[0]);
                mainContainerRef.current.style.width = assembleValueProperty(widthList);
            }
            if (heightList[0] === 0) {
                heightList[0] = countPentagonHeight(widthList[0])
                mainContainerRef.current.style.height = assembleValueProperty(heightList);
            }
        }
    }, []);

    return (
        <div
            className={className}
            ref={mainContainerRef}
        >
            <div
                className={`pentagon-container`}
                style={{
                    width: width,
                    height: height,
                    filter: filter
                }}
            >
                <div className={`pentagon back ${backColor}`}/>
                <div
                    className={`pentagon front ${frontColor}`}
                    style={{
                        width: `calc(100% - ${2 * borderSize}px)`,
                        height: `calc(100% - ${2 * borderSize}px)`
                    }}
                />
                <div className={`pentagon-content ${backColor}`}>
                    <h1
                        style={{
                            fontSize: assembleValueProperty([fontSize, 'pt']),
                            transform: 'translate(-1%, -10%)'
                        }}
                    >
                        {text}
                    </h1>
                </div>
            </div>
        </div>
    );
};

const countPentagonWidth = (height) => {
    return height * pentagonAspectRatio;
}

const countPentagonHeight = (width) => {
    return width / pentagonAspectRatio;
}

export default Pentagon;
export {countPentagonWidth, countPentagonHeight};