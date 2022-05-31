import {game} from './game.js';

game.character = {
  moveX: 0,
  moveY: 0,
  fire: [],
  animx: 0,
  animy: 0,
  isProtected:false,

  //координаты героя при загрузке
  init() {
    this.moveX = game.field.offsetX + (game.field.width * game.sprites.cell.width) / 2 -20;
    this.moveY = game.field.offsetY + game.field.height * game.sprites.cell.height - game.sprites[localStorage.getItem("character")].height / 2;
  },

  createFire() {
    this.fire.push({
      x: this.moveX + 10,
      y: this.moveY - 10,
      dx: -0.2,
      dy: -2.5
    })
    this.fire.push({
      x: this.moveX + 10,
      y: this.moveY - 10,
      dx: 0.2,
      dy: -2.5
    })
  },

  updateFire() {
    for (let i in this.fire) {
      this.fire[i].y += this.fire[i].dy;
      this.fire[i].x += this.fire[i].dx;
      if (this.fire[i].y <= game.field.offsetY || this.fire[i].x <= game.field.offsetX || this.fire[i].x >= game.field.offsetX + game.sprites.cell.width * game.field.width) {
        this.fire.splice(i, 1)
      }
    }
  },

  start(offsetX,offsetY) {
    this.moveX = offsetX;
    if (this.moveX <= game.field.offsetX) {
      this.moveX = game.field.offsetX;
    } else if (this.moveX >= game.field.offsetX + game.field.width * game.sprites.cell.width - game.sprites[localStorage.getItem("character")].width / 2) {
      this.moveX = game.field.offsetX + game.field.width * game.sprites.cell.width - game.sprites[localStorage.getItem("character")].width / 2
    }

    if(offsetY>game.field.offsetY*2){
      game.canvas.style.cursor = "none";
    }else{
      game.canvas.style.cursor = "pointer";
    }
  },

  onProtect() {
    this.animx = this.animx + 1;
    if (this.animx > 4) {
      this.animy++; this.animx = 0;
    }
    if (this.animy > 3) {
      this.animx = 0; this.animy = 0;
    }
  },

  render() {
    this.fire.forEach((fire) => {
      game.ctx.drawImage(game.sprites.shot, fire.x, fire.y, 20, 20);
    });
    game.ctx.drawImage(game.sprites[localStorage.getItem("character")], this.moveX, this.moveY, 50, 50);
    game.ctx.drawImage(game.sprites.shield, 192 * Math.floor(this.animx), 192 * Math.floor(this.animy), 192, 192, this.moveX - 15, this.moveY - 10, 80, 80);
  }
}
