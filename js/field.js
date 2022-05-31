import {game} from './game.js';

game.field = {
  height: 13,
  width: 16,
  offsetX: 0,
  offsetY: 0,
  cells: [],
  aster: [],
  expl: [],

  create() {
    this.createCells();
  },

  createCells() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },

  createCell(row, col) {
    const cellSize = game.sprites.cell.width;
    this.offsetX = (game.width / 2) - (cellSize * this.width / 2);
    this.offsetY = (game.height / 2) - (cellSize * this.height / 2);
    return {
      row: row,
      col: col,
      x: this.offsetX + cellSize * col,
      y: this.offsetY + cellSize * row
    };
  },

  createObject(typeObj, obj) {
    this.aster.push({
      x: Math.floor(this.offsetX + Math.random() * ((this.offsetX + this.width * game.sprites.cell.width) - game.sprites.asteroid.width / 2  - this.offsetX)),
      y: this.offsetY,
      angle: 0,
      dxangle: Math.random() * 0.2 - 0.1,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 + 1,
      del: 0,
      type: typeObj
    });
  },

//условие столкновения объектов
  collides(obj1X, obj1Y, obj2X, obj2Y, obj1H, obj1W, obj2H, obj2W) {
    return obj1X < obj2X + obj2W / 3 &&
      obj1X + obj1W / 3 > obj2X &&
      obj1Y < obj2Y + obj2H / 3 &&
      obj1H / 3 + obj1Y > obj2Y
  },

//удалить после столкновения
  deleteObject(objNum1, objNum2) {
    this.expl.push({
      x: this.aster[objNum1].x,
      y: this.aster[objNum1].y,
      animx: 0,
      animy: 0
    });
    this.aster[objNum1].del = 1;
    game.character.fire.splice(objNum2, 1);
  },

  updateObject() {
    for (let i in this.aster) {
      switch (this.aster[i].type) {
        case 'asteroid':
        case 'bonus':
          this.aster[i].y += this.aster[i].dy;
          this.aster[i].x += this.aster[i].dx;
          this.aster[i].angle = this.aster[i].angle + this.aster[i].dxangle;
          break;
        case 'protection':
          this.aster[i].y += this.aster[i].dy + 7;
          this.aster[i].dx = 0;
          break;
      }

      if (this.aster[i].y >= this.offsetY + this.height * game.sprites.cell.height - 50) {
        if (this.aster[i].type === "asteroid" && !game.character.isProtected) {
          //минус жизнь
          document.querySelector('.lives').firstChild.remove();
          //конец игры
          if (document.querySelector('.lives').childElementCount == 0) {
            game.gameOver(true);
          }
        }
        this.aster.splice(i, 1);
      }

      //столкновение астероида + стенка 
      if (this.aster[i].x <= this.offsetX || this.aster[i].x >= this.offsetX + game.sprites.cell.width * this.width - game.sprites.asteroid.width) {
        this.aster[i].dx = -this.aster[i].dx;
      }

      for (var j in game.character.fire) {
        if (this.collides(game.character.fire[j].x, game.character.fire[j].y, this.aster[i].x, this.aster[i].y, game.sprites.shot.height, game.sprites.shot.width, game.sprites.asteroid.height, game.sprites.asteroid.width)) {

          //столкновение астероид + пуля
          if (this.aster[i].type === "asteroid") {
            game.asterExploded();
            this.deleteObject(i, j);

            //столкновение жизнь + пуля
          } else if (this.aster[i].type === "bonus") {
            this.deleteObject(i, j);
            //добавляем жизнь
            game.bonusExploded();
          }
          //столкновение щит + пуля
          else if (this.aster[i].type === "protection") {
            this.deleteObject(i, j);
            game.character.isProtected = true;
            //анимация защиты
            this.protectInterval = setInterval(() => {
              game.character.onProtect();
            }, 50);
            setTimeout(() => {
              clearInterval(this.protectInterval);
              game.character.isProtected = false;
            }, 8000)
          }
        }
      }
      if (this.aster[i].del == 1) this.aster.splice(i, 1);
    }

    //Анимация взрывов
    for (var i in this.expl) {
      this.expl[i].animx = this.expl[i].animx + 5;
      if (this.expl[i].animx > 5) { this.expl[i].animy++; this.expl[i].animx = 0 }
      if (this.expl[i].animy > 7) this.expl.splice(i, 1);
    }
  },

  render() {
    this.cells.forEach((cell) => {
      game.ctx.drawImage(game.sprites.cell, cell.x, cell.y);
    });

    this.aster.forEach((aster) => {
      switch (aster.type) {
        case 'asteroid':
          game.ctx.save();
          game.ctx.translate(aster.x + 25, aster.y + 25);
          game.ctx.rotate(aster.angle);
          game.ctx.drawImage(game.sprites.asteroid, -25, -25, 30, 30);
          game.ctx.restore();
          break;
        case 'bonus':
          game.ctx.drawImage(game.sprites.life, aster.x, aster.y, 20, 20);
          break;
        case 'protection':
          game.ctx.drawImage(game.sprites.protection, aster.x, aster.y, 20, 20);
          break;
      }
    });
    this.expl.forEach((expl) => {
      game.ctx.drawImage(game.sprites.explosion, 128 * Math.floor(expl.animx), 128 * Math.floor(expl.animy), 128, 128, expl.x, expl.y, 30, 30);
    });
  }
};
