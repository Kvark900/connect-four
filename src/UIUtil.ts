import {Board} from './Board';
import {Position} from './Position';

export class UIUtil {

    static waitDropToFinish = false;

    static dropCircle(yellowPlays: boolean, columnIndex: number, board: Board): Promise<number> {
        let lastEmptyPlace = UIUtil.findLastEmptyPlace(columnIndex, board);
        let index = columnIndex;

        return new Promise((resolve, rejects) => {
            let interval = setInterval(() => {
                this.waitDropToFinish = true;
                if (lastEmptyPlace === -1) {
                    rejects('No more empty places');
                    clearInterval(interval);
                    this.waitDropToFinish = false;
                }
                else {
                    if (index > columnIndex) {
                        UIUtil.clearCircle(index - 7, board);
                    }
                    if (index === lastEmptyPlace) {
                        UIUtil.paintCircle(yellowPlays, index, board);
                        resolve(lastEmptyPlace);
                        clearInterval(interval);
                        this.waitDropToFinish = false;
                    }
                    UIUtil.paintCircle(yellowPlays, index, board);
                    index += 7;
                }
            }, 80);
        });
    }

    static getColumnIndex(positionIndex: number): number {
        return positionIndex % Board.numberOfColumns;
    }

    static getRowIndex(positionIndex: number): number {
        return Math.floor(positionIndex / Board.numberOfColumns);
    }

    static getLastIndexInColumn(columnIndex: number): any {
        return columnIndex + (Board.numberOfRows - 1) * Board.numberOfColumns;
    }

    static askForNewGame(): boolean {
        return confirm('Do you want to play new game?')
    }

    static announceWinner(yellowPlays: boolean): void {
        alert(`Player ${yellowPlays ? 'Yellow' : 'Red'} wins`);
    }

    static findLastEmptyPlace(columnIndex: number, board: Board): number {
        let lastEmptyCircle = this.getLastIndexInColumn(columnIndex);
        while (lastEmptyCircle >= columnIndex) {
            if (UIUtil.isCircleEmpty(lastEmptyCircle, board)) {
                return lastEmptyCircle;
            }
            lastEmptyCircle -= 7;
        }
        return -1;
    }

    static paintCircle(yellowPlays: boolean, index: number, board: Board): void {
        board.circles[index].style.backgroundColor = yellowPlays ? 'yellow' : 'red';
    }

    static clearCircle(index: number, board: Board): void {
        board.circles[index].style.backgroundColor = 'white';
    }

    static isCircleEmpty(index: number, board: Board): boolean {
        return board.circles[index].style.backgroundColor === 'white';
    }

    static getStartPositionOfDiagonal(indexPlayed: number, isMainDiagonal: boolean): Position {
        let startColIndex = UIUtil.getColumnIndex(indexPlayed);
        let startRowIndex = UIUtil.getRowIndex(indexPlayed);
        while (startRowIndex > 0 && (isMainDiagonal ? startColIndex > 0 :
            startColIndex < Board.numberOfColumns - 1)) {
            isMainDiagonal ? startColIndex -= 1 : startColIndex += 1;
            startRowIndex -= 1
        }
        return new Position(startRowIndex, startColIndex);
    }

    static getIndex(rowIndex: number, colIndex: number): number {
        return (rowIndex * Board.numberOfColumns) + colIndex;
    }

    static getLengthOfDiagonal(rowIndex: number, columnIndex: number, isMainDiagonal: boolean): number {
        if (isMainDiagonal)
            return Math.min(Board.numberOfRows - rowIndex, Board.numberOfColumns - columnIndex);
        return Math.min(Board.numberOfRows - rowIndex, 1 + columnIndex);
    }

    static getLastIndexInDiagonal(startIndex: number, diagonalLength: number, isMainDiagonal: boolean): number {
        if (isMainDiagonal)
            return startIndex + (Board.numberOfColumns + 1) * (diagonalLength - 1);
        return startIndex + (Board.numberOfColumns - 1) * (diagonalLength - 1)
    }

    static showArrow(index: number, tableHeads: HTMLCollection, imageElement: string): void {
        tableHeads[UIUtil.getColumnIndex(index)].innerHTML = imageElement;
    }

    static removeArrow(index: number, tableHeads: HTMLCollection): void {
        tableHeads[UIUtil.getColumnIndex(index)].innerHTML = '';
    }

    static getModeType(modetypes: HTMLInputElement[]): string {
        for (let i in modetypes) {
            if (modetypes[i].checked) {
                return modetypes[i].value;
            }
        }
        return "";
    }

    static clearBoard(board: Board): void {
        for (let circle of board.circles) {
            circle.style.backgroundColor = 'white';
        }
    }

    static disableGameAction(gameBoard: HTMLTableElement): void {
        gameBoard.style.pointerEvents = "none";
    }

    static enableGameAction(gameBoard: HTMLTableElement): void {
        gameBoard.style.pointerEvents = "auto";
    }
}