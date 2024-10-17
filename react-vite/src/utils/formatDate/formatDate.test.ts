import formatDate from "./formatDate";

describe('formatDate', () => {
    // Test case: Typical date
    it('should format a typical date correctly', () => {
        const date = new Date('2024-10-16');
        expect(formatDate(date)).toBe('10/16/2024');
    });

    // Test case: Leap year date
    it('should format a leap year date correctly', () => {
        const date = new Date('2020-02-29');
        expect(formatDate(date)).toBe('2/29/2020');
    });

    // Test case: Date at the start of the year
    it('should format a date at the start of the year correctly', () => {
        const date = new Date('2024-01-01');
        expect(formatDate(date)).toBe('1/1/2024');
    });

    // Test case: Date at the end of the year
    it('should format a date at the end of the year correctly', () => {
        const date = new Date('2024-12-31');
        expect(formatDate(date)).toBe('12/31/2024');
    });

    // Test case: Date with single-digit day and month
    it('should format dates with single-digit day and month correctly', () => {
        const date = new Date('2024-03-07');
        expect(formatDate(date)).toBe('3/7/2024');
    });

    // Test case: Date from the past century
    it('should format a date from the past century correctly', () => {
        const date = new Date('1985-05-15');
        expect(formatDate(date)).toBe('5/15/1985');
    });

    // Test case: Date in ISO format with time
    it('should handle ISO format with time and ignore the time component', () => {
        const date = new Date('2024-10-16T13:45:30');
        expect(formatDate(date)).toBe('10/16/2024');
    });

    // Test case: Invalid date
    it('should throw an error for invalid date input', () => {
        expect(() => formatDate(new Date('invalid-date'))).toThrowError();
    });
});