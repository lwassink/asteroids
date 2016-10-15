const Game = require('./game');
const Util = require('./utils');

function MovingObject(object) {
  this.pos = object.pos
  this.vel = object.vel
  this.radius = object.radius
  this.color = object.color
  this.game = object.game
}

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
}

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
}

MovingObject.prototype.isCollidedWith = function(otherObject) {
  let dist = Util.distance(this.pos, otherObject.pos);
  return (dist < this.radius + otherObject.radius);
}

MovingObject.prototype.collideWith = function(otherObject){}

module.exports = MovingObject
