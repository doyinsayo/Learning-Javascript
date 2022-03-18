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
// Challenge 4: Change the Color of All Buttons

let all_buttons = document.getElementsByTagName('button');

let allButtonsCopy = [];
for (let i=0; i < all_buttons.length; i++) {
    allButtonsCopy.push(all_buttons[i].classList[1]);
}


function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        redButtons();
    } else if (buttonThingy.value === 'green') {
        greenButtons();
    } else if (buttonThingy.value === 'reset') {
        resetButtons();
    } else if (buttonThingy.value === 'random') {
        randomColors();
    }
}


function redButtons() {
    for ( i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.replace(all_buttons[i].classList[1], 'btn-danger');
    }
} 


function greenButtons() {
    for ( i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.replace(all_buttons[i].classList[1], 'btn-success');
    }
}


function resetButtons() {
    for ( i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.replace(all_buttons[i].classList[1], allButtonsCopy[i]);
    }
}


function randomColors() {
    let choices = ['btn-primary' ,'btn-danger' ,'btn-success' ,'btn-warning'];

    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.replace(all_buttons[i].classList[1], choices[randomNumber]);
    }
}

// Challenge 5: Blackjack


let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score':0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score':0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 10]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};


const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHIT, true);
document.querySelector('#blackjack-stand-button').addEventListener('click', stand, true);
document.querySelector('#blackjack-nextHand-button').addEventListener('click', blackjackNextHand, true);

Hit = 0;
Stand = 0;

let currentPlayer = YOU;


function blackjackHIT() {
    if (blackjackGame['isStand'] == false){
        currentPlayer = YOU;
        Hit++;
        let card = randomCard();

        showCard(card, currentPlayer);
        updateScore(card, currentPlayer);
        showScore(currentPlayer);
        decideBlackjackWinner();
        // If you press hit two times DEALER will play one card automatically
        if (Hit == 2) {
            currentPlayer = DEALER;
            let card = randomCard();
            
            showCard(card, currentPlayer);
            updateScore(card, currentPlayer);
            showScore(currentPlayer);
        }
    }
    
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function stand() {
    blackjackGame['isStand'] = true;
    if (blackjackGame['turnsOver'] == false && Stand == 0) {
        Stand++;
        while (DEALER['score'] < 15 && blackjackGame['isStand'] === true) {
            currentPlayer = DEALER;
            let card = randomCard();
            
            showCard(card, currentPlayer);
            updateScore(card, currentPlayer);
            showScore(currentPlayer);
            decideBlackjackWinner();
            await sleep(1000);
        }
        
    }else if (blackjackGame['turnsOver'] == false) {
        currentPlayer = DEALER;
            let card = randomCard();
            
            showCard(card, currentPlayer);
            updateScore(card, currentPlayer);
            showScore(currentPlayer);
            decideBlackjackWinner();
            await sleep(1000);
    }
}


function blackjackNextHand() {
    if (blackjackGame['turnsOver'] == true) {
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        
        // Removing images
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        function resetScore(activePlayer) {
            activePlayer['score'] = 0;
            document.querySelector(activePlayer['scoreSpan']).style.color = 'white';
            document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
        }

        resetScore(YOU);
        resetScore(DEALER);
        currentPlayer = YOU;

        Hit = 0;
        Stand = 0;

        document.querySelectorAll('#textLoser').forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll('#textWinner').forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll('#textDraw').forEach(e => e.parentNode.removeChild(e));

        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
    }
}


function randomCard() {
    let randomIndex = Math.floor(Math.random() *13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/Cards/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}


function updateScore(card, activePlayer) {
    if (card == 'A') {
        // This is like a JOKER so if adding 11 keeps me below 21, add 11. Otherwise add 1.
        // so you choose for 'Ace' to be 11 or 1.
        if ((activePlayer['score']) <= 10 ) {
            blackjackGame['cardsMap'][card] = 11;
        }else {blackjackGame['cardsMap'][card] = 1};
    }
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}


function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}


function decideBlackjackWinner() {
    let yourScore = YOU['score'];
    let dealerScore = DEALER['score'];

    // Game Rules
    switch (true) {
        case (yourScore > 21):
            loser(YOU);
            winner(DEALER);
            blackjackGame['losses']++;
            losses.textContent = blackjackGame['losses'];
            lossSound.play();
            blackjackGame['turnsOver'] = true
            break;
        case (dealerScore > 21):
            winner(YOU);
            loser(DEALER);
            blackjackGame['wins']++;
            wins.textContent = blackjackGame['wins'];
            winSound.play();
            blackjackGame['turnsOver'] = true
            break;
        case (dealerScore > yourScore && dealerScore >= 15):
            loser(YOU);
            winner(DEALER);
            blackjackGame['losses']++;
            losses.textContent = blackjackGame['losses'];
            lossSound.play();
            blackjackGame['turnsOver'] = true
            break;
        case (dealerScore == yourScore):
            draw(YOU);
            draw(DEALER);
            blackjackGame['draws']++;
            draws.textContent = blackjackGame['draws'];
            blackjackGame['turnsOver'] = true
            break;
    }
}


function loser(activePlayer) {
    let h2 = document.createElement('h2');
    let textLoser;
    if (activePlayer == YOU){
        textLoser = document.createTextNode('LOST!');
    } else if (activePlayer == DEALER) {
        textLoser = document.createTextNode('DEALER BUST!');
    }
    h2.appendChild(textLoser);
    Object.assign(h2, {
        id:'textLoser',
        style:'color:red;',
    })
    document.querySelector(activePlayer['div']).appendChild(h2);
}


function winner(activePlayer) {
    // let h2 = document.createElement('h2');
    // let textWinner = document.createTextNode('YOU WIN!');
    // h2.appendChild(textWinner);
    // h2.setAttribute('style', 'color: green;');
    // Object.assign(h2, {
    //     id:'textWinner',
    //     style:'color: green;',
    // })
    // document.querySelector(activePlayer['div']).appendChild(h2);
    // One-liner:
    document.querySelector(activePlayer['div']).appendChild(Object.assign(document.createElement('h2'), {style:'color: green;', id:'textWinner'})).appendChild(Object.assign(document.createTextNode('YOU WON!')));

}


function draw(activePlayer) {
    let h2 = document.createElement('h2');
    let textDraw = document.createTextNode('Draw...');
    h2.appendChild(textDraw);
    Object.assign(h2, {
        id:'textDraw',
        style:'color:yellow;',
    })
    document.querySelector(activePlayer['div']).appendChild(h2);
}


function completeYourHand() {
    alert('Please complete your hand first before submitting a new one.');
}