import {GameLogic} from './GameLogic';
import {GameLogicImpl} from './GameLogicImpl';
import {Board} from './Board';
import {UIUtil} from '../utils/UIUtil';
import {ModeEnum} from "../ModeEnum";
import {ColorsEnum} from "../ColorsEnum";

export class Game {
    private _board: Board;
    private _gameLogic: GameLogic;
    private _mode: ModeEnum;
    private _yellowPlaysNext: boolean;
    private _yellowPlaysFirst: boolean;
    private _computerColor = ColorsEnum.NONE;

    constructor(mode: ModeEnum, board: Board, yellowPlaysFirst: boolean) {
        this._mode = mode;
        this._yellowPlaysNext = yellowPlaysFirst;
        this._yellowPlaysFirst = yellowPlaysFirst;
        this._board = board;
        this._gameLogic = new GameLogicImpl(this);
        if (mode === ModeEnum.VSCOMPUTER) {
            this._computerColor = UIUtil.getColorOfAIPlayer();
            this.playAiMove()
        }
    }

    playMove(columnIndex: number): void {
        if (UIUtil.waitDropToFinish === true) {
            return
        }
        UIUtil.dropCircle(this._yellowPlaysNext, columnIndex, this._board)
            .then((lastEmptyPlace: number) => {
                    if (this._gameLogic.playerWins(lastEmptyPlace)) {
                        UIUtil.announceWinner(this._yellowPlaysNext);
                        if (UIUtil.askForNewGame()) {
                            return this.restartGame();
                        }
                        else {
                            UIUtil.disableGameAction(this.board.grid);
                            return;
                        }
                    }
                    this._yellowPlaysNext = !this._yellowPlaysNext;

                    if (this.mode === ModeEnum.VSCOMPUTER)
                        this.playAiMove()
                }
            ).catch(reason => alert(reason));
    }

    playAiMove(): void {
        let aIMove = Math.floor(Math.random() * Board.numberOfColumns);
        if (this.yellowPlaysNext && this._computerColor === ColorsEnum.YELLOW) {
            this.playMove(aIMove);
        }
        else if (!this.yellowPlaysNext && this._computerColor === ColorsEnum.RED) {
            this.playMove(aIMove);
        }
    }

    restartGame(): void {
        UIUtil.clearBoard(this.board);
        this._yellowPlaysFirst = !this._yellowPlaysFirst;
        this._yellowPlaysNext = this._yellowPlaysFirst;
        if (ModeEnum.VSCOMPUTER)
            this.playAiMove();
    }

    newGame(mode: string): void {
        UIUtil.enableGameAction(this.board.grid);
        UIUtil.clearBoard(this.board);
        this._yellowPlaysFirst = true;
        this._yellowPlaysNext = true;

        if (mode === "VSHUMAN") {
            this.mode = ModeEnum.VSHUMAN;
        }
        else {
            this.mode = ModeEnum.VSCOMPUTER;
            this._computerColor = UIUtil.getColorOfAIPlayer();
            this.playAiMove();
        }
    }

    get board(): Board {
        return this._board;
    }

    set board(value: Board) {
        this._board = value;
    }

    get yellowPlaysNext(): boolean {
        return this._yellowPlaysNext;
    }

    set yellowPlaysNext(value: boolean) {
        this._yellowPlaysNext = value;
    }

    get gameLogic(): GameLogic {
        return this._gameLogic;
    }

    set gameLogic(value: GameLogic) {
        this._gameLogic = value;
    }

    get mode(): ModeEnum {
        return this._mode;
    }

    set mode(value: ModeEnum) {
        this._mode = value;
    }
}


