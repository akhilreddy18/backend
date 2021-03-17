const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

exports.getAllItemsHandler = async (event) => {
    const { httpMethod, path } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${httpMethod}`);
    }

    const params = { TableName: 'backend-SampleTable-1CK9YVUT9J173' };
    const { Items } = await docClient.scan(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(Items),
    };

    return response;
};
