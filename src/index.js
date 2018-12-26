import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render( < App /> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

function asyncDoer() {
    var p = new Promise(function (resolve, reject) {
        //做一些异步操作
        setTimeout(function () {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
        console.log('已经通知');
    });
    return p;
}

function resolver(strLog) {
    console.log('strLog :', strLog);
}
asyncDoer().then(resolver);


//---------------------------------------
//mixin
//---------------------------------------

let sayMixin = {
    say(phrase) {
        alert(phrase);
    }
};

let sayHiMixin = {
    __proto__: sayMixin, // (or we could use Object.create to set the prototype here)

    sayHi() {
        // call parent method
        super.say(`Hello ${this.name}`);
    },
    sayBye() {
        super.say(`Bye ${this.name}`);
    }
};
console.log('sayHiMixin :', sayHiMixin);
class User {
    constructor(name) {
        this.name = name;
    }
}

// copy the methods
Object.assign(User.prototype, sayHiMixin);

// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
console.log('User :', User);

//===============================================
var myMixins = {

    moveUp: function () {
        console.log("move up");
    },

    moveDown: function () {
        console.log("move down");
    },

    stop: function () {
        console.log("stop! in the name of love!");
    }

};
// A skeleton carAnimator constructor
function carAnimator() {
    this.moveLeft = function () {
        console.log("move left");
    };
}

// A skeleton personAnimator constructor
function personAnimator() {
    this.moveRandomly = function () { /*..*/ };
}

// Extend both constructors with our Mixin
Object.assign(carAnimator.prototype, {...carAnimator.prototype, ...myMixins});

console.log('carAnimator', carAnimator)
// Create a new instance of carAnimator
var myAnimator = new carAnimator();
console.log('myAnimator', myAnimator)
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();

// Outputs:
// move left
// move down
// stop! in the name of love!