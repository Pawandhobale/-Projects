// game constants
let inputdir = { x: 0, y: 0 };
let foodsound = new Audio('game1.wav');
let gameoversound = new Audio('game3.wav');
let musicsound = new Audio('game2.wav');
let movesound = new Audio('game2.mav');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 }
// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}
function iscollide(snake) {
    // if  you bump yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            foodsound.pause();
            gameoversound.play();
            return true;
        }
    }

    //if you  bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        foodsound.pause();
        gameoversound.play();
        return true;

    }


}
function gameEngine() {
    // part 1 : updating the snake array and food;
    if (iscollide(snakearr)) {
        // gameoversound.play();
        musicsound.pause();
        foodsound.play();
        inputdir = { x: 0, y: 0 };
        alert("GAME OVER. PRESS ANY KEY TO PLAY AGAIN..!"); 
        snakearr = [{ x: 13, y: 15 }];
        musicsound.play();
        score = 0;
    }

    // if you  have eaten the food ,increment the score and regenarete the food .
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();// this is to paly food sound  
        score +=1;
        // if(score > hiscoreval){
        //     hiscoreval = score;
        //     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
        //     hiscorebox.innerHTML  = "hiscore: " + hiscoreval;

        // }
        scorebox.innerHTML ="score:" + score;
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) } // genrate the random number 
    }

    // moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }

    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


    // part 2 : dispay the snake and food..
    // Dispaly the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeelement.classList.add('head');
        }
        else {
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });
    // Display the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}







// main logic start here
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore === null){
//     hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
// }
// else{
//     hiscoreval =JSON.parse(hiscore);
//     hiscorebox.innerHTML  = "hiscore: " + hiscore;
// }
window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 1 }  //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp": 
            console.log("ArrowUp");
            inputdir.x = 0;
            inputdir.y = -1;

            break;
    

        case "ArrowDown":
            console.log("ArrowDown");
            inputdir.x = 0;
            inputdir.y = 1;

            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x = -1;
            inputdir.y = 0;

            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x = 1;
            inputdir.y = 0;

            break;




        default:
            break;
    }

});
