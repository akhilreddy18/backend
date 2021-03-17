const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

exports.getByIdHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }

    const { id } = pathParameters;

    const params = {
        TableName: 'backend-SampleTable-1CK9YVUT9J173',
        Key: { id },
    };
    const { Item } = await docClient.get(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(Item),
    };

    return response;
};
