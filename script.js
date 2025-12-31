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
  const surpriseEl = document.getElementById("surprise");
  surpriseEl.innerText = "Yaar you are just my soul and aapse baat karna i can feel your voices are played in my head";
  surpriseEl.classList.toggle("hidden");
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
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
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

/* MEMORY COUNTER */
function updateMemoryCounter() {
  const startDate = new Date("March 13, 2025 16:40:00");
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // average month length

  document.getElementById("months").innerText = months;
  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours % 24;
  document.getElementById("minutes").innerText = minutes % 60;
  document.getElementById("seconds").innerText = seconds % 60;
}
setInterval(updateMemoryCounter, 1000);
updateMemoryCounter();
/* COLOR CUSTOMIZER */
const bgPicker = document.getElementById("bgColorPicker");
const textPicker = document.getElementById("textColorPicker");

bgPicker.addEventListener("input", () => {
  document.body.style.background = bgPicker.value;
});

textPicker.addEventListener("input", () => {
  document.body.style.color = textPicker.value;
  // also update section card text
  document.querySelectorAll(".section-card, h1, h3, p, .section-title, footer")
    .forEach(el => el.style.color = textPicker.value);
});
/* SONGS CONTROL - only one plays at a time */
const audios = document.querySelectorAll(".songs-card audio");
audios.forEach(audio => {
  audio.addEventListener("play", () => {
    audios.forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});
/* POLAROID WALL TOGGLE */
function togglePolaroid() {
  const wall = document.getElementById("polaroidWall");
  wall.classList.toggle("hidden");
}

/* IMAGE ZOOM FEATURE */
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");

document.querySelectorAll(".polaroid img").forEach(img => {
  img.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modalImg.src = img.src;
    modalCaption.innerText = img.nextElementSibling ? img.nextElementSibling.innerText : "";
  });
});

function closeModal() {
  modal.classList.add("hidden");
}


/* Optional: close modal with ESC key */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
/* PUZZLE WITH SNAP */
const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "assets/puzzle.jpg"; // your photo

const rows = 3, cols = 3; // 9 pieces
const pieceW = canvas.width / cols;
const pieceH = canvas.height / rows;
let pieces = [];
let draggingPiece = null;
let offsetX, offsetY;

img.onload = () => {
  // Create pieces
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      pieces.push({
        sx: c * pieceW,
        sy: r * pieceH,
        x: Math.random() * (canvas.width - pieceW),
        y: Math.random() * (canvas.height - pieceH),
        correctX: c * pieceW,
        correctY: r * pieceH,
        fixed: false
      });
    }
  }
  drawPieces();
};

function drawPieces() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    ctx.drawImage(img, p.sx, p.sy, pieceW, pieceH, p.x, p.y, pieceW, pieceH);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(p.x, p.y, pieceW, pieceH);
  });
}

canvas.addEventListener("mousedown", e => {
  const mouseX = e.offsetX, mouseY = e.offsetY;
  pieces.forEach(p => {
    if (!p.fixed &&
        mouseX > p.x && mouseX < p.x + pieceW &&
        mouseY > p.y && mouseY < p.y + pieceH) {
      draggingPiece = p;
      offsetX = mouseX - p.x;
      offsetY = mouseY - p.y;
    }
  });
});

canvas.addEventListener("mousemove", e => {
  if (draggingPiece) {
    draggingPiece.x = e.offsetX - offsetX;
    draggingPiece.y = e.offsetY - offsetY;
    drawPieces();
  }
});

canvas.addEventListener("mouseup", () => {
  if (draggingPiece) {
    // Snap check
    const dx = draggingPiece.x - draggingPiece.correctX;
    const dy = draggingPiece.y - draggingPiece.correctY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < 25) { // snap threshold
      draggingPiece.x = draggingPiece.correctX;
      draggingPiece.y = draggingPiece.correctY;
      draggingPiece.fixed = true;
    }
    drawPieces();
    draggingPiece = null;

    // Puzzle complete check
    if (pieces.every(p => p.fixed)) {
      setTimeout(() => alert("🎉 Puzzle Complete!"), 200);
    }
  }
});

/* DISTANCE MAP */
function showDistance() {
  // Hard-coded coordinates
  const lat1 = 26.7828;  // Your latitude (Lucknow)
  const lon1 = 80.9633;  // Your longitude
  const lat2 = 28.3908;  // Bhavie's latitude (Bareilly)
  const lon2 = 79.4603;  // Bhavie's longitude

  // Haversine formula
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;

  // Show distance text
  document.getElementById("distanceResult").innerText =
    `💖 Distance between you and me: ${d.toFixed(2)} km`;

  // Initialize map
  const map = L.map('map').setView([ (lat1+lat2)/2, (lon1+lon2)/2 ], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Custom heart icon
  const heartIcon = L.divIcon({
    html: "❤️",
    className: "custom-heart",
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  // Add markers
  L.marker([lat1, lon1], {icon: heartIcon}).addTo(map).bindPopup("You");
  L.marker([lat2, lon2], {icon: heartIcon}).addTo(map).bindPopup("Bhavie");

  // Draw line
  L.polyline([[lat1, lon1], [lat2, lon2]], {color: 'pink', weight: 4}).addTo(map);
}
// Ensure only one song plays at a time
document.querySelectorAll("audio").forEach(audio => {
  audio.addEventListener("play", () => {
    document.querySelectorAll("audio").forEach(other => {
      if (other !== audio) other.pause();
    });
  });
});

// Auto-play clock song when it enters view
const clockSection = document.querySelector(".photo-clock");
const clockAudio = document.getElementById("clockAudio");
const defaultAudio = document.getElementById("defaultAudio");

// Ensure only one song plays at a time
function pauseOthers(except) {
  [clockAudio, defaultAudio].forEach(audio => {
    if (audio !== except) audio.pause();
  });
}

// Auto-play clock song when section is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      clockAudio.play().catch(err => console.log("Autoplay blocked"));
      pauseOthers(clockAudio);
    } else {
      clockAudio.pause();
      // If no other audio is playing, start default
      if ([clockAudio, defaultAudio].every(a => a.paused)) {
        defaultAudio.play().catch(err => console.log("Autoplay blocked"));
      }
    }
  });
}, { threshold: 0.5 });

observer.observe(clockSection);

// Also ensure only one plays if user manually starts one
[clockAudio, defaultAudio].forEach(audio => {
  audio.addEventListener("play", () => pauseOthers(audio));
});


// Run automatically when page loads
window.onload = showDistance;
// Zoom modal logic
const modal = document.getElementById("zoomModal");
const zoomImg = document.getElementById("zoomImg");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".clock-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    zoomImg.src = img.src;
  });
});

closeBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};


/* LIVE TIME */
setInterval(() => {
  document.getElementById("liveTime").innerText =
    new Date().toLocaleString();
}, 1000);
