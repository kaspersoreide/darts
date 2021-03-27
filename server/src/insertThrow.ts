import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const database = new DynamoDB({ region: 'eu-north-1' });

export async function insertThrow(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(event.body);
    let UpdateExpression = "set field = :field, multiplier = :multiplier";
    let ExpressionAttributeValues: any = {
        ":field": { N: body.field },
        ":multiplier": { N : body.multiplier }
    };
    let gameId = body.gameid;
    let dateobj = new Date();
    let timestamp = dateobj.toISOString();
    let params = {
        TableName: "mainTable",
        Key: {
            "pk": { S: "t#" + gameId },
            "sk": { S: timestamp }
        },
        UpdateExpression,
        ExpressionAttributeValues,
    };

    try {
        await database.updateItem(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({msg: "throw registered!"})
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(insertThrow).use(cors());