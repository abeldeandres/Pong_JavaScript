

class Rectangulo {
  constructor(ctx,x,y) {
    this.ctx = ctx
    //this.y = 243
    this.w = 20
    this.h = 40
    //this.x = this.ctx.canvas.width
    this.x=x;
    this.y=y;


    this.vy = 0;

  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
    //this.ctx.stroke();
    this.ctx.closePath()
  }

  move() {
    if(this.y + this.vy + this.h < 300 && this.y + this.vy > 0) {
      this.y += this.vy
    }
  }

  aumentarVelocidad(velocidad){
    this.vy=velocidad;
  }


}
