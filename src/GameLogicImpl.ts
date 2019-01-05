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

    private winsOnMainDiagonal(indexPlayed: number): boolean {
        let diagonalStartPosition = UIUtil.getStartPositionOfDiagonal(indexPlayed, true);
        let startRowIndex = diagonalStartPosition.rowIndex;
        let startColIndex = diagonalStartPosition.columnIndex;
        let diagonalLength = UIUtil.getLengthOfDiagonal(startRowIndex, startColIndex, true);
        let startIndex = UIUtil.getIndex(startRowIndex, startColIndex);
        let lastIndex = UIUtil.getLastIndexInDiagonal(startIndex, diagonalLength, true);
        loop:
            for (let i = startIndex; i <= lastIndex - (8 * 3); i += 8) {
                if (this._game.board.circles[i].style.backgroundColor === '') {
                    continue;
                }
                for (let y = i + 8; y <= i + (8 * 3); y += 8) {
                    if (this._game.board.circles[i].style.backgroundColor
                        != this._game.board.circles[y].style.backgroundColor) {
                        continue loop;
                    }
                }
                return true;
            }
        return false;
    }

    private winsOnMinorDiagonal(indexPlayed: number): boolean {
        let diagonalStartPosition = UIUtil.getStartPositionOfDiagonal(indexPlayed, false);
        let startRowIndex = diagonalStartPosition.rowIndex;
        let startColIndex = diagonalStartPosition.columnIndex;
        let diagonalLength = UIUtil.getLengthOfDiagonal(startRowIndex, startColIndex, false);
        let startIndex = UIUtil.getIndex(startRowIndex, startColIndex);
        let lastIndex = UIUtil.getLastIndexInDiagonal(startIndex, diagonalLength, false);
        loop:
            for (let i = startIndex; i <= lastIndex - (6 * 3); i += 6) {
                if (this._game.board.circles[i].style.backgroundColor === '') {
                    continue;
                }
                for (let y = i + 6; y <= i + (6 * 3); y += 6) {
                    if (this._game.board.circles[i].style.backgroundColor
                        != this._game.board.circles[y].style.backgroundColor) {
                        continue loop;
                    }
                }
                return true;
            }
        return false;
    }

    winsDiagonally(indexPlayed: number): boolean {
        /*main or principal diagonal: top-left corner to the bottom-right corner*/
        /*minor diagonal or antidiagonal: the top-right to bottom-left */
        return  this.winsOnMainDiagonal(indexPlayed) ||
                this.winsOnMinorDiagonal(indexPlayed);
    }


    protected winsVertically(indexPlayed: number): boolean {
        let columnIndex = UIUtil.getColumnIndex(indexPlayed);
        let lastIndex = UIUtil.getLastIndexInColumn(columnIndex);
        let numOfCols = Board.numberOfColumns;
        let circles = this._game.board.circles;
        loop:
            for (let i = columnIndex; i <= lastIndex; i += numOfCols) {
                if (circles[i].style.backgroundColor === '') {
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
                if ((<HTMLDivElement>circlesInRow[i]).style.backgroundColor === '') {
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

