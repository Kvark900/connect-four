import {GameLogic} from './GameLogic';
import {GameLogicImpl} from './GameLogicImpl';
import {Board} from './Board';
import {UIUtil} from './UIUtil';
import {Mode} from "./Mode";

export class Game {
    private _board: Board;
    private _yellowPlays: boolean;
    private _gameLogic: GameLogic;
    private _mode: Mode;

    constructor(mode: Mode, yellowPlays: boolean, board: Board) {
        this._mode = mode;
        this._yellowPlays = yellowPlays;
        this._board = board;
        this._gameLogic = new GameLogicImpl(this);
    }

    playMove(columnIndex: number): void {
        if (UIUtil.waitDropToFinish === true) {
            return
        }
        UIUtil.dropCircle(this._yellowPlays, columnIndex, this._board)
            .then((lastEmptyPlace: number) => {
                    if (this._gameLogic.playerWins(lastEmptyPlace)) {
                        UIUtil.announceWinner(this._yellowPlays);
                        if (UIUtil.askForNewGame()) {
                            return this.restartGame();
                        }
                        else {
                            this._board.grid.style.pointerEvents = "none";
                        }

                    }
                    this._yellowPlays = !this._yellowPlays;
                }
            ).catch(reason => alert(reason));
    }


    playAiMove(): number {
        return Math.floor(Math.random() * (Board.numberOfColumns + 1));
    }

    restartGame(): void {
        UIUtil.clearBoard(this.board);
        this._yellowPlays = !this._yellowPlays;
    }

    newGame(mode: string): void {
        this._board.grid.style.pointerEvents = "auto";
        UIUtil.clearBoard(this.board);
        if (mode === "VSHUMAN") {
            this.mode = Mode.VSHUMAN;
        }
        else this.mode = Mode.VSCOMPUTER
    }

    get board(): Board {
        return this._board;
    }

    set board(value: Board) {
        this._board = value;
    }

    get yellowPlays(): boolean {
        return this._yellowPlays;
    }

    set yellowPlays(value: boolean) {
        this._yellowPlays = value;
    }

    get gameLogic(): GameLogic {
        return this._gameLogic;
    }

    set gameLogic(value: GameLogic) {
        this._gameLogic = value;
    }

    get mode(): Mode {
        return this._mode;
    }

    set mode(value: Mode) {
        this._mode = value;
    }

}


