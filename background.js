class Background {
  constructor(ctx) {
    this.ctx = ctx;
    this.w = this.ctx.canvas.width
    this.h = this.ctx.canvas.height
    this.x = 0
    this.y = 0




  }

  draw() {
    // start the path
    ctx.beginPath();
    // starting position is x=50, y=50
    ctx.moveTo(250, 0);
    // draw the line that has final coordinates x=250, y=50

    ctx.lineTo(250, 300);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.closePath();
  }

}
