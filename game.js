let startBtn = document.querySelector('#start')
let score = 0;

startBtn.addEventListener('click', function() {
    startBtn.style.display = 'none'
    createRectangle()
    randomCircle()
    assignControls()
})

function createRectangle() {
    let div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.position = 'absolute'
    div.style.bottom = '0px'
    div.style.left = '0px'
    div.style.background = 'red'
    div.classList.add('square')
    document.querySelector('.game-area').appendChild(div)
    createGrid()
}

function randomCircle() {
    let newDiv = document.createElement('div')
    newDiv.style.borderRadius = '100%'
    newDiv.style.position = 'absolute'
    newDiv.style.top = Math.random() * (580 - 100) + 100 + 'px'
    newDiv.style.left = Math.random() * (580 - 100) + 100 + 'px'
    newDiv.style.height = '20px'
    newDiv.style.width = '20px'
    newDiv.style.backgroundColor = 'yellow'
    newDiv.classList.add('circle')
    document.querySelector('.game-area').appendChild(newDiv)
}

function createGrid() {
    let square = document.querySelector('.square')
    let squareWidth = parseInt(square.style.width)
    let squareHeight = parseInt(square.style.height)
    // calculating how many squares can be created in each row, since we're dealing with a perfect square, whatever is calculated below becomes the number of squares in a row as well as the number of rows
    let numberOfSquaresInX = 600 / squareWidth
    // creating divs for every possible space in the parent div
    for (let i = 0; i < numberOfSquaresInX * numberOfSquaresInX; i++) {
        let div = document.createElement('div')
        div.style.height = square.style.height
        div.style.width = square.style.width
        div.classList.add('grid-square')
        div.style.backgroundColor = 'blue'
        document.querySelector('.game-area').appendChild(div)
    }
}

// calculate what grid the ball is in and what grid the square is in every time the square moves and compare them
function assignControls() {
    let square = document.querySelector('.square')
    document.onkeydown = function(event) {
        switch(event.key) {
            case 'ArrowUp':
                // taking away the px by parseint the top position and subtracting 20 from it every time the user touches the up arrow key
                square.style.bottom = parseInt(square.style.bottom) + 20 + 'px'
                checkForWin()
                break;
            case 'ArrowDown':
                square.style.bottom = parseInt(square.style.bottom) - 20 + 'px'
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

    let leftSideOfSquare = parseInt(square.style.left)
    let leftSideOfCircle = parseInt(circle.style.left)

    let rightSideOfSquare = parseInt(square.style.left) + parseInt(square.style.width)
    let rightSideOfCircle = parseInt(circle.style.left) + parseInt(circle.style.width)
    // creating a hitbox for the square and circle and when the square touches the circles hitbox the user is given a point
    if (rightSideOfSquare >= leftSideOfCircle && rightSideOfSquare <= rightSideOfCircle || leftSideOfSquare <= rightSideOfCircle && leftSideOfSquare >= leftSideOfCircle) {
        console.log('win')
        circle.style.display = 'none'
        score++
        randomCircle()
    }
}