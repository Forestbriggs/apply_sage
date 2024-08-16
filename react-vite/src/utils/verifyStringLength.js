export default function verifyStringLength(string, len) {
    const splitString = string.split(' ');
    for (let str of splitString) {
        if (str.length > len) {
            return false;
        }
    }

    return true;
}