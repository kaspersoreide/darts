import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getGamePlayers, getGameThrows } from './dbUtils';
import { GameData, PlayerStat } from './interfaces';

export async function getGameData(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let gameThrows = await getGameThrows(event.queryStringParameters['gameid']);
    let players = await getGamePlayers(event.queryStringParameters['gameid']);

    let playerstat:PlayerStat[] = [];
    for(let p in players) {
        playerstat[p] = { player: players[p], score: 0 };
    }

    gameThrows.forEach( (t, index) => {
        let playernumber = Math.floor(index/3) % players.length;
        playerstat[playernumber].score += t.field * t.multiplier;
    });

    let nextThrow = Math.floor((gameThrows.length)/3) % players.length;

    let gameData: GameData = {
        throws: gameThrows,
        playerstat,
        currentPlayer: players[nextThrow]
    };
    return {
        statusCode: 200,
        body: JSON.stringify(gameData)
    };
}


export const handler = middy(getGameData).use(cors());