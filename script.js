const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const title = document.getElementById('title');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const themeToggle = document.getElementById('themeToggle');
const screenshotBtn = document.getElementById('screenshotBtn');

startBtn.addEventListener('click', () => {
  const name = nameInput.value.trim() || 'Friend';
  title.innerHTML = `🎉 Happy Birthday ${name}! 🎂`;
  popup.classList.remove('hidden');
  launchBalloons();
});

closePopup.addEventListener('click', () => {
  popup.classList.add('hidden');
  launchSurprise();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

screenshotBtn.addEventListener('click', () => {
  html2canvas(document.body).then(canvas => {
    const link = document.createElement('a');
    link.download = 'birthday-greeting.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});

// 🎈 Balloons Animation
const canvas = document.getElementById('balloonCanvas');
const ctx = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;

let balloons = [];

function createBalloon() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + 50,
    r: Math.random() * 20 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`,
    speed: Math.random() * 2 + 1
  };
}

function drawBalloons() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balloons.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });
}

function updateBalloons() {
  balloons.forEach(b => {
    b.y -= b.speed;
    if (b.y < -50) {
      b.y = canvas.height + 50;
      b.x = Math.random() * canvas.width;
    }
  });
}

function launchBalloons() {
  balloons = Array.from({ length: 60 }, createBalloon);
  animateBalloons();
}

function animateBalloons() {
  drawBalloons();
  updateBalloons();
  requestAnimationFrame(animateBalloons);
}

// 🎁 Surprise Animation
function launchSurprise() {
  for (let i = 0; i < 50; i++) {
    setTimeout(() => createFirework(Math.random() * canvas.width, Math.random() * canvas.height), i * 100);
  }
}

function createFirework(x, y) {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x, y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 4 + 2,
      alpha: 1,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }

  function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}`;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  let timer = setInterval(animate, 30);
  setTimeout(() => clearInterval(timer), 1500);
}

// 💫 Glowing trail effect
document.addEventListener('mousemove', e => {
  const spark = document.createElement('div');
  spark.className = 'spark';
  document.body.appendChild(spark);
  spark.style.left = e.pageX + 'px';
  spark.style.top = e.pageY + 'px';
  setTimeout(() => spark.remove(), 500);
});

const style = document.createElement('style');
style.innerHTML = `
.spark {
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 10px #fff, 0 0 20px #ff00de;
  pointer-events: none;
  animation: fadeOut 0.5s ease forwards;
}
@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(2); }
}`;
document.head.appendChild(style);
