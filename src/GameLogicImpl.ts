import {GameLogic} from './GameLogic';
import {Game} from './Game';
import {Board} from './Board';
import {UIUtil} from './UIUtil';

export class GameLogicImpl extends GameLogic {
    private _game: Game;

    constructor(game: Game) {
        super(game);
        this._game = game;
    }

    winsDiagonally(indexPlayed: number, isMainDiagonal: boolean): boolean {
        let diagStart = UIUtil.getStartPositionOfDiagonal(indexPlayed, isMainDiagonal);
        let diagLength = UIUtil.getLengthOfDiagonal(diagStart.rowIndex, diagStart.columnIndex, isMainDiagonal);
        let startIndex = UIUtil.getIndex(diagStart.rowIndex, diagStart.columnIndex);
        let lastIndex = UIUtil.getLastIndexInDiagonal(startIndex, diagLength, isMainDiagonal);
        let offset = isMainDiagonal ? Board.numberOfColumns + 1 : Board.numberOfColumns - 1;
        loop:
            for (let i = startIndex; i <= lastIndex - (offset * 3); i += offset) {
                if (this._game.board.circles[i].style.backgroundColor === 'white') {
                    continue;
                }
                for (let y = i + offset; y <= i + (offset * 3); y += offset) {
                    if (this._game.board.circles[i].style.backgroundColor !=
                        this._game.board.circles[y].style.backgroundColor) {
                        continue loop;
                    }
                }
                return true;
            }
        return false;
    }

    protected winsVertically(indexPlayed: number): boolean {
        let columnIndex = UIUtil.getColumnIndex(indexPlayed);
        let lastIndex = UIUtil.getLastIndexInColumn(columnIndex);
        let numOfCols = Board.numberOfColumns;
        let circles = this._game.board.circles;
        loop:
            for (let i = columnIndex; i <= lastIndex; i += numOfCols) {
                if (circles[i].style.backgroundColor === 'white') {
                    continue;
                }
                for (let j = i + numOfCols; j < i + (4 * numOfCols); j += numOfCols) {
                    if (j > lastIndex ||
                        circles[i].style.backgroundColor !==
                        circles[j].style.backgroundColor) {
                        continue loop;
                    }
                }
                return true;
            }
        return false;
    }

    protected winsHorizontally(indexPlayed: number): boolean {
        let rowIndex = UIUtil.getRowIndex(indexPlayed);
        let circlesInRow = this._game.board.rows[rowIndex].getElementsByClassName('circle');
        loop:
            for (let i = 0; i < Board.numberOfColumns; i++) {
                if ((<HTMLDivElement>circlesInRow[i]).style.backgroundColor === 'white') {
                    continue;
                }
                for (let j = i + 1; j < i + 4; j++) {
                    if (j >= circlesInRow.length ||
                        (<HTMLDivElement>circlesInRow[i]).style.backgroundColor !==
                        (<HTMLDivElement>circlesInRow[j]).style.backgroundColor) {
                        continue loop;
                    }
                }
                return true;
            }
        return false;
    }
}

