import { cleanSalaryFormat, formatSalary } from './formatSalary';

describe('cleanSalaryFormat', () => {
    // Test: Only numerical characters are returned
    it('should remove all non-numerical characters', () => {
        expect(cleanSalaryFormat('$12,345.67')).toBe('1234567');
        expect(cleanSalaryFormat('12a34b56')).toBe('123456');
        expect(cleanSalaryFormat('1-2/3 4*5')).toBe('12345');
    });

    // Test: String with no numbers
    it('should return an empty string if there are no numbers', () => {
        expect(cleanSalaryFormat('abcxyz')).toBe('');
        expect(cleanSalaryFormat('!!##$$')).toBe('');
    });

    // Test: Already clean input
    it('should return the same value if it contains only numbers', () => {
        expect(cleanSalaryFormat('123456')).toBe('123456');
    });

    // Test: Empty string
    it('should return an empty string if input is empty', () => {
        expect(cleanSalaryFormat('')).toBe('');
    });
});

describe('formatSalary', () => {
    // Helper function to create mock event
    // Casting to 'unknown' first allows us to bypass TypeScript's strict type-checking,
    // which expects the object to fully match the 'Event' interface. By casting to 'unknown',
    // we acknowledge that the object may not include all 'Event' properties, but we're intentionally
    // converting it to 'Event' for testing purposes. This way, TypeScript does not flag missing
    // properties as an error in our test setup.
    const createEvent = (value: string) => ({
        target: { value },
    } as unknown as Event);

    // Test: Proper formatting for valid numerical strings
    it('should format numerical string with commas', () => {
        expect(formatSalary(createEvent('1234567'))).toBe('1,234,567');
        expect(formatSalary(createEvent('1234'))).toBe('1,234');
        expect(formatSalary(createEvent('1000000'))).toBe('1,000,000');
    });

    // Test: Handle empty input
    it('should return an empty string if input is empty', () => {
        expect(formatSalary(createEvent(''))).toBe('');
    });

    // Test: Handle input that does not contain any numbers
    it('should return an empty string for non-numerical input', () => {
        expect(formatSalary(createEvent('abcd'))).toBe('');
    });

    // Test: Handle input with only non-numerical characters
    it('should return an empty string for non-numerical characters only', () => {
        expect(formatSalary(createEvent('$$%%^^'))).toBe('');
    });

    // Test: Return empty string for NaN conversion
    it('should return an empty string if parseInt returns NaN', () => {
        expect(formatSalary(createEvent('NaN'))).toBe('');
    });
});