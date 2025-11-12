// ==============================
// Memory Card Game — Student Starter (Option A)
// ==============================
// You have guided TODOs. Complete each TODO to make the game work.
// Files provided: index.html, styles.css, data/card_info.json, images/*.svg
// Open with a local server so fetch() works (e.g., VS Code Live Server).

// ------------- State & DOM refs -------------
let cards = [];
const cardTable = document.querySelector(".card-table");
let firstCard = null;
let secondCard = null;
let noFlipping = false;
let triesRemaining = 10;
let winCounter = null;

const counter = document.querySelector(".tries-remaining");
counter.textContent = triesRemaining;

// Restart (initial simple behavior)
document
  .getElementById("restart")
  .addEventListener("click", () => window.location.reload());

// ------------- Fetch the deck -------------
fetch("./data/card_info.json")
  .then((res) => res.json())
  .then((data) => {
    winCounter = data.length; // # of unique pairs to match
    cards = [...data, ...data];

    console.log(cards);
    // duplicate to make pairs
    const shuffled = shuffle(cards); // TODO: implement shuffle()
    dealCards(shuffled); // TODO: build and attach card elements
  })
  .catch((err) => console.error("Fetch error:", err));

// ------------- TODO #1: Implement Fisher-Yates shuffle -------------
function shuffle(arr) {

  console.log(arr);
  const shuffledArray = [...arr];

  // Start from the last element and swap
  // one by one. We don't need to run for
  // the first element that's why i > 0
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i inclusive
    let j = Math.floor(Math.random() * (i + 1));

    // Swap arr[i] with the element
    // at random index
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  //checking to see if array was shuffled
  //console.log(shuffledArray);

  return shuffledArray;
}

// ------------- TODO #2: Deal cards to the DOM -------------
function dealCards(deck) {
  const cardGrid = document.querySelector(".card-table");


  if (cardGrid) {
    console.log("card grid found");

    const frag = document.createDocumentFragment();

    //creating the main card element
    for (let i = 0; i < deck.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");

      card.setAttribute('data-name', deck[i].name); // Correctly set the data-name

      //the back of the card
      const back = document.createElement('div');
      back.classList.add("back");

      //the front of the card of course
      const front = document.createElement('div');
      front.classList.add("front");

      const backImage = document.createElement('img');
      // Set the image source to the image of the current card
      backImage.src = deck[i].image + '.svg';
      console.log(deck[i].image + '.svg');


      //front.appendChild(backImage) //just checking if images are being attached correctly.

      back.appendChild(backImage)
      card.appendChild(back);
      card.appendChild(front);
      card.addEventListener("click", flipCard);
      frag.appendChild(card);
    }
    cardGrid.appendChild(frag);
  } else {
    console.log("no card grid found");
  }
}

// ------------- TODO #3: Flip logic & guarding -------------
function flipCard() {
  if (noFlipping) return;
  console.log("Flipping card:", this);

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    console.log("First card:", firstCard);
    return;
  }

  secondCard = this;
  console.log("Second card:", secondCard);

    noFlipping = true;
    checkForMatch();
}

// ------------- TODO #4: Decide match vs unflip -------------
function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    console.log(`Match check: ${isMatch}`);
    if (isMatch) {
        matchCards();
    } else {
        unflipCards();
    }
}

// ------------- TODO #5: Handle unflip + tries + lose -------------
function unflipCards() {
    console.log("No match, un-flipping cards.");
    setTimeout(() => {
        triesRemaining--;
        counter.textContent = triesRemaining;
        if (triesRemaining === 0) {
            showImageOverlay();
            return;
        }
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetFlags();
    }, 900);
}

// ------------- TODO #6: Handle match + win -------------
function matchCards() {
    console.log("Match found!");
    winCounter--;
    console.log(`Pairs left to find: ${winCounter}`);
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    setCardBackground(firstCard, "greenyellow");
    setCardBackground(secondCard, "greenyellow");
    resetFlags();

    if (winCounter === 0) {
        console.log("You win!");
        alert("You win!");
        const starInterval = setInterval(createStar, 50);
        setTimeout(() => clearInterval(starInterval), 5000);
    }
}

// Utility: set matched background color on the "back" face
function setCardBackground(card, color) {
  card.children[0].style.background = color;
}

// Reset selection/lock
function resetFlags() {
  firstCard = null;
  secondCard = null;
  noFlipping = false;
}

// ------------- TODO #7: Loss overlay -------------
function showImageOverlay() {
    console.log("You lose!");
    const overlay = document.createElement("div");
    overlay.className = "image-overlay";
    const img = document.createElement("img");
    img.src = "./images/loser.svg";
    img.alt = "You lost";
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
        overlay.style.opacity = 1;
    });
}

// Celebration stars (provided)
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  const randomX = Math.random() * window.innerWidth;
  star.style.left = `${randomX}px`;
  const duration = Math.random() * 2 + 3;
  star.style.animationDuration = `${duration}s`;
  document.querySelector(".star-wrapper").appendChild(star);
  star.addEventListener("animationend", () => star.remove());
}
