import {Board} from "../game/Board";
import {Position} from "../Position";

export class MatrixUtil {
    static getColumnIndex(positionIndex: number): number {
        return positionIndex % Board.numberOfColumns;
    }

    static getRowIndex(positionIndex: number): number {
        return Math.floor(positionIndex / Board.numberOfColumns);
    }

    static getLastIndexInColumn(columnIndex: number): any {
        return columnIndex + (Board.numberOfRows - 1) * Board.numberOfColumns;
    }

    static getStartPositionOfDiagonal(indexPlayed: number, isMainDiagonal: boolean): Position {
        let startColIndex = MatrixUtil.getColumnIndex(indexPlayed);
        let startRowIndex = MatrixUtil.getRowIndex(indexPlayed);
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
}