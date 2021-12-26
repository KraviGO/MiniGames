function startGame() {
    document.getElementById('btnStart').style.display = 'none'
    document.getElementById('canvas').style.display = 'block'

    let cvs = document.getElementById("canvas")
    let ctx = cvs.getContext("2d")


    // Загрузка фото
    let bird = new Image()
    let bg = new Image()
    let fg = new Image()
    let pipeUp = new Image()
    let pipeBottom = new Image()

    bird.src = "img/bird.png"
    bg.src = "img/bg.png"
    fg.src = "img/fg.png"
    pipeUp.src = "img/pipeUp.png"
    pipeBottom.src = "img/pipeBottom.png"


    // Загрузка аудио
    let fly = new Audio()
    let score_audio = new Audio()

    fly.src = "audio/fly.mp3"
    score_audio.src = "audio/score.mp3"


    let gap = 100
    let score = 0


    // Обработчик нажатий
    document.addEventListener("keydown", moveUp);

    function moveUp() {
        yPos -= 40
        fly.play()
    }


    // Создание блоков
    let pipe = []

    pipe[0] = {
        x : cvs.width,
        y : 0
    }


    // Позиция птички
    let xPos = 10
    let yPos = 150
    let grav = 2
    

    function draw() {
        ctx.drawImage(bg, 0, 0)

        pipe.forEach(elm => {

            ctx.drawImage(pipeUp, elm.x, elm.y);
            ctx.drawImage(pipeBottom, elm.x, elm.y + pipeUp.height + gap);

            elm.x--

            if(elm.x == 125)
                pipe.push({
                    x : cvs.width,
                    y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                })

            // Отслеживание смерти
            if(xPos + bird.width >= elm.x
            && xPos <= elm.x + pipeUp.width
            && (yPos <= elm.y + pipeUp.height
            || yPos + bird.height >= elm.y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {

                location.reload()
            }

            if(elm.x == 0) {
                score++
                score_audio.play()
            }
        })

        ctx.drawImage(fg, 0, cvs.height - fg.height)
        ctx.drawImage(bird, xPos, yPos)

        yPos += grav

        ctx.font = '25px Segoe UI'
        ctx.fillText("Счет: " + score, 10, cvs.height - 20)

        requestAnimationFrame(draw)
    }

    pipeBottom.onload = draw
} 