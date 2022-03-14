const apple = document.getElementById("apple");
const snakeHead = document.getElementById("snakeHead");
const snakeTail = document.getElementById("snakeTail");
const snakeLife = document.getElementById("snakeLife");
const snakeBoard = document.getElementById("snakeBoard");
const scoreBoard = document.getElementById("scoreBoard");

const setSize = (item , width, height) => {
    item.setAttribute("width", width);
    item.setAttribute("height", height);
}

setSize(apple, 20, 20);
setSize(snakeHead, 40, 40);
setSize(snakeTail, 40, 40);
setSize(snakeLife, 40, 40);
setSize(snakeBoard, 600, 600);
setSize(scoreBoard, 300, 600);