const TOP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY=87;
const S_KEY=83;

class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.bg = new Background(this.ctx);
    this.pelota = new Pelota(this.ctx);
    this.rectanguloDer= new Rectangulo(this.ctx,470,150);
    this.rectanguloIzq= new Rectangulo(this.ctx,10,150);
    //this.rectanguloIzq= new RectanguloIzq(this.ctx,10,150);
    this.intervalId = null;

    this.tick = 0;

    this._setListeners();

    this.scoreLeft=0;
    this.scoreRight=0;
    this.speed=10;
  }

  run() {
    this.intervalId = setInterval(() => {
      this._clear()
      this._draw()
      this._move()
      this._checkCollisions();
    }, 1000 / 60)
  }



  _clear() {
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "purple";
    this.ctx.fillText(this.scoreRight, 215, 50);
    this.ctx.fillText(this.scoreLeft, 270, 50);
    this.bg.draw();
    this.pelota.draw();
    //this.rectanguloIzq.draw();
    this.rectanguloDer.draw();
    this.rectanguloIzq.draw();

  }


  _move() {
    //this.bg.move()
    this.pelota.move()
    //this.rectanguloIzq.move();
    this.rectanguloDer.move();
    this.rectanguloIzq.move();

  }

  _checkCollisions() {
    /*const col = this.obstacles.some(o => {
      return o.collide(this.mario)
    })*/
    //const col = this.pelota.collide(this.rectanguloDer) || this.pelota.collide(this.rectanguloIzq);
    if(this.pelota.collide(this.rectanguloDer)){
      debugger;
      if(this.speed<10){
        this.pelota.setSpeed(this.pelota.getSpeed()-this.speed);
        this.speed++;
      }

    }else if(this.pelota.collide(this.rectanguloIzq)){
      if(this.speed<10){
        this.pelota.setSpeed(this.pelota.getSpeed()+this.speed);
        this.speed++;
      }
    }

    if(this.pelota.collideRight()){
      this.scoreLeft++;
       //clearInterval(this.intervalId)
       this.pelota = new Pelota(this.ctx);
    }

    if(this.pelota.collideLeft()){
      this.scoreRight++;
      this.pelota = new Pelota(this.ctx);
       //clearInterval(this.intervalId)
    }



  /*  if (col) {
      this._gameOver()
    }*/
  }

  _gameOver() {

  }

  _setListeners() {
  document.onkeydown = (e) => {
   if (e.keyCode === TOP_KEY) {
      //this.vy = -5
      this.rectanguloDer.aumentarVelocidad(-2);
    } else if (e.keyCode === DOWN_KEY) {
      //this.vy = 5
      this.rectanguloDer.aumentarVelocidad(2);
    }else if (e.keyCode === W_KEY) {
      //this.vy = 5
      this.rectanguloIzq.aumentarVelocidad(-2);
    }else if (e.keyCode === S_KEY) {
      //this.vy = 5
      this.rectanguloIzq.aumentarVelocidad(2);
    }
  }

  document.onkeyup = (e) => {
    if (e.keyCode === TOP_KEY || e.keyCode === DOWN_KEY) {
      this.rectanguloDer.aumentarVelocidad(0);
    }else if(e.keyCode === W_KEY ||e.keyCode === S_KEY){
      this.rectanguloIzq.aumentarVelocidad(0);
    }
}
}
}
