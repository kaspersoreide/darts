import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";
import * as dbUtils from "./dbUtils";

const database = new DynamoDB({ region: 'eu-north-1' });

export async function undoThrow(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(event.body);

    let gameId = body.gameid;

    try {
        dbUtils.undoThrow(gameId);        
        return {
            statusCode: 200,
            body: JSON.stringify({msg: "throw undone!"})
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(undoThrow).use(cors());