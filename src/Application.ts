import {Game} from "./Game";
import {Board} from "./Board";

document.addEventListener('DOMContentLoaded', () => {
    let numberOfRows = 6;
    let numberOfColumns = 7;
    let tableHeads = document.getElementsByTagName("th");
    let imageElement = `<i id="arrow" class="fas fa-arrow-down"></i>`;
    let circles: HTMLDivElement[] = Array.prototype.slice.call(document.getElementsByClassName("circle"));
    let rows: HTMLTableRowElement[] = Array.prototype.slice.call(document.getElementsByTagName("tr"));
    rows.splice(0, 1); //Remove first row representing arrows
    let yellowPlays = true;


    let board = new Board(circles, rows);
    let game = new Game(true, board);
    addEventListeners();

    function addEventListeners(): void {
        for (let i = 0; i < circles.length; i++) {
            circles[i].innerHTML = i.toString();
            (circles[i]).onmouseover = () => {
                showArrow(i)
            };
            (circles[i]).onmouseleave = () => {
                removeArrow(i)
            };
            (circles[i]).onclick = () => {
                game.playMove(getColumnIndex(i))
            }
        }
    }

    function showArrow(index: number): void {
        tableHeads[getColumnIndex(index)].innerHTML = imageElement;
    }

    function removeArrow(index: number): void {
        tableHeads[getColumnIndex(index)].innerHTML = "";
    }

    function getColumnIndex(positionIndex: number): number {
        return positionIndex % numberOfColumns;
    }

    function getRowIndex(positionIndex: number): number {
        return Math.floor(positionIndex / numberOfColumns);
    }

    function getLastIndexInColumn(columnIndex: number): any {
        return columnIndex + (numberOfRows - 1) * numberOfColumns;
    }
});
