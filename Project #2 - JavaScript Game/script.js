let deckContainer = document.querySelector('#deckContainer');
let betDisplay = document.querySelector('#betDisplay');
let coinsRemaining = document.querySelector('#coinsRemaining');
let addBet = document.querySelector('#increase');
let minusBet = document.querySelector('#decrease');
let submitBet = document.querySelector('#submit-bet');
let minimumBet = document.querySelector('#minimum');
let maximumBet = document.querySelector('#all-in');
let resultContainer = document.querySelector('#result');
let restartBtn = document.querySelector('#restart');
let betHigher = document.querySelector('#higher');
let betLower = document.querySelector('#lower');
let dealNew = document.querySelector('#ok');
let coinAnimation = document.querySelector('.coin-animation-container');
let mainResultContainer = document.querySelector('#mainResultContainer');
let startBtn = document.querySelector('#start');
let instructionsBtn = document.querySelector('#how-to-play');
let startContainer = document.querySelector('#startContainer');
let instructionsContainer = document.querySelector('#instructions');
let returnToHomeBtn = document.querySelector('#return');

// initial coins at the start of the game
let initialCoins = 30;

// create two arrays, one for card name, and another for card suit
let cardName = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let cardSuit = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];

// create initial value for bet(minimum of 1 coin)
betDisplay.value = 1;
coinsRemaining.textContent = initialCoins; //updates front-end of how much inital coin the player has

// function to create a deck of cards from the array
function deckOfCards() {
  let cards = [];

  for (let s = 0; s < cardSuit.length; s++) {
    for (let n = 0; n < cardName.length; n++) {
      let name = cardName[n];
      let suit = cardSuit[s];
      cards.push({ name, suit });
    }
  }
  return cards; //returns array of cards in the format {card name, card suit}
}

function getRandomCard() { // function to show a random card in the front-end

  let randomCardName;
  let randomCardSuit;

  let randomNumber = Math.floor(Math.random() * 51);

  randomCardName = cards[randomNumber].name;
  randomCardSuit = cards[randomNumber].suit;

  let icon;
  if (randomCardSuit == "Diamonds") {
    icon = '&diams;';
  } else {
    icon = `&${randomCardSuit.toLowerCase()};`;
  }

  const singleCard = document.createElement("div");
  singleCard.classList.add("card", randomCardSuit.toLowerCase());
  singleCard.innerHTML =
    '<span class="card-name-suit top">' + randomCardName + icon + '</span>' +
    '<span class="card-suit">' + icon + '</span>' +
    '<span class="card-name-suit bot">' + randomCardName + icon + '</span>';
  deckContainer.appendChild(singleCard);

  let randomValue; // randomValue to be able to compare it later

  switch (randomCardName) {
    case 'A':
      randomValue = 1;
      break;

    case 'J':
      randomValue = 11;
      break;

    case 'Q':
      randomValue = 12;
      break;

    case 'K':
      randomValue = 13;
      break;

    default:
      randomValue = Number(randomCardName);
  }
  removeCard(randomNumber);
  return randomValue;
}

function removeCard(x) { // function to remove card from the current deck
  for (j = x; j <= cards.length - 2; j++) {
    cards[j] = cards[j + 1];
  }
  cards.length--;
}

function getNewCards() { // function to get a new set of cards after one game
  firstCard = getRandomCard();
  secondCard = getRandomCard();
  toggleHighLowBtn();
}

function toggleHighLowBtn() { // function to show/hide the HIGHER/LOWER (happens when first card has the same value with second card)
  if (firstCard == secondCard) {
    betHigher.classList.remove('hidden');
    betLower.classList.remove('hidden');
    submitBet.disabled = true;
  } else {
    betHigher.classList.add('hidden');
    betLower.classList.add('hidden');
  }
}

submitBet.addEventListener("click", function () {
  coinsRemaining.textContent -= betDisplay.value;
  let thirdCard = getRandomCard();

  if ((firstCard == thirdCard) || (secondCard == thirdCard)) {
    youLose();
  } else if ((thirdCard > firstCard) && (thirdCard > secondCard)) {
    youLose();
  } else if ((thirdCard < firstCard) && (thirdCard < secondCard)) {
    youLose();
  } else {
    youWon();
  }
});

function clearDeck() { // function that clears the game board
  deckContainer.innerHTML = "";
  betHigher.classList.add('hidden');
  betLower.classList.add('hidden');
  cards = deckOfCards();
}

function disableButtons() { // function to disable the buttons (happens when the game is over)

    addBet.disabled = true;
    minusBet.disabled = true;
    minimumBet.disabled = true;
    maximumBet.disabled = true;
    submitBet.disabled = true;

}

betDisplay.addEventListener("keypress", function(e){
  if (e.key === 'Enter'){
    if (parseInt(betDisplay.value) > parseInt(coinsRemaining.textContent) || (parseInt(betDisplay.value) <=0)) {
      alert('Invalid bet.');
      submitBet.disabled = true;
    } else {
      submitBet.disabled = false;
    }
  }
  disableMinBtn();
  disableAddBtn();
});

addBet.addEventListener("click", function () {
  betDisplay.value++;
  disableMinBtn();
  disableAddBtn();
  if (parseInt(betDisplay.value) >=1 && parseInt(betDisplay.value) <= parseInt(coinsRemaining.textContent) ){
    submitBet.disabled = false;
  }
});

minusBet.addEventListener("click", function () {
  betDisplay.value--;
  disableMinBtn();
  disableAddBtn();
  if (parseInt(betDisplay.value) >=1 && parseInt(betDisplay.value) <= parseInt(coinsRemaining.textContent) ){
    submitBet.disabled = false;
  }
});

minimumBet.addEventListener("click", function () {
  betDisplay.value = 1;
  disableMinBtn();
  disableAddBtn();
  if (parseInt(betDisplay.value) >=1 && parseInt(betDisplay.value) <= parseInt(coinsRemaining.textContent) ){
    submitBet.disabled = false;
  }
});

maximumBet.addEventListener("click", function () {
  betDisplay.value = coinsRemaining.textContent;
  disableAddBtn();
  disableMinBtn();
  if (parseInt(betDisplay.value) >=1 && parseInt(betDisplay.value) <= parseInt(coinsRemaining.textContent) ){
    submitBet.disabled = false;
  }
});

restartBtn.addEventListener("click", function () {
  window.location.reload();
})


dealNew.addEventListener("click", function() {

  clearDeck();
  dealNew.classList.add('hidden');
  resultContainer.textContent="";

  if (parseInt(coinsRemaining.textContent) == 0) {
    disableButtons();
    resultContainer.textContent = 'You have no remaining coins. Game Over!'
    restartBtn.classList.remove('hidden');
  } else {
  getNewCards();
  submitBet.disabled = false;
  mainResultContainer.classList.add('hidden');
  }
  disableMinBtn();
  disableAddBtn();
  coinAnimation.classList.add('hidden');

});

function disableMinBtn() {  //function to disable the "-" button. happens when the bet is already in minimum (1 coin)
  if ((parseInt(betDisplay.value) > 1) && (parseInt(betDisplay.value) < parseInt(coinsRemaining.textContent))) {
    minusBet.disabled = false;}
  else if (parseInt(betDisplay.value) >= parseInt(coinsRemaining.textContent)) {
    minusBet.disabled = false;
  } else {
    minusBet.disabled = true;
  }
}

function disableAddBtn() { //function to disable the "+" button. happens when the bet is already equal to the coins remaining.
  if (parseInt(betDisplay.value) >= parseInt(coinsRemaining.textContent)) {
    addBet.disabled = true;
  } else {
    addBet.disabled = false;
  }
}

function youWon() { // function to show that you won. adds the coins won to the coins display.
  coinsRemaining.textContent = parseInt(coinsRemaining.textContent) + (2 * betDisplay.value);
  console.log(`You won ${2 * betDisplay.value} coins!`);
  resultContainer.textContent = `You won ${2 * betDisplay.value} coins!`
  setTimeout (function(){
    mainResultContainer.classList.remove('hidden');
    coinAnimation.classList.remove('hidden');
  }, 1000);
  dealNew.classList.remove('hidden');
  restartBtn.classList.add('hidden');
}

function youLose() { //function to show that you lost.
  console.log(`You Lose. Try Again.`)
  setTimeout (function(){
    mainResultContainer.classList.remove('hidden');
  }, 1500);
  resultContainer.textContent = `You lose. Try again!`
  dealNew.classList.remove('hidden');
  restartBtn.classList.add('hidden');
}

betHigher.addEventListener("click", function () { // upon clicking (placing a bet on higher card), computer will show a third card and analyze.
  coinsRemaining.textContent -= betDisplay.value;
  let thirdCard = getRandomCard();
  if (thirdCard > firstCard) {
    youWon();
  } else {
    youLose();
  }
});

betLower.addEventListener("click", function () {
  let thirdCard = getRandomCard();
  if (thirdCard < firstCard) {
    youWon();
  } else {
    youLose();
  }
});

instructionsBtn.addEventListener("click", function(){
  let instructionsText = document.createTextNode('.');
  startContainer.appendChild(instructionsText);
  instructionsContainer.classList.remove('hidden');
});


startBtn.addEventListener("click", function(){
  clearDeck();
  getNewCards();

  coinsRemaining.textContent = initialCoins;
  betDisplay.value = '1';
  startContainer.classList.add('hidden');
  instructionsContainer.classList.add('hidden');
  mainResultContainer.classList.add('hidden');
  addBet.disabled = false ;
  minimumBet.disabled = false ;
  maximumBet.disabled = false ;
  submitBet.disabled = false ;
});

returnToHomeBtn.addEventListener("click", function(){
  window.location.reload();
});

