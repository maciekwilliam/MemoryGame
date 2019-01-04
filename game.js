const cardsColor = ["red", "red", "yellow", "yellow", "green", "green", "blue", "blue", "cyan", "cyan", "goldenrod", "goldenrod", "purple", "purple", "orangered", "orangered", "powderblue", "powderblue"];

let cards = document.querySelectorAll("div");
console.log(cards);
console.log(cards instanceof Array)
cards = [...cards];
console.log(cards);
console.log(cards instanceof Array)

//rozpoczęcie odmierzania czasu
const startTime = new Date().getTime();
//console.log(startTime);

let activeCard = "";
const activeCards = [];
const gamePairs = cards.length / 2; //liczba par = 9
let gameResult = 0;


const clickCard = function () {
    /*mini gra - dwa kliknięcia */
    activeCard = this;

    //blokowanie funkcji gdy klikniemy na tą samą kartę
    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");


    // czy to jedno kliknięcie
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        console.log("1")
        return;
    }
    //czy to jest drugie kliknięcie
    else {
        console.log("2");
        cards.forEach(card => {
            //kasacja addEventListener
            card.removeEventListener("click", clickCard)
        })
        activeCards[1] = activeCard;
        //console.log(activeCards)
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrana")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;

                //odłączenie od gry funkcji ponownego kliknięcia w kartę już wsześniej dopasowaną
                cards = cards.filter(card => !card.classList.contains("off"))

                if (gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000
                    alert(`Udało się! Twój wynik do: ${gameTime} sekund! Czy może być jeszcze lepiej ?
                    `)
                    //ponowne załadowanie strony po kliknięciu ok w alercie
                    location.reload();
                }
            } else {
                console.log("przegrana")
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            //resetujemy zmienne activeCards, żeby móc dalej grać
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))

        }, 800)

    }
};


const init = function () {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length);
        //losowanie elementu ^
        card.classList.add(cardsColor[position]);
        //przypisanie klasy do elementu (position oznacza losowanie)
        cardsColor.splice(position, 1);
        //usunięcie elementu tablicy (dokładnie jednego)
    });
    //ustawienie, że po 1,5s wszystkie karty zmienią klasę na hidden
    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden")
            card.addEventListener("click", clickCard)
        })
    }, 1500)
}


//wywołanie funkcji
init()
