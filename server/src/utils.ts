import { DocumentClient } from "aws-sdk/clients/dynamodb";

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
    return gameItems.Items[0].Players
}
