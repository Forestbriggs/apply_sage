import determineStatusClass from "./determineStatusClass";

describe('determineStatusClass', () => {
    it('returns applied class for applied status', () => {
        const status = 'Applied';
        const expected = 'applied';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns interviewed class for interviewed status', () => {
        const status = 'Interviewed';
        const expected = 'interviewed';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns offer class for offer received status', () => {
        const status = 'Offer Received';
        const expected = 'offer';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns accepted class for accepted status', () => {
        const status = 'Accepted';
        const expected = 'accepted';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns rejected class for rejected status', () => {
        const status = 'Rejected';
        const expected = 'rejected';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns withdrawn class for withdrawn status', () => {
        const status = 'Withdrawn';
        const expected = 'withdrawn';
        expect(determineStatusClass(status)).toBe(expected);
    });

    it('returns applied class for other status', () => {
        const status = 'Unknown Status';
        const expected = 'applied';
        expect(determineStatusClass(status)).toBe(expected);
    });
});