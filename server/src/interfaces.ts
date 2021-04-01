

export type Status = 'playing' | 'bust' | 'wonjustnow' | 'haswon';
export interface Throw {
  field: number,
  multiplier: number,
  timestamp: string
}

export interface AddThrow {
  gameid: string;
  field: number;
  multiplier: string;
}

export interface UndoThrow {
  gameid: string;
}

export interface PlayerStat {
  player: string,
  score: number,
  status: Status,
  lastThrows: Throw[]
}
export interface GameData {
  currentPlayer: string,
  throws: Throw[],
  playerstat: PlayerStat[],
  throwsInTurn: Throw[]
}