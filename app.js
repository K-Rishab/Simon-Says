let gameSeq = [];
let userSeq = [];

// To choose random button
let randomBtn = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector(".score");

document.addEventListener("keypress", function () {
     if (started == false) {
          started = true;
          document.querySelector(".higest-score").innerText = `Highest Score = ${highScore}`;
          levelup();
     }
});

function levelup() {
     userSeq = [];
     level++;
     h2.innerText = `Level ${level}`;
     // choose random button
     let randomIdx = Math.floor(Math.random() * 4);
     let randomColor = randomBtn[randomIdx];
     gameSeq.push(randomColor);
     console.log(gameSeq);
     let randBtn = document.querySelector(`.${randomColor}`);
     gameFlash(randBtn);
}

//flash button
function gameFlash(btn) {
     btn.classList.add("gameFlash");
     setTimeout(function () { btn.classList.remove("gameFlash"); }, 250);
}
function userFlash(btn) {
     btn.classList.add("userFlash");
     setTimeout(function () { btn.classList.remove("userFlash"); }, 250);
}

function checkAns(index) {
     if (gameSeq[index] === userSeq[index]) {
          if (gameSeq.length == userSeq.length) {
               setTimeout(levelup, 1000);
          }
     }
     else {
          if (highScore < level -1) {
               highScore = level -1;
          }
          h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
          document.querySelector("body").style.backgroundColor = 'red';
          setTimeout(() => document.querySelector("body").style.backgroundColor = 'white', 150);
          reset();
     }
}
function buttonPress() {
     let btn = this;
     userFlash(btn);
     let userColor = btn.getAttribute("id");
     userSeq.push(userColor);
     console.log(userSeq);
     checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
     btn.addEventListener("click", buttonPress);
}

function reset() {
     started = false;
     gameSeq = [];
     userSeq = [];
     level = 0;
}