// Meme list
const memes = [
  "https://i.imgflip.com/1bij.jpg",
  "https://i.imgflip.com/26am.jpg",
  "https://i.imgflip.com/30b1gx.jpg",
  "https://i.imgflip.com/4t0m5.jpg",
  "https://i.imgflip.com/2wifvo.jpg"
];

function loadMemes() {
  const container = document.getElementById("memeContainer");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 0; i < memes.length; i++) {
    const img = document.createElement("img");
    img.src = memes[i];
    container.appendChild(img);
  }
}

// Roast Generator
const roasts = [
  "Rahid ka WiFi bhi use se tez chal raha hai 😆",
  "Rahid ne calendar se dosti karl, date mil jayegi 😂",
  "Rahid jab sochta hai, Google bhi confuse ho jata hai 🤣",
  "Rahid ka swag to battery ke 1% jaisa hai — kabhi tikta hi nahi ⚡",
  "Rahid ne selfie li to camera ne resign de diya 😜"
];
function generateRoast() {
  const line = document.getElementById("roastLine");
  line.innerText = roasts[Math.floor(Math.random() * roasts.length)];
}

// Confession Generator
const confessions = [
  "Rahid once said he’s allergic to work! 😂",
  "Rahid secretly loves mirror selfies 🤳",
  "Rahid ne kaha, ‘Main handsome nahi, full handsum hun!’ 😎",
  "Rahid ka favourite exercise: eating! 🍕",
  "Rahid dreams of becoming meme king 👑"
];
function generateConfession() {
  const text = document.getElementById("confession");
  text.innerText = confessions[Math.floor(Math.random() * confessions.length)];
}

// Funny Facts Generator
const facts = [
  "Rahid once tried to charge his phone in the fridge 😆",
  "Rahid thinks ‘Ctrl+C’ means ‘Cool Copy’ 😂",
  "Rahid invented sleeping at work 💤",
  "Rahid can talk non-stop for 2 hours about tea ☕",
  "Rahid once lost a staring contest with his mirror 🤣"
];
function generateFact() {
  const fact = document.getElementById("fact");
  fact.innerText = facts[Math.floor(Math.random() * facts.length)];
}
