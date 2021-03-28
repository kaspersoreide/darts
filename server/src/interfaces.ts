export interface Throw {
    field: number,
    multiplier: number,
    timestamp: string
}

export interface PlayerStat {
    player: string,
    score: number,
    status: string
}
export interface GameData {
    currentPlayer: string,
    throws: Throw[],
    playerstat: PlayerStat[]

}