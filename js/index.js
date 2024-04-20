// alert("hello");
let inputDir = {x : 0,y : 0};
const foodsound = new Audio('foodeating.mp3');
const movesound = new Audio('movingarrow.wav');
const gameover = new Audio('gameover.wav');
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
]
food = {x : 13,y:2};
//Game Funtions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1 / speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine(); 
}
function isCollide(snake){
    for(var i = 1; i < snake.length;i++){
        if(snake[0].x === snake[i].x && snake[0].y === snake[i].y)
        {
            return true;
        } 
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameEngine(){
    // 1. Update the snake
    if(isCollide(snakeArr)){
        gameover.play();
        inputDir = {x : 0,y:0};
        alert("Game Over! Press any key to play again");
        snakeArr = [{x : 13,y:15}];
        score = 0;
    }
    // if snake eats the food this will execute
    if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
        score += 1;
        scoreboard.innerHTML = "Score :" + score;
        foodsound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()),y : Math.round(a + (b - a) * Math.random())};
    }
    //Moving the snake
    for(let i = snakeArr.length - 2;i >= 0;i--){
        // const element = snakeArr[i];
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
        // 2. Displaying the snake and food 
    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
        snakeElement.classList.add('head');
    }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    // console.log(e.key);
    inputDir = {x:0,y:1};//Start game
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})