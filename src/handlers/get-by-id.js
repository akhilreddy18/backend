const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.getByIdHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }

    const { id } = pathParameters;

    const params = {
        TableName: tableName,
        Key: { id },
    };
    const { Item } = await docClient.get(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(Item),
    };

    return response;
};
