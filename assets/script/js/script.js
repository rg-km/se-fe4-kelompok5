const CELL_SIZE = 20;
// Soal no 1: Set canvas size menjadi 600
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
        LEFT: 0,
        RIGHT: 1,
        UP: 2,
        DOWN: 3,
    }
    // Soal no 2: Pengaturan Speed (semakin kecil semakin cepat) ubah dari 150 ke 120
const MOVE_INTERVAL = 160;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        level: 1,
        scoreToNextLevel: 5
    }
}


let snake1 = initSnake("gold");
//let snake2 = initSnake("red");


// Soal no 4: make apples array
let apples = [{
        color: "red",
        position: initPosition(),
    },
    {
        color: "red",
        position: initPosition(),
    }
];

let nyawaa = [{
    color: "red",
    position: initPosition(),
},
{
    color: "blue",
    position: initPosition(),
}
]

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

// Soal no 6: Pada fungsi drawScore, tambahkan score3Board:
function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("scoreBoard");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    if (snake.score == snake.scoreToNextLevel) {
        snake.scoreToNextLevel += 5;
        snake.level++;
        const audio = new Audio('assets/sound/level-inc.mpeg');
        audio.play();
    }

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Times New Roman";
    
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText("Level", 110, 50);
    scoreCtx.fillText(snake.level, 140, 100);
    scoreCtx.fillText("Score", 110, 300);
    scoreCtx.fillText(snake.score, 140, 350);
}

function render() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        var img = document.getElementById("snakeHead");
        ctx.drawImage(img, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        for (let i = 1; i < snake1.body.length; i++) {
            var img = document.getElementById("snakeTail")
            ctx.drawImage(img, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        }

        for (let i = 0; i < apples.length; i++) {
            let apple = apples[i];
            // Soal no 3: DrawImage apple dan gunakan image id:
            var img = document.getElementById("apple");
            ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

        drawScore(snake1);
        for (let i = 0; i < nyawaa.length; i++) {
            let nyawa = nyawaa[i];

            // Soal no 3: DrawImage apple dan gunakan image id:
            var img = document.getElementById("snakeLife");
            ctx.drawImage(img, nyawa.position.x * CELL_SIZE, nyawa.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        // Soal no 6: Draw Player 3 Score:
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

// Soal no 4: Jadikan apples array
function eat(snake, apples, nyawaa) {
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
            apple.position = initPosition();
            snake.score++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
        }
    }
    for (let i = 0; i < nyawaa.length; i++) {
        let nyawa = nyawaa[i];
        if (snake.head.x == nyawa.position.x && snake.head.y == nyawa.position.y) {
            nyawa.position = initPosition();
            snake.score++;
            snake.body.push({ x: snake.head.x, y: snake.head.y });
        }
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apples, nyawaa);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apples, nyawaa);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apples, nyawaa);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apples, nyawaa);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        // Soal no 5: Add game over audio:
        var audio = new Audio('assets/sound/game-over.mp3');
        audio.play();
        alert("Game over");
        snake1 = initSnake("green");
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    // Soal no 6: Check collision dengan snake3
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

initGame();

export default render;