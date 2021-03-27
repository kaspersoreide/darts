import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const database = new DynamoDB({ region: 'eu-north-1' });
const documentClient = new DocumentClient({ region: 'eu-north-1' });

export async function getGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#pk = :gameid",
        ExpressionAttributeNames: {
            "#pk": "pk",
        },
        ExpressionAttributeValues: {
            ":gameid": "g#" + event.queryStringParameters['gameid']
        }
    }
    try {
        let gameItems = await documentClient.query(params).promise();
        let gameInfo = {
            players: gameItems.Items[0].Players
        };
        return {
            statusCode: 200,
            body: JSON.stringify(gameInfo)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(getGame).use(cors());