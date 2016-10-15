/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById("game-canvas").getContext("2d");
	  let gv = new GameView(canvas);
	  gv.start();
	  console.log(gv)
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6)

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits: function(childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  randomVec: function(length) {
	    let vec = [Math.random() - 0.5, Math.random() - 0.5];
	    let scale = length / this.norm(vec);
	    vec = [vec[0] * scale, vec[1] * scale];
	    return vec;

	  },

	  norm: function(vec) {
	    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
	  },

	  distance: function(vec1, vec2) {
	    return this.norm([vec1[0] - vec2[0], vec1[1] - vec2[1]]);
	  }
	}

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	const Util = __webpack_require__(4);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Util = __webpack_require__(4);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Util = __webpack_require__(4);
	const Asteroid = __webpack_require__(3)

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


/***/ }
/******/ ]);