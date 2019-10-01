class Pelota {
  constructor(ctx) {
    this.ctx = ctx
    //this.y = 243
    this.w = 20
    this.h = 40
    //this.x = this.ctx.canvas.width
    this.x=250;
    this.y=150;
    this.r=10;

    this.vx = 5
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    //this.ctx.stroke();
    this.ctx.closePath()
  }

  move() {
    this.x += this.vx
  }

  collide(el) {
    const colX = el.x + el.w > this.x && el.x < this.x + this.w
    const colY = el.y + el.h > this.y && el.y < this.y + this.h

    return colX && colY
  }

  collideRight(){
    const colX = this.x < 0;
    return colX;
  }

  collideLeft(){
      const colX = this.x + this.w > 500;
      return colX;
  }

  cambiarDireccion(velocidad){
    this.vx=velocidad;
  }


  iniciarPelota(){
    this.x=250;
    this.y=150;
  }
}
