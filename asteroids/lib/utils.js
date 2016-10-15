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
