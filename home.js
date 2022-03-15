console.log('hello');
//alert('yooo this is doyinsayo');

// variables

var b = 'smoothie'
console.log(b);

var someNumber = 45
console.log(someNumber);

//Manipulating DOM with js i.e changing html with js

//var age = prompt("what is your age?");
//document.getElementById('someText').innerHTML = age;

// numbers in js

var num1 = 5;

// increment num1 by 1
num1 += 1;

// decrement num1 by 1
num1 -= 1;

console.log(num1)

// divide, multiply,remainder
// console.log(num1/15);
// console.log(num1 * 15);
console.log(num1 % 5);

/*
Functions
1. create the function
2. call the function
*/

// create
function fun() {
    alert('this is a function');
}

// call
fun();

function greeting() {
    var name = prompt('what is your name?');
    var result = "Hello" + ' ' + name; // string concatenation
    console.log(result);
}

//greeting();

// How do arguments work in functions

function sumNumbers(num1,num2) {
    var result = num1 + num2;
    console.log(result);
}

sumNumbers(20,15);


/* while loops

var num = 0;

while (num < 100) {
    num += 1;
    console.log(num);
} */

// for loops
for (let num=0; num <= 100; num +=1) {
    console.log(num);
}

// data types
let yourAge = 21; //number
let yourName = 'Doyinsayo'; //string
let name = {firstname:'Ahmed',lastname:'Musa'}; //object
let truth = false ; //boolean
let groceries = ['banana','orange','eggs','bread'] //arrays
let random; //undefined
let nothing = null; //value null

// strings in js common methods
let fruit = "banana";
let moreFruits = "banana\napple";

console.log(fruit.length);
console.log(fruit.indexOf('an'));
console.log(fruit.slice(2,4));

// arrays
let fruits = ['apple','orange','banana','pineapples'];

// objects

let student = {
    first:'Doyinsayo',
    last:'Otufadebo',
    age:21,
    height:'180cm',
    studentInfo: function (){
        return this.first + " " + this.last ;
    }
};
console.log(student)
console.log(student.studentInfo());