Function.prototype.inherits = function (parentClass) {
  function Surrogate() {}
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

function MovingObject () {
};

MovingObject.prototype.test = function() { console.log("test"); }

function Ship () {
};

Ship.inherits(MovingObject);

Ship.prototype.otherTest = function() { console.log("Hi there"); }


function Asteroid () {};
Asteroid.inherits(MovingObject);

let ship = new Ship();
let mo = new MovingObject();
let ast = new Asteroid();
// console.log(MovingObject.prototype);
// console.log(Ship.prototype);
// console.log(mo.__proto__);
// console.log(ship);
// console.log(Ship.prototype);
// console.log(Ship.prototype.__proto__);

ship.test();
ship.otherTest();
console.log(mo.otherTest);
console.log(ast.otherTest);
console.log(Ship.prototype);
