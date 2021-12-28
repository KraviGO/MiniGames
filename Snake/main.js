function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function startGame() {
    document.getElementById('btnStart').style.display = 'none'
    document.getElementById('canvas').style.display = 'block'

    let cvs = document.getElementById("canvas")
    let ctx = cvs.getContext("2d")

    // Загрузка изображений
    let img_apple = new Image()
    img_apple.src = 'img/apple.png'


    // Загрузка звуков
    let eat_audio = new Audio()
    eat_audio.src = "audio/eat.mp3"


    // Тело змейки
    let snake = []
    snake[0] = {
        x: 0,
        y: 0
    }

    //Перемещение змейки
    let dx = 20
    let dy = 0

    //Позиция яблок
    let apple = {
        x: getRandomInt(25) * 20,
        y: getRandomInt(25) * 20
    }


    // Обработчик нажатий
    document.addEventListener("keydown", move);
    function move() {
        let keyCode;
        keyCode = window.event.keyCode
        if ((keyCode === 87 || keyCode === 38) && !dy) {
            dx = 0
            dy = -20
        }
        if ((keyCode === 83 || keyCode === 40) && !dy) {
            dx = 0
            dy = 20
        }
        if ((keyCode === 65 || keyCode === 37) && !dx) {
            dx = -20
            dy = 0
        }
        if ((keyCode === 68 || keyCode === 39) && !dx) {
            dx = 20
            dy = 0
        }
    }


    let GameCycle, score = 0;
    function draw() {
        // Перемещение змейки
        let lastEl = {
            x: snake[snake.length-1].x,
            y: snake[snake.length-1].y
        }
        for (let i=snake.length-1; i > 0; i--) {
            snake[i].x = snake[i-1].x
            snake[i].y = snake[i-1].y
        }
        snake[0].x += dx
        snake[0].y += dy

        // Змейка съела яблоко
        if (snake[0].x === apple.x && snake[0].y === apple.y) {
            apple.x = getRandomInt(25) * 20
            apple.y = getRandomInt(25) * 20
            snake.push({
                x: lastEl.x,
                y: lastEl.y
            })
            eat_audio.play().then(() => false)
            score++
        }

        // Змейка умирла об хвост
        let died = false;
        for (let i=1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                died = true
            }
        }

        if (!(snake[0].x < 0 || snake[0].x > 480 || snake[0].y < 0 || snake[0].y > 480) && !died){
            // Отрисовка поля
            ctx.clearRect(0,0, 500, 500)
            ctx.fillStyle = 'rgb(70,117,52)'
            ctx.fillRect(0, 0, 500, 500)
            ctx.fillStyle = 'rgb(194,170,8)'
            ctx.fillRect(0, 500, 500, 50)

            // Отрисовка счёта
            ctx.fillStyle = 'rgb(0, 0, 0)'
            ctx.font = '25px Segoe UI'
            ctx.fillText("Счет: " + score, 10, cvs.height - 20)

            // Отрисовка яблок
            ctx.drawImage(img_apple, apple.x, apple.y, 20, 20)

            // Отрисовка змейки
            ctx.fillStyle = 'rgb(0, 0, 0)'
            ctx.fillRect(snake[0].x, snake[0].y, 20, 20)

            ctx.fillStyle = 'rgb(59,72,54)'
            for (let i=1; i < snake.length; i++) {
                ctx.fillRect(snake[i].x, snake[i].y, 20, 20)
            }

            sleep(100)
            GameCycle = requestAnimationFrame(draw)
        }
    }
    cancelAnimationFrame(GameCycle)
    draw()
}
