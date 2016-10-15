const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js')

function Asteroid(pos, game){
  let options = {pos: pos,
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS,
    vel: Util.randomVec(1),
    game: game};
  MovingObject.call(this, options);
}
Util.inherits(Asteroid, MovingObject);
Asteroid.COLOR = 'Gray';
Asteroid.RADIUS = 20;

Asteroid.prototype.collideWith = function(otherObject){
  if(otherObject instanceof Ship){
    otherObject.relocate();
  }
}

// a = new Asteroid([10,11]);

module.exports = Asteroid
