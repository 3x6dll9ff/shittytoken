import arrowUp from "../../assets/crypto/images/arrow-up.png";
import arrowDown from "../../assets/crypto/images/arrow-down.png";

const positivePercentage = (percentage) => {
    return (percentage >= 0 ? percentage : (percentage - 2 * percentage));
};

const widgetColor = (percentage) => {
    return (percentage >= 0 ? 'green' : 'red');
};

const arrowDirection = (color) => {
    return (color === 'green' ? arrowUp : arrowDown);
};

export {positivePercentage, widgetColor, arrowDirection};