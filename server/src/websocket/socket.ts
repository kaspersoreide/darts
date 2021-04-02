import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { addWebSocketConnection } from 'src/dbUtils';

export const socket: APIGatewayProxyHandler = async (event: any, _context:any) => {

     console.log('___START SOCKET EVENT____');

    const connectionId = event.requestContext.connectionId;

    if (event.requestContext.eventType === 'CONNECT') {
        console.log("WS: CONNECTED");
        addWebSocketConnection(connectionId);

    } else if (event.requestContext.eventType === 'DISCONNECT') {
        // TODO Delete connectionId in DB
        console.log('WS:' + connectionId + ': DISCONNECTED');
    } else if (event.requestContext.eventType === 'MESSAGE') {
        console.log("WS: MESSAGE RECEIVED - body:");
        const obj = JSON.parse(event.body);
        console.log(obj);
    }

    return {
        statusCode: 200,
        body: ''
    }
}