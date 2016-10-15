const Asteroid = require('./asteroid.js');
const Ship = require('./ship');
const Bullet = require('./bullet');

function Game() {
  this.asteroids = []
  this.addAsteroids();
  this.bullets = [];
  this.ship = new Ship(this);
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 20;

Game.prototype.addObject = function(object) {
  if (object instanceof Bullet) {
    this.bullets.push(object);
  } else {
    this.asteroids.push(object);
  }
}

Game.prototype.randomPosition = function(){
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
}

Game.prototype.addAsteroids = function(){
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid(this.randomPosition(),this));
  }
}

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach((object) => {
    object.draw(ctx);
  })
}

Game.prototype.moveObjects = function(){
  for (var i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].move();
  }
}

Game.prototype.wrap = function(pos) {
  let wrappedPos = pos;
  if (pos[0] <= 0) wrappedPos[0] = Game.DIM_X;
  if (pos[0] >= Game.DIM_X) wrappedPos[0] = 0;
  if (pos[1] <= 0) wrappedPos[1] = Game.DIM_Y;
  if (pos[1] >= Game.DIM_Y) wrappedPos[1] = 0;
  return wrappedPos;
}

Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.allObjects().length - 1; i++) {
    for (var j = i+1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
        this.allObjects()[i].collideWith(this.allObjects()[j]);
      }
    }
  }
}

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
}

Game.prototype.remove = function(obj){
  if(obj instanceof Asteroid){
    let index = this.asteroids.indexOf(obj);
    this.asteroids = this.asteroids.slice(0,index).concat(this.asteroids.slice(index+1));
  }
  else if (obj instanceof Bullet) {
    let index = this.bullets.indexOf(obj);
    this.bullets = this.bullets.slice(0,index).concat(this.bullets.slice(index+1));
  }
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]).concat(this.bullets);
}

module.exports = Game
