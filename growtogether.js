/***********************
 * WELCOME USER
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome");
  const user = localStorage.getItem("currentUser") || "Friend";
  if (welcome) {
    welcome.innerText = "Welcome, " + user + " 🌱";
  }

  // Load saved timetable
  const saved = localStorage.getItem("myTimeTable");
  if (saved && document.getElementById("timetable")) {
    document.getElementById("timetable").value = saved;
  }
});

/***********************
 * TELUGU VOICE (SINGLE & SAFE)
 ***********************/
function speakTelugu(text) {
  if (!window.speechSynthesis) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "te-IN";
  msg.rate = 0.9;
  msg.pitch = 1;
  msg.volume = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/***********************
 * CONFETTI
 ***********************/
function launchConfetti() {
  const end = Date.now() + 1200;

  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/***********************
 * PLAY SOUND (BUTTON CLICK ONLY)
 ***********************/
function enterApp() {
  // optional sound
  const audio = document.getElementById("welcomeSound");
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  // optional voice
  speakTelugu("Grow Together app lo ki swagatham");

  // IMPORTANT: correct redirect for GitHub Pages
  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 600);
}

  }

  // gentle voice (optional)
  speakTelugu("Grow Together app lo ki swagatham");

  // redirect after small delay
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 800);
}
}

/***********************
 * SAVE USAGE + DIALOGUE
 ***********************/
function saveUsage() {
  const usageInput = document.getElementById("usage");
  const messageBox = document.getElementById("saveMessage");

  const usage = Number(usageInput.value);
  const user = localStorage.getItem("currentUser") || "User";
  const date = new Date().toLocaleDateString();

  if (isNaN(usage) || usage < 0) {
    messageBox.style.color = "red";
    messageBox.innerText = "Correct ga hours enter cheyyandi 🙂";
    speakTelugu("Correct ga hours enter cheyyandi");
    return;
  }

  db.collection("usageData").add({
    name: user,
    usage: usage,
    date: date,
    createdAt: new Date()
  })
  .then(() => {

    let text = "";
    let voice = "";
    let color = "#2e7d32";

    if (usage <= 2) {
      text = "🔥 Superr! Nuvvu paina unnavaari avvali ante kindha number thakkuva undali 😊";
      voice = "Chaala bagundi. Nuvvu paina unnavaari avvali ante kindha number thakkuva undali";
      launchConfetti();
    }
    else if (usage <= 4) {
      text = "🙂 Bagundhi… inka konchem thagginchagaligithe top lo untav!";
      voice = "Bagundhi. Inka konchem thagginchagaligithe top lo untav";
    }
    else if (usage <= 6) {
      text = "⚠️ Konchem ekkuva undhi ra… focus penchali 💪";
      voice = "Konchem ekkuva undhi. Focus penchali";
      color = "#ff9800";
    }
    else {
      text = "❌ Phone chaala ekkuva ayipoyindhi… dreams kosam thagginchali 🔥";
      voice = "Phone chaala ekkuva ayipoyindhi. Mee dreams kosam thagginchali";
      color = "red";
    }

    messageBox.innerText = text;
    messageBox.style.color = color;
    speakTelugu(voice);
    usageInput.value = "";

  })
  .catch(() => {
    messageBox.style.color = "red";
    messageBox.innerText = "Something went wrong 😕";
  });
}

/***********************
 * TIME TABLE / IDEAS
 ***********************/
function saveTimetable() {
  const text = document.getElementById("timetable").value;
  const msg = document.getElementById("timetableMsg");

  if (!text.trim()) {
    msg.style.color = "red";
    msg.innerText = "Konchem aina raayi 🙂";
    return;
  }

  localStorage.setItem("myTimeTable", text);
  msg.style.color = "#2e7d32";
  msg.innerText = "Saved successfully ✅";
  speakTelugu("Mee ideas save ayyai");
}
