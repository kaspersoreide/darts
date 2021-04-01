
import axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { GameData, AddThrow, UndoThrow } from '../../../../server/src/interfaces';

const apiAxios = axios.create();
export const loadLatestGameId = (): Promise<string> => apiAxios.get(`${BASE_API_URL}/getLatestGame`).then(result => result.data.gameid);
export const loadGameFromId = (gameId: string): Promise<GameData> =>  apiAxios.get(`${BASE_API_URL}/getGameData?gameid=${gameId}`).then(result => result.data);
export const createGame = (players: string[]): Promise<string> => apiAxios.post(`${BASE_API_URL}/createGame`, { players }).then(result => result.data.gameid);
export const insertThrow = (playerThrow: AddThrow): Promise<void> => apiAxios.post(`${BASE_API_URL}/insertThrow`, { ...playerThrow }).then(result => result.data);
export const undoThrow = (undoThrow: UndoThrow): Promise<void> => apiAxios.post(`${BASE_API_URL}/undoThrow`, { ...undoThrow }).then(result => result.data);