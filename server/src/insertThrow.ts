import middy from 'middy';
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { addThrow } from './dbUtils';

export async function insertThrow(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    let body = JSON.parse(event.body);
    addThrow({...body});
    return {
        statusCode: 200,
        body: JSON.stringify({msg: "throw registered!"})
    };
}

export const handler = middy(insertThrow).use(cors());