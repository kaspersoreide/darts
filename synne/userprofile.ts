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
        return getUserprofile(event);
    }

    if (event.httpMethod == "PUT") {
      return putUserprofile(event);
    }

    if (event.httpMethod == "DELETE") {
        return deleteUserprofile(event);
    }
}

export const mainHandler = middy(handler).use(cors());

let userId = "synne@birthdaygirl.yay";
// TODO: Fetch customerId from JWT

async function getUserprofile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let params = {
        TableName: 'MainTable',
        KeyConditionExpression: "#pk = :userId and #sk = :userId",
        ExpressionAttributeNames: {
            "#pk": "pk",
            "#sk": "sk"
        },
        ExpressionAttributeValues: {
            ":userId": "u#" + userId
        }
    }
    try {
        let userprofile = await documentClient.query(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(userprofile.Items)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

async function putUserprofile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(event.body);

    let UpdateExpression = "set EntityType = :EntityType";
    let ExpressionAttributeValues: any = {
        ":EntityType": { S: "Userprofile" }
    };

    if (body.firstname != undefined) {
        UpdateExpression += ", firstname = :firstname",
            ExpressionAttributeValues[":firstname"] = { S: body.firstname };
    }

    if (body.lastname != undefined) {
        UpdateExpression += ", lastname = :lastname",
            ExpressionAttributeValues[":lastname"] = { S: body.lastname };
    }

    if (body.address != undefined) {
        UpdateExpression += ", address = :address",
            ExpressionAttributeValues[":address"] = { S: body.address };
    }

    if (body.phone != undefined) {
        UpdateExpression += ", phone = :phone",
            ExpressionAttributeValues[":phone"] = { N: body.phone };
    }

    if (body.phone != undefined) {
        UpdateExpression += ", email = :email",
            ExpressionAttributeValues[":email"] = { S: body.email };
    }

    let params = {
        TableName: "MainTable",
        Key: {
            "pk": { S: "u#" + userId },
            "sk": { S: "u#" + userId }
        },
        UpdateExpression,
        ExpressionAttributeValues,
        ReturnValues: "ALL_NEW"
    };

    try {
        let dbItem = await database.updateItem(params).promise();

        let userprofile = {
            firstname: dbItem.Attributes.firstname,
            lastname: dbItem.Attributes.lastname,
            address: dbItem.Attributes.address,
            phone: dbItem.Attributes.phone,
            email: dbItem.Attributes.email
        };
        return {
            statusCode: 200,
            body: JSON.stringify(userprofile)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        };
    }
}

async function deleteUserprofile(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let params = {
        TableName: 'MainTable',
        Key: {
            'pk': { S: 'u#' + userId },
            'sk': { S: 'u#' + userId }
        }
    };

    try {
        database.deleteItem(params).promise;
        return {
            statusCode: 200,
            body: JSON.stringify(params.Key)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}