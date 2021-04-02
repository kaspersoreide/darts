import middy from 'middy';
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";

const database = new DynamoDB({ region: 'eu-north-1' });

export async function createGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(event.body);
    let UpdateExpression = "set Players = :Players, gs1pk = :game, gs1sk = :timestamp";
    
    //generate random gameid
    //NOTE: doesnt check for colissions
    let gameId = "";
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';  
    for ( var i = 0; i < 4; i++ ) {
       gameId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let dateobj = new Date();
    let timestamp = dateobj.toISOString();
    let ExpressionAttributeValues: any = {
        ":Players": { SS: body.players },
        ":game": {S : "game"},
        ":timestamp": {S : timestamp}
    };
    //gameid generated
    let params = {
        TableName: "mainTable",
        Key: {
            "pk": { S: "g#" + gameId },
            "sk": { S: "g#" + gameId }
        },
        UpdateExpression,
        ExpressionAttributeValues,
    };

    try {
        await database.updateItem(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({gameid: gameId})
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(createGame).use(cors());