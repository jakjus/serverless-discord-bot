// Import all functions from hello-from-lambda.js
const lambda = require('../../../src/handlers/hello-from-lambda.js');

// This includes all tests for helloFromLambdaHandler()
describe('Test for hello-from-lambda', function () {
    // This test invokes helloFromLambdaHandler() and compare the result 
    it('Verifies successful response', async () => {
        // Invoke helloFromLambdaHandler()
        const result = await JSON.parse(lambda.helloFromLambdaHandler()).content;
        const expectedResult = 'Hello from Lambda!';
        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
