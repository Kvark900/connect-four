import {Game} from "./Game";

export abstract class GameLogic {

    protected constructor(protected game: Game) {
    }

    protected abstract winsDiagonally(indexPlayed: number, isMainDiagonal: boolean): boolean;

    protected abstract winsVertically(indexPlayed: number): boolean;

    protected abstract winsHorizontally(indexPlayed: number): boolean;

    playerWins(indexPlayed: number): boolean {
        return this.winsHorizontally(indexPlayed) ||
            this.winsVertically(indexPlayed) ||
            this.winsDiagonally(indexPlayed, true) ||
            this.winsDiagonally(indexPlayed, false);
    }

}
