import {Game} from "./Game";
import {Board} from "./Board";
import {UIUtil} from './UIUtil';

document.addEventListener('DOMContentLoaded', () => {
    let tableHeads = document.getElementsByTagName("th");
    let imageElement = `<i id="arrow" class="fas fa-arrow-down"></i>`;
    let circles: HTMLDivElement[] = Array.prototype.slice.call(document.getElementsByClassName("circle"));
    let rows: HTMLTableRowElement[] = Array.prototype.slice.call(document.getElementsByTagName("tr"));
    rows.splice(0, 1); //Remove first row representing arrows


    let board = new Board(circles, rows);
    let game = new Game(true, board);
    addEventListeners();

    function addEventListeners(): void {
        for (let i = 0; i < circles.length; i++) {
            circles[i].style.backgroundColor = "white";
            (circles[i]).onmouseover = () => {
                UIUtil.showArrow(i, tableHeads, imageElement)
            };
            (circles[i]).onmouseleave = () => {
                UIUtil.removeArrow(i, tableHeads)
            };
            (circles[i]).onclick = () => {
                game.playMove(UIUtil.getColumnIndex(i))
            }
        }
    }
});
