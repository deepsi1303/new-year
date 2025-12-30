/* PASSWORD */
function unlock() {
  if (document.getElementById("pass").value === "BHAVIE2026") {
    document.getElementById("lockScreen").style.display = "none";
  }
}

/* TYPING SHAYARI */
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
    setTimeout(typeShayari, 30);
  }
}
typeShayari();

/* MUSIC AUTO + FADE IN */
const music = document.getElementById("bgMusic");
let started = false, vol = 0;
music.volume = 0;

function fadeIn() {
  const f = setInterval(() => {
    if (vol < 0.4) {
      vol += 0.01;
      music.volume = vol;
    } else clearInterval(f);
  }, 100);
}

function autoMusic() {
  if (!started) {
    music.play().then(fadeIn).catch(()=>{});
    started = true;
  }
}

document.addEventListener("click", autoMusic);
document.addEventListener("scroll", autoMusic);

/* MUSIC BUTTON */
function toggleMusic() {
  music.paused ? music.play() : music.pause();
}

/* SURPRISE */
const lines = [
  "Tum ho toh sab theek lagta hai.",
  "Har saal tumse shuru ho.",
  "You are my calm."
];

function showSurprise() {
  const s = document.getElementById("surprise");
  s.innerHTML = lines[Math.floor(Math.random() * lines.length)];
  s.classList.toggle("hidden");
  confetti();
}

/* CONFETTI */
function confetti() {
  for (let i = 0; i < 30; i++) {
    const e = document.createElement("div");
    e.innerHTML = "🎉";
    e.style.position = "fixed";
    e.style.left = Math.random()*100+"vw";
    e.style.top = "-10px";
    document.body.appendChild(e);
    let fall = setInterval(()=>{
      e.style.top = parseInt(e.style.top)+5+"px";
      if (parseInt(e.style.top) > innerHeight) {
        clearInterval(fall); e.remove();
      }
    },30);
  }
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
setInterval(()=>{
  slides[s].classList.remove("active");
  s = (s+1)%slides.length;
  slides[s].classList.add("active");
},3000);

/* SCROLL STORY + FINAL */
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".story-line").forEach(l=>{
    if(l.getBoundingClientRect().top < innerHeight-100) l.style.opacity=1;
  });
  if (innerHeight + scrollY >= document.body.offsetHeight)
    document.getElementById("finalMessage").classList.remove("hidden");
});

/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

/* HEART TRAIL */
document.addEventListener("mousemove", e=>{
  const h = document.createElement("div");
  h.innerHTML = "❤️";
  h.style.position="fixed";
  h.style.left=e.clientX+"px";
  h.style.top=e.clientY+"px";
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),600);
});

/* TIME */
setInterval(()=>{
  document.getElementById("liveTime").innerHTML = new Date().toLocaleString();
},1000);
