/* PASSWORD */
function unlock() {
  if (document.getElementById("pass").value === "BHAVIE2026") {
    document.getElementById("lockScreen").style.display = "none";
  }
}

/* SHAYARI TYPING */
const shayariText = `Ishq par zor nahin hai yeh woh aatish Ghalib,
Jo lagaye na lage aur bujhaye na bane.

Tumhara zikr bhi kya kam nahi,
Dil thehrta nahi.

Prem gali ati sakri,
Jahan main na samaye.

Naya saal ho ya purani raat,
Saath ho toh khaas lagta hai.

Har subah tumse shuru ho.`;

let i = 0;
function typeShayari() {
  if (i < shayariText.length) {
    document.getElementById("shayari").innerHTML += shayariText.charAt(i);
    i++;
    setTimeout(typeShayari, 35);
  }
}
typeShayari();

/* MUSIC AUTO + FADE */
const music = document.getElementById("bgMusic");
music.volume = 0;
let started = false;

function fadeIn() {
  let v = 0;
  const f = setInterval(() => {
    if (v < 0.4) {
      v += 0.01;
      music.volume = v;
    } else clearInterval(f);
  }, 120);
}

function startMusic() {
  if (!started) {
    music.play().then(fadeIn).catch(()=>{});
    started = true;
  }
}

document.addEventListener("click", startMusic);
document.addEventListener("scroll", startMusic);

function toggleMusic() {
  music.paused ? music.play() : music.pause();
}

/* WHY I LOVE YOU */
const loveLines = [
  "I love you because you make normal days peaceful.",
  "I love how you understand without words.",
  "I love the calm you bring to my chaos.",
  "I love how you exist — effortlessly.",
  "I love the way you make time slow down."
];

let used = [];
function changeLoveLine() {
  if (used.length === loveLines.length) used = [];
  let line;
  do {
    line = loveLines[Math.floor(Math.random() * loveLines.length)];
  } while (used.includes(line));
  used.push(line);
  document.getElementById("loveLine").innerText = line;
}
changeLoveLine();
setInterval(changeLoveLine, 6000);

/* SURPRISE */
function showSurprise() {
  const s = document.getElementById("surprise");
  s.innerText = "Tum ho toh sab theek lagta hai.";
  s.classList.toggle("hidden");
}

/* COUNTDOWN */
function updateCountdown() {
  const t = new Date("Jan 1, 2026 00:00:00") - new Date();
  if (t <= 0) {
    document.getElementById("countdown").innerHTML = "🎆 Happy New Year 2026 🎆";
    return;
  }
  const d = Math.floor(t / 86400000);
  document.getElementById("countdown").innerHTML = `⏳ ${d} days left`;
}
setInterval(updateCountdown, 1000);

/* SLIDESHOW */
let s = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slides[s].classList.remove("active");
  s = (s + 1) % slides.length;
  slides[s].classList.add("active");
}, 3000);

/* STORY + FOREVER */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".story-line").forEach(line => {
    if (line.getBoundingClientRect().top < innerHeight - 100)
      line.style.opacity = 1;
  });

  if (innerHeight + scrollY >= document.body.offsetHeight - 50) {
    document.getElementById("foreverLine").classList.remove("hidden");
  }
});

/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

/* LIVE TIME */
setInterval(() => {
  document.getElementById("liveTime").innerText =
    new Date().toLocaleString();
}, 1000);
