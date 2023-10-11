const gameContainer = document.getElementById('game-container');
const infoField = document.getElementById('info-field');

let score = 0;
infoField.innerHTML = `Score: ${score}`;

let goalArray = [];

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerText = getRandomNumber();
    card.addEventListener('mousedown', onMouseDown);
    card.addEventListener('touchstart', touchStart);
    
    return card;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
    // return Math.floor(Math.random() * 2) + 9;
}

let currentCard = null;
let currentValue = null;

let firstCard = null;
let firstValue = null;

let secondCard = null;
let secondValue = null;

function touchStart(event) {
    if (firstCard === null && secondCard === null) {
        firstCard = event.target;
        firstCard.style.backgroundColor = 'papayawhip';
        firstValue = parseInt(firstCard.innerText);

    } else if (firstCard === event.target && secondCard === null){
        firstCard.style.backgroundColor = 'ghostwhite';
        firstCard = null;
        firstValue = null;


    } else if (firstCard !== null && secondCard === null) {
        secondCard = event.target;
        secondValue = parseInt(secondCard.innerText);

        if (firstValue > secondValue) {
            secondCard.innerText = firstValue;
            newValueWithTime(firstCard, 500);
            score += firstValue;
        } else if (firstValue < secondValue) {
            newValueWithTime(firstCard, 500);
            score -= firstValue;
        }
        
        console.log(firstValue, secondValue);

        infoField.innerHTML = `Score: ${score}`;
        
        firstCard.style.backgroundColor = 'ghostwhite';
        firstCard = null;
        firstValue = null;
        secondCard = null;
        secondValue = null;
    }
    if (firstValue === null) {
        console.log('FirstValue is null', firstValue);
    } else {
        console.log('FirstValue isn`t null', firstValue);

    }
}

function onMouseDown(event) {
        currentCard = event.target;
        currentValue = parseInt(currentCard.innerText);
        currentCard.style.zIndex = 1;
        
        const onMouseMove = (e) => {
            if (
                e.clientX > event.clientX + 50 ||
                e.clientX < event.clientX - 50 ||
                e.clientY > event.clientY + 50 ||
                e.clientY < event.clientY - 50
            ) {
                
                firstCard = currentCard;
                currentCard == null;
            }
            currentCard.style.transform = 'translate(' + (e.clientX - event.clientX) + 'px, ' + (e.clientY - event.clientY) + 'px)';
        };
        
        const onMouseUp = () => {
            currentCard.style.zIndex = '';
            currentCard.style.transform = '';
            currentCard == null;
            document.addEventListener('mouseover', onMouseOver);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            
        };
        
        document.addEventListener('mouseover', onMouseOver);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    
}

function onMouseOver(event) {
    if (gameContainer.contains(event.target) && event.target !== gameContainer) {
        secondCard = event.target;
        let newValue = parseInt(secondCard.innerText);
        if (firstCard !== null && firstCard !== secondCard && secondCard !== null) {
            
            if (currentValue > newValue) {
                event.target.innerText = currentValue;
                newValueWithTime(firstCard, 500);
                score += currentValue;
            } else if (currentValue < newValue) {
                newValueWithTime(firstCard, 500);
                score -= currentValue;
            }
            infoField.innerHTML = `Score: ${score}`;
        }
        secondCard = null;
    }

    firstCard = null;
    currentValue = null;
    
    document.removeEventListener('mouseover', onMouseOver);
}

function newValueWithTime(firstCard, time) {
    firstCard.innerText = '';
    firstCard.style.opacity = 0;
    setTimeout(function() {
        firstCard.innerText = getRandomNumber();
        firstCard.style.opacity = 1;
        checkGoal();
    }, time);
}


function checkGoal() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        if (card.innerText == 10) {
            goalArray.push(card);

        }
    });
    if (goalArray.length == 9) {
        allCards.forEach(card => {
            card.removeEventListener('mousedown', onMouseDown);
            card.removeEventListener('touchstart', touchStart);
            card.style.backgroundColor = 'gold';
            card.style.fontSize = 40 + 'px';
            card.innerText = 'WIN!';
        });
    }
    goalArray = [];
}

function initializeGame() {
    gameContainer.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const card = createCard();
        gameContainer.appendChild(card);
    }
    checkGoal();
}

initializeGame();
