const AWS = require('aws-sdk');

// When running through serverless offline, this var is set to 'true'
const isOffline = process.env.IS_OFFLINE === 'true';

// Configure DynamoDB client based on the environment (local or AWS)
let dynamoDb;
if (isOffline) {
    AWS.config.update({
        accessKeyId: 'xxxx',
        secretAccessKey: 'xxxx',
    });
    dynamoDb = new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    });
} else {
    dynamoDb = new AWS.DynamoDB.DocumentClient();
}

// Lambda function handler
module.exports.lambda_handler = async (event) => {
    try {
        if (event.httpMethod === 'POST') {
            const student = JSON.parse(event.body);

            // Insert the new student record into DynamoDB
            await dynamoDb.put({
                TableName: 'StudentRecords',
                Item: student
            }).promise();

            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Student record added successfully' })
            };

        } else if (event.httpMethod === 'GET') {
            const student_id = event.queryStringParameters.student_id;

            // Fetch the student record by student_id from DynamoDB
            const result = await dynamoDb.get({
                TableName: 'StudentRecords',
                Key: { student_id }
            }).promise();

            if (result.Item) {
                return {
                    statusCode: 200,
                    body: JSON.stringify(result.Item)
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ message: 'Student record not found' })
                };
            }
        } else {
            return {
                statusCode: 405,
                body: JSON.stringify({ message: 'Method not allowed' })
            };
        }
    } catch (error) {
        console.error('Error processing request', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
};
