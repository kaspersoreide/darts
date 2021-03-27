import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const documentClient = new DocumentClient({ region: 'eu-north-1' });

export async function getGameData(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#pk = :gameid",
        ExpressionAttributeNames: {
            "#pk": "pk",
        },
        ExpressionAttributeValues: {
            ":gameid": "t#" + event.queryStringParameters['gameid']
        }
    }
    try {
        let throwItems = await documentClient.query(params).promise();

        let throws = throwItems.Items.map( (dbitem) => {
            return {
                field: dbitem.field,
                multiplier: dbitem.multiplier
            }
        })

        let gameData = {
            throws
        };
        return {
            statusCode: 200,
            body: JSON.stringify(gameData)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(getGameData).use(cors());