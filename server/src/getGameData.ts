import middy from 'middy';
import { cors } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getGamePlayers, getGameThrows } from './dbUtils';
import { GameData, PlayerStat, Throw } from './interfaces';

export async function getGameData(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {

    let gameThrows = await getGameThrows(event.queryStringParameters['gameid']);
    let players = await getGamePlayers(event.queryStringParameters['gameid']);

    let playerstat:PlayerStat[] = [];
    for(let p in players) {
        playerstat[p] = { player: players[p], score: 501, status: "playing" };
    }

    let playernumber = 0;
    let throwsInTurn: Throw[] = [];
    gameThrows.forEach( (t, i) => {
        
        playerstat[playernumber].status = "playing";
        playerstat[playernumber].score -= t.field * t.multiplier;
        throwsInTurn.push(t);
        let nextTurn = false;
        if (playerstat[playernumber].score < 0) { // BUST¨
            if (i == gameThrows.length - 1) {
                playerstat[playernumber].status = "bust";
            }
            nextTurn = true;
            throwsInTurn.forEach( (t) => {
                playerstat[playernumber].score += t.field * t.multiplier;
            })
        }
        if(playerstat[playernumber].score == 0) {
            if (i == gameThrows.length - 1) {      
                playerstat[playernumber].status = "wonjustnow";
            } else {
                playerstat[playernumber].status = "haswon";
            }
            nextTurn = true;
        }  
        if(throwsInTurn.length>=3 || nextTurn) {
            throwsInTurn = [];
            playernumber++;
            playernumber%=players.length;
            let skips = 0;
            while(playerstat[playernumber].score==0 && skips <= players.length) { // Skip winners
                playernumber++;
                playernumber%=players.length;
                skips++;
            }
        }
    });

    let gameData: GameData = {
        throws: gameThrows,
        playerstat,
        currentPlayer: players[playernumber],
        throwsInTurn
    };
    return {
        statusCode: 200,
        body: JSON.stringify(gameData)
    };
}


export const handler = middy(getGameData).use(cors());