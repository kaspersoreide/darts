import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDB } from 'aws-sdk';
import { Throw } from './interfaces';

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

    return throwItems.Items.map( (dbitem) => {
        return {
            field: dbitem.field,
            multiplier: dbitem.multiplier,
            timestamp: dbitem.sk
        }
    });
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
