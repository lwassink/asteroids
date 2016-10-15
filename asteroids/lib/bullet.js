const MovingObject = require('./moving_object');
const Util = require('./utils');
const Asteroid = require('./asteroid')

function Bullet(vel, pos, game){
  let options = {pos: pos,
    color: Bullet.COLOR,
    radius: Bullet.RADIUS,
    vel: vel,
    game: game};
  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

Bullet.COLOR = 'Red';
Bullet.RADIUS = 5;

Bullet.prototype.collideWith = function(otherObj){
  if(otherObj instanceof Asteroid){
    this.game.remove(otherObj);
    this.game.remove(this);
  }
}

module.exports = Bullet;
