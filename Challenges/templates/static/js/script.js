// challenge 1: Your age in days

function ageInDays() {
    var birthYear = prompt('Heyy what is your birthyear?');
    var ageToDays = (2021-birthYear) * 365;
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode('You are ' + ageToDays +  ' days old')
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset() {
    document.getElementById('ageInDays').remove();
}

// challenge 2: cat generator
function generateCat () {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}

/*
// challenge 3: rock,paper and scissors
function rpsGame(yourChoice) {
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice', botChoice);

    results = decideWinner(humanChoice,botChoice); // [w.l] or [d,d] or [l,w]
    console.log(results);

    message = finalMessage(results) //{'message':"you won", 'color':'green'}
    console.log(message);
    //rpsFrontEnd(yourChoice.id, botChoice.id, message);
}

function randToRpsInt() {
    return Math.floor(Math.random() *3);
}

function numberToChoice(number) {
    return ['rock','paper','scissors'][number];
}

function decideWinner (yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors':1,'rock':0.5, 'paper':0},
        'paper': {'rock':1, 'paper':0.5, 'scissors':0},
        'scissors': {'paper':1,'scissors':0.5,'rock':0}
    };

    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore]) {
    if ( yourScore == 0) {
        return {'message': "You lost!",'color':'red'};  
    }else if (yourScore == 0.5) {
        return {'message':'You tied!','color':'yellow'};
    }else {
        return {'message':'You won!',"color":'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    let humanDiv = document.createElement('div');
    let botDiv =   document.createElement('div');
    let messageDiv =  document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 style='box-shadow: 0px 10px 50px blue;'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 style='box-shadow: 0px 10px 50px red;'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

 */

// Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice) {
    console.log(yourChoice);
    let humanChoice, botChoice;

    humanChoice = yourChoice.id;

    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:', botChoice);

    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot won
    console.log(results);

    message = finalMessage(results); // {'message' : 'You won', 'color': 'green'}
    console.log(message);
    
    rpsFrontEnd(yourChoice.id, botChoice, message);
}


function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}


function numberToChoice(number) {
    return ['rock', 'paper','scissors'][number];
}


function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0},
    }

    
    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computeScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computeScore];
}


function finalMessage([yourScore, computeScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color':'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else if (yourScore === 1) {
        return {'message': 'You won!', 'color': 'green'};
    }
}


function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    let imagesDatabase ={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }

    // removing all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height='140' width='140' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height='140' width='140' style='box-shadow: 0px 10px 50px rgba(243, 38, 24,1);'>"


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}