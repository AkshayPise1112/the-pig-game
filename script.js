'use scrict';

//selecting elements
const first = document.querySelector('.player--0');
const second = document.querySelector('.player--1');
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const curr0Ele = document.getElementById('currScore--0');
const curr1Ele = document.getElementById('currScore--1');
const diceEle = document.querySelector('.diceimg');
const newbtn = document.querySelector('.refreshbtn');
const rollbtn = document.querySelector('.dicebtn');
const holdbtn = document.querySelector('.holdbtn');
const Qbtn = document.querySelector('.question');
const rules = document.querySelector('.rules');
const overlay = document.querySelector('.overlay');
const cancelbtn = document.querySelector('.cancel');

//this are the variable that we need in the game
let score, currScore, currActive, playing;

//in the initialCondition function we declare initial conditions of the game 
const initialCondition = function() {
    //starting conditions
    //display the initial states on screen
    score0Ele.textContent = 0;
    score1Ele.textContent = 0;

    diceEle.classList.add('hidden');

    curr0Ele.textContent = 0;
    curr1Ele.textContent = 0;

    //assign initial values to variable
    score = [0, 0];
    currScore = 0;
    currActive = 0;
    playing = true;
    
    //this is for new game button if one player wins we have to remove winner class 
    document.querySelector(`.player--0`).classList.remove('winner');
    document.querySelector(`.player--1`).classList.remove('winner');

    //this is for displaying active player on screen
    document.querySelector(`.player--0`).classList.add('opacity');
    document.querySelector(`.player--1`).classList.remove('opacity');
    
}

//when game start the condition will be written in this function
initialCondition();

//this is the switch player logic for switching one player to another
const switchPlayer = function() {
    currScore = 0;
    document.querySelector(`#currScore--${currActive}`).textContent = 0;
    currActive = currActive === 0 ? 1 : 0;
    first.classList.toggle('opacity');
    second.classList.toggle('opacity');
}

//main dice rolling logic
const rollLogic = function(){
    //checking the condition of game is still playing or not
    if(playing){
        
        const num = Math.trunc(Math.random() * 6) + 1;
        
        diceEle.classList.remove('hidden');
        
        diceEle.src = `dice-${num}.png`;
        
        //checking the dice random number is not one and if it is 1 then switch the player
        if(num !== 1){
            currScore += num;
            document.getElementById(`currScore--${currActive}`).textContent = currScore;
        }
        else{
            switchPlayer();
        }
    }
}

//adding dice roll button functionality
rollbtn.addEventListener('click', rollLogic)

//If user press Enter button then also dice is rolled
document.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        rollLogic();
    }
})

//main hold button logic
const holdLogic = function(){
    //checking the condition of game is still playing or not
    if(playing){
        score[currActive] += currScore;
        document.getElementById(`score--${currActive}`).textContent = score[currActive];
        document.getElementById(`currScore--${currActive}`).textContent = 0;
        
        //checking the player is a winner or not
        if(score[currActive] >= 100){
            playing = false;
            diceEle.classList.add('hidden');
            document.querySelector(`.player--${currActive}`).classList.add('winner');
            document.querySelector(`.player--${currActive}`).classList.remove('opacity');
        }
        else{
            switchPlayer();
        }
    }
}

holdbtn.addEventListener('click', holdLogic);

//If user press Space button then also it can hold the score
document.addEventListener('keydown', function(e){
    if(e.key === ' '){
        holdLogic();
    }
})

//this is for working of new Game button
newbtn.addEventListener('click', initialCondition)

//when user press Escape button then also new game start
document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
        initialCondition();
    }
})

const rulesToggle = function(){
    rules.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
}

Qbtn.addEventListener('click', rulesToggle);

cancelbtn.addEventListener('click', rulesToggle);

overlay.addEventListener('click', rulesToggle);