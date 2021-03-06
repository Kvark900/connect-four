export class Board {
    private static readonly _numberOfRows: number = 6;
    private static readonly _numberOfColumns: number = 7;
    private _grid: HTMLTableElement;
    private _circles: Array<HTMLDivElement>;
    private _rows: Array<HTMLTableRowElement>;

    constructor(grid: HTMLTableElement, circles: Array<HTMLDivElement>, rows: Array<HTMLTableRowElement>) {
        this._grid = grid;
        this._circles = circles;
        this._rows = rows;
    }

    get circles(): Array<HTMLDivElement> {
        return this._circles;
    }

    set circles(value: Array<HTMLDivElement>) {
        this._circles = value;
    }

    get rows(): Array<HTMLTableRowElement> {
        return this._rows;
    }

    set rows(value: Array<HTMLTableRowElement>) {
        this._rows = value;
    }

    get grid(): HTMLTableElement {
        return this._grid;
    }

    set grid(value: HTMLTableElement) {
        this._grid = value;
    }

    static get numberOfRows(): number {
        return this._numberOfRows;
    }

    static get numberOfColumns(): number {
        return this._numberOfColumns;
    }
}