let numberOfRows = 6;
let numberOfColumns = 7;
let tableHeads = document.getElementsByTagName("th");
let imageElement = `<i id="arrow" class="fas fa-arrow-down"></i>`;
let circles = document.getElementsByClassName("circle");
let yellowPlays = true;

addEventListeners();

function playMove(columnIndex) {
    let lastEmptyCircle = getLastEmptyCirlcle(columnIndex);

    while (lastEmptyCircle >= columnIndex) {
        if (isCircleEmpty(lastEmptyCircle)) {
            paintCircle(yellowPlays, lastEmptyCircle);
            yellowPlays = !yellowPlays;
            break;
        }
        lastEmptyCircle -= 7;
    }
}

function getLastEmptyCirlcle(columnIndex){
    return columnIndex + (numberOfRows - 1) * numberOfColumns;
}

function paintCircle(yellowPlays, index) {
    if (yellowPlays) {
        circles[index].style.backgroundColor = "yellow";
    }
    else {
        circles[index].style.backgroundColor = "red";
    }
}

function isCircleEmpty(index){
    return circles[index].style.backgroundColor === ""
}

// function checkIfPlayerWins(indexPlayed) {
//     if
//
//
// }

function addEventListeners() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].innerHTML = i.toString();
        circles[i].onmouseover = function () {
            showArrow(i)
        };
        circles[i].onmouseleave = function () {
            removeArrow(i)
        };
        circles[i].onclick = function () {
            playMove(getColumnIndex(i))
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

