import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getGamePlayers, getGameThrows } from './dbUtils';

export async function getGameData(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    try {
        let gameThrows = await getGameThrows(event.queryStringParameters['gameid']);
        let players = await getGamePlayers(event.queryStringParameters['gameid']);

        
        let playerstat = players.map( (player) => {
            return {
                player,
                score: 0
            }
        })

        let gameData = {
            throws: gameThrows,
            playerstat
        };
        return {
            statusCode: 200,
            body: JSON.stringify(gameData)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify(err)
        }
    }
}

export const handler = middy(getGameData).use(cors());