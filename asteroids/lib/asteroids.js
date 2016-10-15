const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas").getContext("2d");
  let gv = new GameView(canvas);
  gv.start();
  console.log(gv)
});
