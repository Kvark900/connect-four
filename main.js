/*
import {Game} from "./src/Game";
import {Board} from "./src/Board";

let numberOfRows = 6;
let numberOfColumns = 7;
let tableHeads = document.getElementsByTagName("th");
let imageElement = `<i id="arrow" class="fas fa-arrow-down"></i>`;
let circles = document.getElementsByClassName("circle");
let rows = Array.from(document.getElementsByTagName("tr"));
rows.splice(0, 1); //Remove first row representing arrows
let yellowPlays = true;


Board board = new Board(circles, rows);
Game game = new Game();
addEventListeners();

function addEventListeners() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].innerHTML = i.toString();
        circles[i].onmouseover = () => {
            showArrow(i)
        };
        circles[i].onmouseleave = () => {
            removeArrow(i)
        };
        circles[i].onclick = () => {
            Game.playMove(getColumnIndex(i))
        }
    }
}

function showArrow(index) {
    tableHeads[getColumnIndex(index)].innerHTML = imageElement;
}

function removeArrow(index) {
    tableHeads[getColumnIndex(index)].innerHTML = "";
}

function getColumnIndex(positionIndex) {
    return positionIndex % numberOfColumns;
}

function getRowIndex(positionIndex) {
    return Math.floor(positionIndex / numberOfColumns);
}

function getLastIndexInColumn(columnIndex) {
    return columnIndex + (numberOfRows - 1) * numberOfColumns;
}

*/
