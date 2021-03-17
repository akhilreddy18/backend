const dynamodb = require('aws-sdk/clients/dynamodb');

const lambda = require('../../../src/handlers/get-by-id.js');

describe('Test getByIdHandler', () => {
    let getSpy;

    beforeAll(() => {
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    afterAll(() => {
        getSpy.mockRestore();
    });

    it('should get item by id', async () => {
        const item = { id: 'id1' };

        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item }),
        });

        const event = {
            httpMethod: 'GET',
            pathParameters: {
                id: 'id1',
            },
        };

        const result = await lambda.getByIdHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item),
        };

        expect(result).toEqual(expectedResult);
    });
});
