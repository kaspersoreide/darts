import middy from 'middy';
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const documentClient = new DocumentClient({ region: 'eu-north-1' });

export async function getLatestGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let params = {
        TableName: 'mainTable',
        IndexName: 'gs1',
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
    let strippedGameId = gameid.substr(2);
    return {
        statusCode: 200,
        body: JSON.stringify({gameid: strippedGameId})
    };
}


export const handler = middy(getLatestGame).use(cors());