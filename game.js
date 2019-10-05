const TOP_KEY = 38;
const DOWN_KEY = 40;
const W_KEY=87;
const S_KEY=83;
const PAUSA = 32;

let pause = false

let newRound = false


class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.bg = new Background(this.ctx);
    this.pelota = new Pelota(this.ctx);
    this.rectanguloDer= new Rectangulo(this.ctx,this.ctx.canvas.width-30,this.ctx.canvas.height/2 - 30);
    this.rectanguloIzq= new Rectangulo(this.ctx,10,this.ctx.canvas.height/2 - 30);


    this._setListeners();

    this.scoreLeft = 0
    this.scoreRight = 0

  }

  run() {
   
    this.intervalId = setInterval(() => {

      if (pause === true) {
        this.printPause()
        return
      }

      
      this._clear()
      this.gameOver();
      start.disabled = false
      this._draw()
      this._moveRectangulos()
      

      if (newRound === true) {
        this.startNewRound()
        return
      }

      
      this._move()
      this._checkCollisions();
      
    
    }, 1000 / 60)
    
  }


  _clear() {
   this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  _draw() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.scoreRight, this.ctx.canvas.width/2-50, 50);
    this.ctx.fillText(this.scoreLeft, this.ctx.canvas.width/2+50, 50);
    
    this.ctx.fillStyle = "white"
    
    this.bg.draw();
    this.pelota.draw();
    this.rectanguloDer.draw();
    this.fillStyle = "green"
    this.rectanguloIzq.draw();

  }
  

  _move() { 
    this.pelota.move()
  }

  _moveRectangulos () {
    this.rectanguloDer.move();
    this.rectanguloIzq.move();
  }

  _checkCollisions() {
    
    if(this.pelota.collide(this.rectanguloDer)){ 
      this.pelota.golpeoPalaSecciones(this.rectanguloDer);
      this.pelota.cambiarDireccionX(-5);
      this.pelota.aumentarVelocidad(-3)
      
    }else if(this.pelota.collide(this.rectanguloIzq)){
      this.pelota.golpeoPalaSecciones(this.rectanguloIzq);
      this.pelota.cambiarDireccionX(5);
      this.pelota.aumentarVelocidad(3)
      
    }

    if(this.pelota.collideTop()) {
      this.pelota.cambiarDireccionY(2);
    }
    
    if (this.pelota.collideBot()) {
      this.pelota.cambiarDireccionY(-2)
    }

    if(this.pelota.collideRight()){
      this.scoreLeft++
      this.pelota = new Pelota(this.ctx);
      newRound = true
      setTimeout(() => {
        newRound = false
      }, 700)
    }

    if(this.pelota.collideLeft()){
      this.scoreRight++
      this.pelota = new Pelota(this.ctx);
      newRound = true
      setTimeout(() => {
        newRound = false
      }, 700)
    }
  }

  printPause () {
    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center"
    this.ctx.fillText("- PAUSE -", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
  }

  /*printMatchPoint() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center"
    this.ctx.fillText("MATCH POINT", this.ctx.canvas.width/2, this.ctx.canvas.height/2 );
  }*/

  printRightPlayerWins () {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center"
    this.ctx.fillText("RIGHT PLAYER WINS", this.ctx.canvas.width/1.35, this.ctx.canvas.height/2+10);
  }

  printLeftPlayerWins () {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center"
    this.ctx.fillText("LEFT PLAYER WINS", this.ctx.canvas.width/4, this.ctx.canvas.height/2-10);
  }

  gameOver() {
    //if scoreLeft or ScoreRight === 11-------->start.disabled = false; innerHTML del boton = restart
    if (this.scoreLeft >= 11 && this.scoreLeft - this.scoreRight > 1) {
      clearInterval(this.intervalId);
      this.printRightPlayerWins()
      
    } else if (this.scoreRight >= 11 && this.scoreRight - this.scoreLeft > 1) {
      clearInterval(this.intervalId);
      this.printLeftPlayerWins();
    }
  }

  startNewRound () {
    this.pelota = new Pelota(this.ctx)
  }

  _setListeners() {
    document.onkeydown = (e) => {
      if (e.keyCode === TOP_KEY) {
        
        this.rectanguloDer.aumentarVelocidad(-6);

      } else if (e.keyCode === DOWN_KEY) {
        
        this.rectanguloDer.aumentarVelocidad(6);

      } else if (e.keyCode === W_KEY) {
        
        this.rectanguloIzq.aumentarVelocidad(-6);

      } else if (e.keyCode === S_KEY) {
        
        this.rectanguloIzq.aumentarVelocidad(6);

      } else if (e.keyCode===PAUSA) {
        pause = !pause
      }
    }

    document.onkeyup = (e) => {
      if (e.keyCode === TOP_KEY || e.keyCode === DOWN_KEY) {
        this.rectanguloDer.aumentarVelocidad(0);
      }else if (e.keyCode === W_KEY || e.keyCode === S_KEY){
        this.rectanguloIzq.aumentarVelocidad(0);
      }
    }
  } 

}
