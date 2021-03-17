const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.fetchItemsHandler = async (event) => {
    const { httpMethod, path } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`fetchItems only accepts GET method, you tried: ${httpMethod} method.`);
    }

    const fetchProducts = await axios.get('https://assignment.dwbt.tech/products')
    const fetchImages = await axios.get('https://assignment.dwbt.tech/images')

    const finalData = fetchProducts.data.products.map(product => {
        if(fetchImages.data.images[product.sku] != null){
            return {
                ...product,
                id: product.sku,
                images: fetchImages.data.images[product.sku]
            }
        }
    })
 
    const params = { TableName: tableName };
    const { Items } = await docClient.scan(params).promise();

    const difference = _.differenceWith(finalData, Items, _.isEqual);

    for(item of difference) {
        const params1 = { TableName: tableName, Item: {
            id: item.sku,
            ...item
        }};
    
        await docClient.put(params1).promise();
    }

    const response = {
        statusCode: 200,
        body: 'fetched items',
    };

    console.log(`fetching completed`);
    return response;
};
