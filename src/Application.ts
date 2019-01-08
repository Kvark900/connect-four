import {Game} from "./Game";
import {Board} from "./Board";
import {UIUtil} from './UIUtil';
import {Mode} from "./Mode"

document.addEventListener('DOMContentLoaded', () => {
    let tableHeads = document.getElementsByTagName("th");
    let gameTable = <HTMLTableElement> document.getElementById("game-table");
    let imageElement = `<i id="arrow" class="fas fa-arrow-down"></i>`;
    let circles: HTMLDivElement[] = Array.prototype.slice.call(document.getElementsByClassName("circle"));
    let rows: HTMLTableRowElement[] = Array.prototype.slice.call(document.getElementsByTagName("tr"));
    rows.splice(0, 1); //Remove first row representing arrows
    let newButton = document.getElementById("new-game-button");
    let modeRadios: HTMLInputElement[] = Array.prototype.slice.call(document.getElementsByName("new-game-radio"));

    let navLinks: HTMLAnchorElement[] = Array.prototype.slice.call(document.getElementsByClassName("nav-link"));
    let newGamePanel = document.getElementById("new-game-panel");
    let instructionsPanel = document.getElementById("instructions-panel");
    let aboutPanel = document.getElementById("about-panel");
    let menuContent = document.getElementById("menu-content");

    let board = new Board(gameTable, circles, rows);
    let game = new Game(Mode.VSHUMAN, true, board);
    addEventListeners();
    displayMenuContent("new-game-tab");

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

        newButton.onclick = () =>{
            game.newGame(UIUtil.getModeType(modeRadios));
        };

        for (let i in navLinks) {
            navLinks[i].onclick = () =>{
                displayMenuContent(navLinks[i].id)
            }
        }
    }
    
    function displayMenuContent(id: string): void {
        if(menuContent === null){
            return;
        }
        if (id === "new-game-tab") {
            menuContent.innerHTML = "";
            menuContent.appendChild(newGamePanel);
        }
        else if (id === "instructions-tab") {
            menuContent.innerHTML = "";
            menuContent.appendChild(instructionsPanel);
        }
        else if (id === "about-tab") {
            menuContent.innerHTML = "";
            menuContent.appendChild(aboutPanel);
        }
        changeActiveArticleLink(id)
    }

    function changeActiveArticleLink(id: string): void {
        for (let i in navLinks) {
            if (navLinks[i].className === "nav-link active") {
                navLinks[i].className = "nav-link"
            }
            if (navLinks[i].id === id) {
                navLinks[i].className = "nav-link active"
            }
        }
    }


});
