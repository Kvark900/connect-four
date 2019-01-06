import {GameLogic} from './GameLogic';
import {GameLogicImpl} from './GameLogicImpl';
import {Board} from './Board';
import {UIUtil} from './UIUtil';

export class Game {
    // private _playerOne: Player;
    // private _playerTwo: Player;
    private _board: Board;
    private _yellowPlays: boolean;
    private _gameLogic: GameLogic;

    constructor(yellowPlays: boolean, board: Board) {
        this._yellowPlays = yellowPlays;
        this._board = board;
        this._gameLogic = new GameLogicImpl(this);
    }

    playMove(columnIndex: number): void {
        UIUtil.dropCircle(this._yellowPlays, columnIndex, this._board)
            .then((lastEmptyPlace: number) => {
                    if (this._gameLogic.playerWins(lastEmptyPlace)) {
                        UIUtil.announceWinner(this._yellowPlays);
                        if (UIUtil.askForNewGame()) {
                            return this.restartGame();
                        }
                    }
                    this._yellowPlays = !this._yellowPlays;
                }
            ).catch(reason => alert(reason));
    }

    restartGame(): void {
        for (let circle of this._board.circles) {
            circle.style.backgroundColor = 'white';
        }
        this._yellowPlays = !this._yellowPlays;
    }

    // get playerOne(): Player {
    //     return this._playerOne;
    // }
    //
    // set playerOne(value: Player) {
    //     this._playerOne = value;
    // }
    //
    // get playerTwo(): Player {
    //     return this._playerTwo;
    // }
    //
    // set playerTwo(value: Player) {
    //     this._playerTwo = value;
    // }
    //
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
}


