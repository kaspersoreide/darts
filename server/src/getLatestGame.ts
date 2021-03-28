import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDB } from 'aws-sdk';

const documentClient = new DocumentClient({ region: 'eu-north-1' });

export async function getLatestGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#gs1pk = :game",
        ExpressionAttributeNames: {
            "#gs1pk": "gs1pk",
        },
        Limit: 1,
        ScanIndexForward: false,
        ExpressionAttributeValues: {
            ":game": "game" 
        }
    }
    let gameItems = await documentClient.query(params).promise();
    let gameid = gameItems.Items[0].pk;
    return {
        statusCode: 200,
        body: JSON.stringify({gameid})
    };
}


export const handler = middy(getLatestGame).use(cors());