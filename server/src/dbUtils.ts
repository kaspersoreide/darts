import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDB } from 'aws-sdk';
import { AddThrow, Throw } from './interfaces';

const database = new DynamoDB({ region: 'eu-north-1' });
const documentClient = new DocumentClient({ region: 'eu-north-1' });

export async function getGamePlayers(gameid: string): Promise<string[]> {
    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#pk = :gameid",
        ExpressionAttributeNames: {
            "#pk": "pk",
        },
        ExpressionAttributeValues: {
            ":gameid": "g#" + gameid
        }
    }

    // TODO: use get instead of query

//    let game = await documentClient.get


    let gameItems = await documentClient.query(params).promise();
    return gameItems.Items[0].Players.values
}

export async function getGameThrows(gameid: string): Promise<Throw[]> {
    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#pk = :gameid",
        ExpressionAttributeNames: {
            "#pk": "pk",
        },
        ExpressionAttributeValues: {
            ":gameid": "t#" +gameid
        }
    }
    let throwItems = await documentClient.query(params).promise();

    return throwItems.Items.map( dbitem => ({
            field: dbitem.field,
            multiplier: dbitem.multiplier,
            timestamp: dbitem.sk
        })
    );
}

export async function undoThrow(gameid: string): Promise<void> {
    let params = {
        TableName: 'mainTable',
        KeyConditionExpression: "#pk = :gameid",
        ExpressionAttributeNames: {
            "#pk": "pk",
        },
        Limit: 1,
        ScanIndexForward: false,
        ExpressionAttributeValues: {
            ":gameid": "t#" +gameid
        }
    }
    let throwItems = await documentClient.query(params).promise();
    let theThrow = throwItems.Items[0];
    let deleteparams = {
        TableName: 'mainTable',
        Key: {
            'pk': { S: theThrow.pk },
            'sk': { S: theThrow.sk }
        }
    };

    await database.deleteItem(deleteparams).promise();
}

export async function addThrow(t: AddThrow): Promise<void> {
    let UpdateExpression = "set field = :field, multiplier = :multiplier";
    let ExpressionAttributeValues: any = {
        ":field": { N: t.field.toString() },
        ":multiplier": { N : t.multiplier.toString() }
    };
    let gameId = t.gameid;
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

    await database.updateItem(params).promise();
}

export async function addWebSocketConnection(connectionId: string): Promise<void> {
    let UpdateExpression = "set dummy = :dummy";
    let ExpressionAttributeValues: any = {
        ":dummy": { S: "testing" }
   };
    let dateobj = new Date();
    let timestamp = dateobj.toISOString();
    let params = {
        TableName: "mainTable",
        Key: {
            "pk": { S: "ws#" + connectionId },
            "sk": { S: timestamp }
        },
        UpdateExpression,
        ExpressionAttributeValues,
    };

    await database.updateItem(params).promise();
}
