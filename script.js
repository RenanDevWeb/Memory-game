const cards =  document.querySelectorAll('.card');
let hasFlipedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add('flip')
    if(!hasFlipedCard) {
        hasFlipedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    hasFlipedCard = false;
    checkForMatch();
}

function checkForMatch(){
    if(firstCard.dataset.card == secondCard.dataset.card){
        disableCards();
        return;
    }
    unFlipedCards();
}

function unFlipedCards(){
       lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        },1500)
}

function disableCards(){
        firstCard.removeEventListener('click',  flipCard)
        secondCard.removeEventListener('click', flipCard)

        resetBoard();
}

function resetBoard() {
    [hasFlipedCard, lockBoard] = [false,false];
    [firstCard, secondCard]    = [null,null];
}


(function suffle(){
    cards.forEach( card => {
        let randonPosition = Math.floor(Math.random() * 12 );
        card.style.order = randonPosition
   })
})();


cards.forEach(card => {
    card.addEventListener('click', flipCard)
})


