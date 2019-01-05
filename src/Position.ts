export class Position {
    private _rowIndex: number;
    private _columnIndex: number;

    constructor(rowIndex: number, columnIndex: number) {
        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
    }

    get rowIndex(): number {
        return this._rowIndex;
    }

    set rowIndex(value: number) {
        this._rowIndex = value;
    }

    get columnIndex(): number {
        return this._columnIndex;
    }

    set columnIndex(value: number) {
        this._columnIndex = value;
    }
}