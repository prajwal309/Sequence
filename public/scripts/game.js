//This is the main game logic file

// Define card suits and values (excluding Jacks)
const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'K', 'A'];
const allValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// Generate the deck without Jacks
let deck = [];
for (let suit of suits) {
    for (let value of allValues) {
        deck.push(value + suit);
    }
}
let shuffledDeck = shuffle([...deck, ...deck]);

// Duplicate the deck to fill 100 slots (some cards will repeat as in Sequence)
let defaultGridCards = [
                        ["Seq", "2♠", "3♠", "4♠", "5♠", "6♠","7♠", "8♠", "9♠","Seq"],
                        [ "6♣", "5♣", "4♣", "3♣", "2♣", "A♥", "K♥", "Q♥", "10♥", "10♠"],
                        [ "7♣", "A♠", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "9♥", "Q♠"],
                        [ "8♣", "K♠", "6♣", "5♣", "4♣", "3♣", "2♣", "8♦", "8♥", "K♠"],
                        [ "9♣", "Q♠", "7♣", "6♥", "5♥", "4♥", "A♥", "9♦", "7♥", "A♠"],
                        [ "10♣", "10♠", "8♣", "7♥", "2♥", "3♥", "K♥", "10♦", "6♥", "2♦"],
                        [ "Q♣", "9♠", "9♣", "8♥", "9♥", "10♥", "Q♥", "Q♦", "5♥", "3♦"],
                        [ "K♣", "8♠", "10♣", "Q♣", "K♣", "A♣", "A♦", "K♦", "4♥", "4♦"],
                        [ "A♣", "7♠", "6♠", "5♠", "4♠", "3♠", "2♠", "2♥", "3♥", "5♦"],
                        ["Seq", "A♦", "K♦", "Q♦", "10♦", "9♦", "8♦", "7♦", "6♦","Seq"]
                        ]


// Shuffle the grid cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


let gridCards = defaultGridCards.flat().reverse();


// Create the 10x10 grid
const gridContainer = document.getElementById('grid');
for (let i = 0; i < 100; i++) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    const card = gridCards.pop();
    if (card.includes('♥')) {
        cardDiv.style.color = 'red';
    }
    else if (card.includes('♦')) {
        cardDiv.style.color = 'red';
    }
    else if (card.includes('Se')) {
        cardDiv.style.background = 'yellow';
        cardDiv.style.fontWeight = 'bold';
    }
    cardDiv.innerText = card;
    
    
    gridContainer.appendChild(cardDiv);
}

let numPlayers = 4;
console.log("The number of players:"+numPlayers);

let numCards = 6; // Default number of cards for 4 players
let colors = [];
if (numPlayers == 2) {
    numCards = 7;
    colors = ['rgb(255, 139, 160)', 'rgb(160, 255, 139)'];
}
else if (numPlayers == 3) {
    numCards = 7;
    colors = ['rgb(255, 139, 160)', 'rgb(160, 255, 139)', 'rgb(139, 160, 255)'];
}
else if (numPlayers == 4) {
    numCards = 6;
    colors = ['rgb(255, 139, 160)', 'rgb(160, 255, 139)'];
}
else if (numPlayers == 6) {
    numCards = 6;
    colors = ['rgb(255, 139, 160)', 'rgb(160, 255, 139)', 'rgb(139, 160, 255)'];
}

let playerCards = [];
for (let i = 0; i < numPlayers; i++) {
    playerCards.push(shuffledDeck.splice(0, numCards));
}

let currentPlayer = 0;
const player1Container = document.getElementById('cardPlayer');


//This text is doing nothing.
playerCards[0].forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'player1card';
    if (card.includes('♥')) {
        cardDiv.style.color = 'red';
    } else if (card.includes('♦')) {
        cardDiv.style.color = 'red';
    }
    cardDiv.innerText = card;
    console.log(card);
    player1Container.appendChild(cardDiv);
});


// Highlight matching cards in the grid for Player 1
const gridCardsElements = document.querySelectorAll('#grid .card'); // Select all grid cards
const player1Cards = playerCards; // Player 1's cards
console.log(player1Cards);

player1Cards[0].forEach(playerCard => {
    gridCardsElements.forEach(gridCard => {
        if (gridCard.innerText === playerCard) {
            gridCard.style.border = '5px solid black'; // Highlight with a green border
            gridCard.style.cursor = 'pointer'; // Make the cursor indicate a clickable card
            gridCard.style.backgroundColor = "white";
        // Add a click event listener to handle the card being clicked
        gridCard.addEventListener('click', () => { 
        const currentColor = window.getComputedStyle(gridCard).backgroundColor;
        if (currentColor === colors[0]) {
            gridCard.style.backgroundColor = 'white'; // Change background back to white
        } else{
            gridCard.style.backgroundColor = colors[0]; // Change background when clicked
        } 
        //change the turn
        currentPlayer = (currentPlayer+1)%numPlayers;
        });
    }
});

//cardPlayer.addEventListener('click', () => {
//    currentPlayer = (currentPlayer + 1) % numPlayers;
//    console.log("The currentPlayer is:"+currentPlayer);
//});

//check if the card makes a sequence
/*
function checkSequence(card1, card2) {
    let card1Value = card1.slice(0, -1);
    let card2Value = card2.slice(0, -1);
    let card1Suit = card1.slice(-1);
    let card2Suit = card2.slice(-1);
    let card1Index = allValues.indexOf(card1Value);
    let card2Index = allValues.indexOf(card2Value);
    if (card1Suit === card2Suit) {
        if (Math.abs(card1Index - card2Index) === 1) {
            return true;
        }
    }
    return false;
}
*/
});
    
