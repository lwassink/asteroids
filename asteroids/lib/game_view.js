const Game = require('./game.js');

function GameView(ctx){
  this.ctx = ctx;
  this.game = new Game();
}

GameView.prototype.start = function(){
  this.bindKeyHandlers();
  setInterval( ()=>{
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
}

GameView.prototype.bindKeyHandlers = function(){
  key('a', ()=> this.game.ship.power([-1, 0]));
  key('w', ()=> this.game.ship.power([0, -1]));
  key('s', ()=> this.game.ship.power([0, 1]));
  key('d', ()=> this.game.ship.power([1, 0]));
  key('space', ()=> this.game.ship.fireBullet());
}

module.exports = GameView;
