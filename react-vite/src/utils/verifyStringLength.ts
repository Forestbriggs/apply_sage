export default function verifyStringLength(string:string, len: number):boolean {
    const splitString = string.split(' ');
    for (let str of splitString) {
        if (str.length > len) {
            return false;
        }
    }

    return true;
}