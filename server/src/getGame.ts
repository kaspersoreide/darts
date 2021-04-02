import middy from 'middy';
import cors from '@middy/http-cors'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getGamePlayers } from './dbUtils';

export async function getGame(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    
    try {
        let players = await getGamePlayers(event.queryStringParameters['gameid']);
        let gameInfo = {
            players: players
        };
        return {
            statusCode: 200,
            body: JSON.stringify(gameInfo)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(getGame).use(cors());