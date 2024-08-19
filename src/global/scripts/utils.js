const dataLoaded = (data) => {
    for (const index in data) {
        if (data[index] === null) {
            return false;
        }
        try {
            if (data[index].length === 0) {
                return false;
            }
        }
        catch (error) {}
    }
    return true;
};

const insertCharIn = (string, index, char) => {
    return string.slice(0, index) + char + string.slice(index);
};

const unixTimesptampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

const datetimeToDDMMYYYY = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

const formatWalletAddress = (address) => {
    if (!address) {
        return 'No wallet connected';
    }
    else {
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
    }
}

export {dataLoaded, unixTimesptampToTime, insertCharIn, datetimeToDDMMYYYY, formatWalletAddress};