import {Board} from '../game/Board';
import {ColorsEnum} from "../ColorsEnum";
import {MatrixUtil} from "./MatrixUtil";

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

    static askForNewGame(): boolean {
        return confirm('Do you want to play new game?')
    }

    static announceWinner(yellowPlays: boolean): void {
        alert(`Player ${yellowPlays ? 'Yellow' : 'Red'} wins`);
    }

    static findLastEmptyPlace(columnIndex: number, board: Board): number {
        let lastEmptyCircle = MatrixUtil.getLastIndexInColumn(columnIndex);
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

    static showArrow(index: number, tableHeads: HTMLCollection, imageElement: string): void {
        tableHeads[MatrixUtil.getColumnIndex(index)].innerHTML = imageElement;
    }

    static removeArrow(index: number, tableHeads: HTMLCollection): void {
        tableHeads[MatrixUtil.getColumnIndex(index)].innerHTML = '';
    }

    static getModeType(modetypes: HTMLInputElement[]): string {
        for (const modetype of modetypes) {
            if (modetype.checked) {
                return modetype.value;
            }
        }
        return "";
    }

    static getPlayerColor(playerColor: HTMLInputElement[]): string {
        for (let color of playerColor) {
            if (color.checked) {
                return color.value;
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

    static getColorOfAIPlayer(): ColorsEnum {
        let playerRadios = Array.prototype.slice.call(document.getElementsByName("player-radio"));
        if (UIUtil.getPlayerColor(playerRadios) === ColorsEnum[ColorsEnum.RED]) {
            return ColorsEnum.YELLOW
        }
        return ColorsEnum.RED;
    }
}