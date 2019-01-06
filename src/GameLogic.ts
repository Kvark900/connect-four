import {Game} from './Game';
import {Board} from './Board';
import {UIUtil} from './UIUtil';

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
