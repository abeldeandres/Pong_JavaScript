const canvas = document.getElementById("my-canvas")
const ctx = canvas.getContext("2d")


const start = document.getElementById("btn")





start.onclick = () => {
    debugger;
    const game = new Game(ctx)

    //game.puntuacionCero()
    game.run()
    start.disabled = true
}

