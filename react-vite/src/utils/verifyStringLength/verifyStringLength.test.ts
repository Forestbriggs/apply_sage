import verifyStringLength from "./verifyStringLength";

describe('verifyStringLength', () => {
    // Test case: Standard input where all words are within the length limit
    it('should return true for words within length limit', () => {
        expect(verifyStringLength('This is a test', 4)).toBe(true);
    });

    // Test case: One word exceeds the length limit
    it('should return false if any word exceeds the length limit', () => {
        expect(verifyStringLength('This example has a wordtoolong', 5)).toBe(false);
    });

    // Test case: All words exactly at the length limit
    it('should return true when all words are exactly at the length limit', () => {
        expect(verifyStringLength('This test does pass fine', 4)).toBe(true);
    });

    // Test case: Single word input within the length limit
    it('should return true for a single word within the limit', () => {
        expect(verifyStringLength('Hello', 5)).toBe(true);
    });

    // Test case: Single word input exceeding the length limit
    it('should return false for a single word exceeding the length limit', () => {
        expect(verifyStringLength('Exceeding', 5)).toBe(false);
    });

    // Test case: Empty string input
    it('should return true for an empty string', () => {
        expect(verifyStringLength('', 5)).toBe(true);
    });

    // Test case: String with multiple spaces between words
    it('should handle strings with multiple spaces between words correctly', () => {
        expect(verifyStringLength('This   is   fine', 4)).toBe(true);
    });

    // Test case: Length limit of zero
    it('should return false if length limit is zero and string is not empty', () => {
        expect(verifyStringLength('Not empty', 0)).toBe(false);
    });

    // Test case: All words with length zero (empty spaces)
    it('should return true if all words are empty spaces and length limit is zero', () => {
        expect(verifyStringLength('    ', 0)).toBe(true);
    });
});