import handleFutureFeatureClick from './handleFutureFeatureClick';

// Mock the global alert function
const mockAlert = jest.fn();
global.alert = mockAlert;

describe('handleFutureFeatureClick', () => {
    // Reset the mock before each test to ensure clean state
    beforeEach(() => {
        mockAlert.mockClear();
    });

    // Test case: Event prevention and alert call
    it('should prevent the default event behavior and call alert with correct message', () => {
        // Create a mock event with preventDefault
        const mockEvent = { preventDefault: jest.fn() };

        // Call the function with the mock event
        handleFutureFeatureClick(mockEvent);

        // Verify that preventDefault was called
        expect(mockEvent.preventDefault).toHaveBeenCalled();

        // Verify that alert was called with the correct message
        expect(mockAlert).toHaveBeenCalledWith('Feature coming soon...');
    });

    // Test case: Confirm alert is called only once
    it('should call alert only once', () => {
        const mockEvent = { preventDefault: jest.fn() };

        handleFutureFeatureClick(mockEvent);

        // Check that alert is called exactly once
        expect(mockAlert).toHaveBeenCalledTimes(1);
    });

    // Test case: Ensure no other side effects
    it('should not have any other side effects', () => {
        const mockEvent = { preventDefault: jest.fn() };

        handleFutureFeatureClick(mockEvent);

        // Check that only preventDefault and alert are called
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockAlert).toHaveBeenCalled();
        expect(mockEvent).toHaveProperty('preventDefault');
        expect(mockAlert).toHaveProperty('mock');
    });
});