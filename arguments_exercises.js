function sum1(){
  let sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

// console.log(sum1(1,2,3,4))

function sum2(...args){
  let sum = 0;
  for (var i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

// console.log(sum2(1,2,3,4))

Function.prototype.myBind1 = function(){
  let args = Array.from(arguments);
  let that = this;
  return function() {
    let args2 = Array.from(arguments);
    return that.apply(args[0], args.slice(1).concat(args2));
  }
}

Function.prototype.myBind = function(...args){
  return (...args2) => {
    return this.apply(args[0], args.slice(1).concat(args2));
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!



function curriedSum(numArgs) {
  let numbers = [];
  let sum = 0;
  function _curriedSum(number) {
    numbers.push(number);
    sum += number;
    if (numbers.length === numArgs) {
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

Function.prototype.curry1 = function(numArgs){
  let args = [];
  let that = this;
  function curryier(){
    args = args.concat(Array.from(arguments))
    if(args.length >= numArgs){
      return that.apply(this,args);
    }
    else{
      return curryier
    }
  }
  return curryier
}


function mysum(args1, args2){
  return args1+args2;
}



Function.prototype.curry2 = function(numArgs){
  let args = [];
  let that = this;
  function curryier(...newArgs){
    args = args.concat(newArgs)
    if(args.length >= numArgs){
      return that(...args);
    }
    else{
      return curryier
    }
  }
  return curryier
}

let a = mysum.curry2(2)
console.log(a(2)(3))
