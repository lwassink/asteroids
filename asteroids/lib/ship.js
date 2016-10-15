const MovingObject = require('./moving_object');
const Util = require('./utils');
const Bullet = require('./bullet');

function Ship(game){
  let options = {pos: [250, 250],
    color: Ship.COLOR,
    radius: Ship.RADIUS,
    vel: [0,0],
    game: game};
  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.RADIUS = 10
Ship.COLOR = "Blue"

Ship.prototype.relocate = function(){
  this.pos = this.game.randomPosition();
  this.vel = [0,0];
}

Ship.prototype.power = function(impulse){
  this.vel[0]+= impulse[0]
  this.vel[1]+= impulse[1]
}

Ship.prototype.fireBullet = function(){
  let new_vel = [this.vel[0]*2, this.vel[1]*2];
  let new_pos = [this.pos[0], this.pos[1]];
  let bullet = new Bullet(new_vel, new_pos, this.game);
  this.game.addObject(bullet);
}

module.exports = Ship;
