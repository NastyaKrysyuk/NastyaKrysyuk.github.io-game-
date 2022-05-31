import { switchToMain } from './SPA.js';

export let game = {
  isStarted: false,
  canvas: null,
  ctx: null,
  field: null,
  character: null,
  width: 0,
  height: 0,
  score: 0,
  dimensions: {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300
    }
  },
  sprites: {
    character: null,
    character1: null,
    character2: null,
    background: null,
    background1: null,
    background2: null,
    shot: null,
    life: null,
    protection: null,
    asteroid: null,
    cell: null,
    explosion: null,
    shield: null
  },

  start() {
    this.isStarted = true;
    this.init();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.preload(() => {
      this.run();
    });
  },

  init() {
    if (localStorage.getItem('character') == null) localStorage.setItem("character", "character");
    if (localStorage.getItem('background') == null) localStorage.setItem("background", "background");
    this.canvas = document.getElementById('mycanvas');
    this.ctx = this.canvas.getContext('2d');
    this.initDimensions();
    this.setTextFont();
  },

  setTextFont() {
    this.ctx.font = '38px monospace';
    this.ctx.fillStyle = '#d5e3e6';
  },

  initDimensions() {
    let data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight
    };

    //деструктуризация 
    let { maxWidth, maxHeight, minWidth, minHeight, realWidth, realHeight } = data;

    if (realWidth / realHeight > maxWidth / maxHeight) {
      this.height = Math.round(this.width * realHeight / realWidth);
      this.height = Math.min(this.height, maxHeight);
      this.height = Math.max(this.height, minHeight);
      this.width = Math.round(realWidth * this.height / realHeight);
      this.canvas.style.height = '100%';
    } else {
      this.width = Math.round(realWidth * maxHeight / realHeight);
      this.width = Math.min(this.width, maxWidth);
      this.width = Math.max(this.width, minWidth);
      this.height = Math.round(this.width * realHeight / realWidth);
      this.canvas.style.height = '100%';
    }

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  preload(callback) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;
    let onAssetLoad = () => {
      ++loaded;
      if (loaded >= required) {
        callback();
      }
    };
    this.preloadSprites(onAssetLoad);
  },

  preloadSprites(onAssetLoad) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = './img/' + key + '.png';
      this.sprites[key].addEventListener('load', onAssetLoad);
    }
  },
  
  reset() {
    this.field.aster = [];
    this.field.expl = [];
    this.field.cells = [];
    this.field.expl = [];
    this.character.fire = [];
  },

  run() {
    // запуск игры
    this.reset();
    this.clearAllInterval();
    this.create();
    this.character.init();

    this.gameInterval = setInterval(() => {
      this.update();
    }, 50);

    this.asterInterval = setInterval(() => {
      this.field.createObject('asteroid', this.sprites.asteroid);
    }, 300);

    this.fireInterval = setInterval(() => {
      this.character.createFire();
    }, 500);

    this.protectionInterval = setInterval(() => {
      this.field.createObject('protection', this.sprites.protection);
    }, 20000);

    this.bonusInterval = setInterval(() => {
      const countLives = document.querySelector('.lives').childElementCount;
      if (countLives < 3 && countLives > 0) {
        this.field.createObject('bonus', this.sprites.bonus);
      }
    }, 8000);
  },

  create() {
    this.field.create();
    this.field.createObject('asteroid', this.sprites.asteroid);
    this.character.createFire();

    this.canvas.addEventListener('touchmove', (event) => {
      this.character.start(event.targetTouches[0].clientX, event.targetTouches[0].clientY);
    });
    this.canvas.addEventListener('mousemove', (event) => {
      this.character.start(event.clientX, event.clientY);
    });
  },

  update() {
    this.render();
    this.field.updateObject();
    this.character.updateFire();
  },

  asterExploded() {
    var score = this.score++;
    document.getElementById('score').textContent = score;
  },

  bonusExploded() {
    var container = document.querySelector('.lives');
    var addLife = document.createElement('img');
    addLife.src = "img/life.png";
    container.appendChild(addLife);
  },

  clearAllInterval() {
    clearInterval(this.gameInterval);
    clearInterval(this.asterInterval);
    clearInterval(this.fireInterval);
    clearInterval(this.bonusInterval);
    clearInterval(this.protectionInterval);
  },

  gameOver(withCallSwitch) {
    this.clearAllInterval()
    this.isStarted = false;
    if (withCallSwitch) {
      this.saveScore();
      switchToMain();
    }
  },

  saveScore() {
    let obj = {};
    let name;
    do {
      name = prompt("Game Over:(\nPlease, enter your name!", "");
    } while (!name)
    obj["name"] = name;
    obj["score"] = this.score;
    let playersRef = firebase.database().ref("list/");
    playersRef.push(obj);
  },

  render() {
    // отрисовка элементов на canvas
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.sprites[localStorage.getItem("background")], 0, 0);
      this.field.render();
      this.character.render();
    });
  }
}

