// 🎧 Background lofi music
const bgMusic = new Audio('sounds/lofi.mp3');

bgMusic.loop = true;     // repeat forever
bgMusic.volume = 0.3;    // soft volume (adjust 0.1–0.5)
// 

function startMusic() {
  bgMusic.play();
  document.removeEventListener("click", startMusic);
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

// Start music on first click anywhere
document.addEventListener("click", startMusic);

const deck = document.getElementById("deck");

// Your artwork PNGs
let cards = [
  "cards/huntress.png",
  "cards/lover.png",
  "cards/maiden.png",
  "cards/mother.png",
  "cards/mystic.png",
  "cards/queen.png",
  "cards/sage.png"
];

let cardElements = [];
let availableCards = []; // pool of cards to draw

// 🔊 Sounds
const flipSound = new Audio('sounds/flip.mp3');
flipSound.volume = 1.0;
const shuffleSound = new Audio('sounds/shuffle.mp3');
shuffleSound.volume = 1.0;

// Create card elements
cards.forEach((img, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-back"></div>
      <div class="card-front" style="background-image: url('${img}')"></div>
    </div>
  `;

  card.style.top = "50%";
  card.style.left = "50%";
  card.style.transform = "translate(-50%, -50%)";

  deck.appendChild(card);
  cardElements.push(card);
  availableCards.push(index);
});

// Spread cards in a fan layout
function spreadCards() {
  const total = cardElements.length;
  const fanAngle = 30;
  const mid = Math.floor(total / 2);

  cardElements.forEach((card, i) => {
    const angle = (-fanAngle / 2) + (fanAngle / (total - 1)) * i;
    const xOffset = 100 * Math.sin(angle * Math.PI / 180);
    const yOffset = 50 * (1 - Math.cos(angle * Math.PI / 180));

    card.style.transform = `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) rotate(${angle}deg)`;
    card.style.zIndex = mid - Math.abs(mid - i);
    card.classList.remove("flip");
  });

  // Reset draw pool
  availableCards = cardElements.map((_, i) => i);
}

// Click a card → pick random from pool
cardElements.forEach(card => {
  card.addEventListener("click", () => {
    if (availableCards.length === 0) return;

    const randomPoolIndex = Math.floor(Math.random() * availableCards.length);
    const pickedCardIndex = availableCards[randomPoolIndex];
    const pickedCard = cardElements[pickedCardIndex];

    // Play flip sound
    flipSound.currentTime = 0;
    flipSound.play();

    // Flip card
    pickedCard.classList.add("flip");
    pickedCard.style.zIndex = 1000;
    pickedCard.style.transform = "translate(-50%, -50%) rotate(0deg) scale(1.1)";

    // Remove from pool
    availableCards.splice(randomPoolIndex, 1);
  });
});

// Shuffle deck
function shuffleDeck() {
  // Play shuffle sound
  shuffleSound.currentTime = 0;
  shuffleSound.play();

  cardElements.forEach((card, i) => {
    card.classList.remove("flip");
    card.style.zIndex = i;
    card.style.transform = "translate(-50%, -50%)";
  });

  setTimeout(() => {
    cardElements.forEach(card => {
      const randomX = Math.random() * 100 - 50;
      const randomY = Math.random() * 80 - 40;
      const randomRotate = Math.random() * 30 - 15;

      card.style.transform = `translate(-50%, -50%) translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    });

    setTimeout(() => {
      spreadCards();
    }, 800);
  }, 300);
}

// Initialize fan
spreadCards();