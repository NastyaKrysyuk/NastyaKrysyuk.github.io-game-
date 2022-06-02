import {createButtonOK} from "./modul-helper-function.js"
import {switchToMain,wrapper} from "../spa.js"

function createGamePage() {
  let canvas = document.createElement('canvas');
  canvas.id = "mycanvas";
  wrapper.appendChild(canvas);
  wrapper.appendChild(createScore());
  wrapper.appendChild(createLives("lives"));
  wrapper.appendChild(createButtonOK("Back to menu", switchToMain, "score but-back"));
}

function createScore() {
  let score = document.createElement('div');
  score.className = "score";
  score.textContent = "Score:";
  let span = document.createElement('span');
  span.textContent = '0';
  span.id = "score";
  score.appendChild(span);
  return score;
}

function createLives(className) {
  let lives = document.createElement("div")
  lives.className = className;
  for (let i = 1; i <= 3; i++) {
    let img = document.createElement('img');
    img.src = "img/life.png";
    lives.appendChild(img);
  }
  return lives;
}

export {createGamePage}