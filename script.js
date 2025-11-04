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
  // Goal: return a new shuffled copy of arr using Fisher–Yates (in-place) algorithm.
  // Steps:
  // 1) Copy the incoming array (to avoid mutating original).
  // 2) Loop from end -> start. For each index i, pick random j in [0, i].
  // 3) Swap elements at i and j (use destructuring).
  // 4) Return the shuffled copy.
  // Your code here ↓
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
  console.log(shuffledArray);
  // TODO: loop i from copy.length - 1 down to 1
  // TODO: generate j = Math.floor(Math.random() * (i + 1))
  // TODO: swap copy[i] and copy[j]
  return shuffledArray; // replace with real shuffled copy
}

// ------------- TODO #2: Deal cards to the DOM -------------
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
      card.addEventListener('click', flipCard);

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
      frag.appendChild(card);
    }
    cardGrid.appendChild(frag);
  } else {
    console.log("no card grid found");
  }

  // Goal: create DOM nodes for each card and append to .card-table efficiently.
  // Use a DocumentFragment. Card structure:
  // <div class="card" data-name="...">
  //   <div class="back"><img class="back-image" src="./images/<name>.svg" alt="<name>"></div>
  //   <div class="front"></div>
  // </div>

  // TODO: for...of deck
  //   - create .card
  //   - set data-name
  //   - create .back with <img>, and .front
  //   - append back & front into .card
  //   - add click listener -> flipCard
  //   - append .card to fragment

  // TODO: append fragment to cardTable
}

// ------------- TODO #3: Flip logic & guarding -------------
function flipCard() {
  // Requirements:
  // - If noFlipping is true, ignore clicks.
  // - Add class "flipped" to show the back.
  // - Prevent double-clicking the same card (if this === firstCard).
  // - If firstCard is empty, set it and return.
  // - Otherwise, set secondCard, lock (noFlipping = true), and call checkForMatch().
  // Your code here ↓
// 1. Select the parent container element
const cardTable = document.querySelector('.card-table');

// 2. Add a single event listener to the parent
cardTable.addEventListener('click', (event) => {
    // 3. Check if the element that was actually clicked matches the '.card' class
    if (event.target.matches('.card')) {

        // Toggle a class on the specific card that was clicked
        event.target.classList.toggle('flipped');
    }
});

}

// ------------- TODO #4: Decide match vs unflip -------------
function checkForMatch() {
  // Compute isMatch by comparing dataset.name on firstCard and secondCard.
  // If match -> call matchCards(); else -> call unflipCards().
  // Your code here ↓
}

// ------------- TODO #5: Handle unflip + tries + lose -------------
function unflipCards() {
  // After ~900ms:
  // - decrement triesRemaining; update counter text
  // - if triesRemaining === 0 -> show loss overlay (showImageOverlay()) and return
  // - otherwise remove "flipped" from both cards
  // - call resetFlags()
  // Your code here ↓
}

// ------------- TODO #6: Handle match + win -------------
function matchCards() {
  // - Decrement winCounter. If 0 -> trigger win (alert + falling stars for 5s).
  // - Remove click listeners from both cards (they should remain flipped).
  // - Set a green background on matched pairs (setCardBackground(card, "greenyellow")).
  // - Reset flags.
  // Your code here ↓
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
  // Create <div class="image-overlay"><img src="./images/loser.svg" alt="You lost"></div>
  // Append to body, then next frame set opacity to 1.
  // Your code here ↓
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
