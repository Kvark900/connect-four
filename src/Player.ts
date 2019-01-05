export class Player {
    private _color: ColorsEnum;
    private _isPlaying: boolean;


    constructor(color: ColorsEnum, isPlaying: boolean) {
        this._color = color;
        this._isPlaying = isPlaying;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get isPlaying(): boolean {
        return this._isPlaying;
    }

    set isPlaying(value: boolean) {
        this._isPlaying = value;
    }
}