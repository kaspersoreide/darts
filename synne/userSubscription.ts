import middy from 'middy';
import cors from '@middy/http-cors';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';


const database = new DynamoDB({ region: 'eu-north-1' });
const documentClient = new DocumentClient({ region: 'eu-north-1' });
// TODO: Make variable for region.

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if (event.httpMethod == "GET") {
        return getUserSubscription(event);
    }

    if (event.httpMethod == "PUT") {
        return putUserSubscription(event);
    }

    if (event.httpMethod == "DELETE") {
        return deleteUserSubscription(event);
    }

    return {
        statusCode: 405,
        body: '{ "message" : "Method not allowed" }'
    };

}

export const mainHandler = middy(handler).use(cors());

let userId = "synne@birthdaygirl.yay";
// TODO: Fetch customerId from JWT

async function getUserSubscription(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let vendorId = event.queryStringParameters["vendorId"];

    if (!vendorId) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let params = {
        TableName: 'MainTable',
        KeyConditionExpression: "#pk = :vendor and #sk = :userId",
        ExpressionAttributeNames: {
            "#pk": "pk",
            "#sk": "sk"
        },
        ExpressionAttributeValues: {
            ":vendor": "v#" + vendorId,
            ":userId": "u#" + userId
        }
    }

    try {
        let dbResult = await documentClient.query(params).promise();

        if (dbResult.Count < 1) {
            return {
                statusCode: 404,
                body: '{ "message" : "No subscription for vendorId: ' + vendorId + '"}'
            };
        }

        let subscription = {
            vendorId,
            userId,
            approved: dbResult.Items[0].approved,
            paused: dbResult.Items[0].paused,
            schedule: dbResult.Items[0].schedule
        }
        
        return {
            statusCode: 200,
            body: JSON.stringify(subscription)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    } 
}

async function putUserSubscription(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let vendorId = event.queryStringParameters["vendorId"];

    if (!vendorId) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let body = JSON.parse(event.body);

    if (!body || body.vendorId != vendorId) {
        return {
            statusCode: 400,
            body: '{ "message" : "body is missing or vendorId is not matching query parameter" }'
        };
    }

    if (body.userId != userId) {
        return {
            statusCode: 403,
            body: '{ "message" : "userId in body is not matching authenticated user" }'
        };
    }

    let UpdateExpression = "set EntityType = :EntityType, approved = if_not_exists(approved, :approved)";
    let ExpressionAttributeValues: any = {
        ":EntityType": { S: 'Subscription' },
        ":approved": { BOOL: false }
    };

    if (body.paused != undefined) {
        UpdateExpression += ", paused = :paused",
            ExpressionAttributeValues[":paused"] = { BOOL: body.paused };
    }

    if (body.schedule != undefined) {
        UpdateExpression += ", schedule = :schedule",
            ExpressionAttributeValues[":schedule"] = { SS: body.schedule };
    }

    let params = {
        TableName: 'MainTable',
        Key: {
            "pk": { S: "v#" + vendorId },
            "sk": { S: "c#" + userId }
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: "ALL_NEW"
    };

    try {
        let dbItem = await database.updateItem(params).promise();

        let subscription = {
            vendorId,
            userId,
            approved: dbItem.Attributes.approved?.BOOL || false,
            paused: dbItem.Attributes.paused.BOOL,
            schedule: dbItem.Attributes.schedule.SS
        };
        return {
            statusCode: 200,
            body: JSON.stringify(subscription)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
}

async function deleteUserSubscription(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    if (!event.queryStringParameters) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let vendorId = event.queryStringParameters["vendorId"];

    if (!vendorId) {
        return {
            statusCode: 400,
            body: '{ "message" : "Missing parameter vendorId" }'
        };
    }

    let params = {
        TableName: 'MainTable',
        Key: {
            'pk': { S: 'v#' + vendorId },
            'sk': { S: 'u#' + userId }  
        }
    };

    try {
        await database.deleteItem(params).promise();
        
        return {
            statusCode: 200,
            body: '{ "message" : "Deletion succeeded" }'
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    } 
}
