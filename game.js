let startBtn = document.querySelector('#start')
let score = 0;
let lives = 3;
let intervalId;
let enemyInterval;
let seconds = 120

startBtn.addEventListener('click', function() {
    startBtn.style.display = 'none'
    document.querySelector('h1').style.display = 'none'
    document.querySelector('#score').textContent = 'Score: ' + score
    document.querySelector('#lives').textContent = 'Lives: ' + lives
    document.querySelector('.game-area').style.backgroundColor = 'blue'
    createRectangle()
    randomCircle()
    assignControls()
    document.querySelector('#time').textContent = 'Seconds: ' + seconds
    timer()
})

function createRectangle() {
    let div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.position = 'absolute'
    div.style.top = '550px'
    div.style.left = '0px'
    div.style.background = 'red'
    div.classList.add('square')
    document.querySelector('.game-area').appendChild(div)
}

function timer() {
    intervalId = setInterval(function() {
        seconds--
        document.querySelector('#time').textContent = 'Seconds: ' + seconds
        if (seconds === 0) {
            clearInterval(intervalId)
        }
    }, 1000)
}

function randomCircle() {
    let square = document.querySelector('.square')
    let newDiv = document.createElement('div')
    newDiv.style.borderRadius = '100%'
    newDiv.style.position = 'absolute'
    newDiv.style.top = Math.random() * (580 - 100) + 100 + 'px' // add code to avoid generating on top of the red square
    newDiv.style.left = Math.random() * (580 - 100) + 100 + 'px'
    newDiv.style.height = '20px'
    newDiv.style.width = '20px'
    newDiv.style.backgroundColor = 'yellow'
    newDiv.classList.add('circle')
    document.querySelector('.game-area').appendChild(newDiv)
}

function assignControls() {
    let square = document.querySelector('.square')
    document.onkeydown = function(event) {
        event.preventDefault()
        switch(event.key) {
            case 'ArrowUp':
                // taking away the px by parseint the top position and subtracting 20 from it every time the user touches the up arrow key
                square.style.top = parseInt(square.style.top) - 20 + 'px'
                checkForWin()
                break;
            case 'ArrowDown':
                square.style.top = parseInt(square.style.top) + 20 + 'px'
                checkForWin()
                break;
            case 'ArrowLeft':
                square.style.left = parseInt(square.style.left) - 20 + 'px'
                checkForWin()
                break;
            case 'ArrowRight':
                square.style.left = parseInt(square.style.left) + 20 + 'px'
                checkForWin()
                break;
            default: 
                break;
        }
    }
}

function checkForWin() {
    let square = document.querySelector('.square')
    let circle = document.querySelector('.circle')
    let enemy = document.querySelector('.enemy')

    let leftSideOfSquare = parseInt(square.style.left)
    let leftSideOfCircle = parseInt(circle.style.left)
    let topOfSquare = parseInt(square.style.top)
    let topOfCircle = parseInt(circle.style.top)
    let bottomOfCircle = parseInt(circle.style.top) + parseInt(circle.style.height)
    let bottomOfSquare = parseInt(square.style.top) + parseInt(square.style.height)

    let rightSideOfSquare = parseInt(square.style.left) + parseInt(square.style.width)
    // let rightSideOfCircle = parseInt(circle.style.left) + parseInt(circle.style.width)

    // creating a hitbox for the square and circle and when the square touches the circles hitbox the user is given a point
    if (topOfCircle <= bottomOfSquare && topOfCircle >= topOfSquare && leftSideOfCircle >= leftSideOfSquare && leftSideOfCircle <= rightSideOfSquare || bottomOfCircle >= topOfSquare && bottomOfCircle <= bottomOfSquare && leftSideOfCircle >= leftSideOfSquare && leftSideOfCircle <= rightSideOfSquare) {
        circle.parentNode.removeChild(circle)
        score++
        document.querySelector('#score').textContent = 'Score: ' + score
        if (score <= 3) {
            randomCircle()
        }
        else if (score === 4) {
            randomCircle()
            generateEnemies(200)
        }
        else if (score > 4) {
            console.log(enemyInterval)
            clearInterval(enemyInterval)
            enemy.parentNode.removeChild(enemy)
            console.log(enemy)
            randomCircle()
            generateEnemies(200)
        }
    }
}

function generateEnemies(num) {
    let div = document.createElement('div')
    div.style.height = '20px'
    div.style.width = '20px'
    div.style.backgroundColor = 'orange'
    div.style.position = 'absolute'
    div.style.top = Math.random() * (580 - 100) + 100 + 'px'
    div.style.left = Math.random() * (580 - 100) + 100 + 'px'
    div.classList.add('enemy')
    document.querySelector('.game-area').appendChild(div)
    enemyInterval = setInterval(function() {
        animateEnemy('up')
    }, num)
}

function animateEnemy(direction) {
    let enemy = document.querySelector('.enemy')
    let square = document.querySelector('.square')
    let circle = document.querySelector('.circle')

    let topOfOctagon = parseInt(enemy.style.top)
    let bottomOfOctagon = parseInt(enemy.style.top) + 20
    let leftOfOctagon = parseInt(enemy.style.left)
    let rightOfOctagon = parseInt(enemy.style.left) + 20
    let rightSideOfSquare = parseInt(square.style.left) + parseInt(square.style.width)
    let bottomOfSquare = parseInt(square.style.top) + parseInt(square.style.height)
    let topOfSquare = parseInt(square.style.top)
    let leftSideOfSquare = parseInt(square.style.left)

    if (direction === 'up') {
        enemy.style.top = parseInt(enemy.style.top) - 20 + 'px'
    }
    else {
        enemy.style.top = parseInt(enemy.style.top) + 20 + 'px'
    }

    if (parseInt(enemy.style.top) > 570) {
        clearInterval(enemyInterval)
        enemyInterval = setInterval(function() {
            animateEnemy('up')
        }, 200)
    }

    else if (parseInt(enemy.style.top) < 10) {
        clearInterval(enemyInterval)
        enemyInterval = setInterval(function() {
            animateEnemy('down')
        }, 200)
    }

    if (leftOfOctagon >= leftSideOfSquare && leftOfOctagon <= rightSideOfSquare && topOfOctagon >= topOfSquare && topOfOctagon <= bottomOfSquare) {
        lives--
        document.querySelector('#lives').textContent = 'Lives: ' + lives
        square.parentNode.removeChild(square)
        circle.parentNode.removeChild(circle)
        enemy.parentNode.removeChild(enemy)
        if (lives > 0) {
            console.log('hello')
            setTimeout(function() {
                createRectangle()
                randomCircle()
                assignControls()
                clearInterval(enemyInterval)
                generateEnemies(200)
            }, 500)
        }
        else if (lives === 0) {
            clearInterval(enemyInterval)
            document.querySelector('.center').textContent = ''
            let newText = document.createElement('h1')
            newText.textContent = 'Game Over'
            newText.style.color = 'yellow'
            let scoreText = document.createElement('h3')
            scoreText.textContent = 'Your final score was ' + score
            document.querySelector('.center').appendChild(newText) 
            document.querySelector('.center').appendChild(scoreText)
        }
    }
    
}



