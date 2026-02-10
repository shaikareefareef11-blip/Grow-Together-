/***********************
 * ON PAGE LOAD
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  // Welcome user
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
 * TELUGU VOICE (SAFE)
 ***********************/
function speakTelugu(text) {
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "te-IN";
  msg.rate = 0.9;
  msg.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/***********************
 * SMALL ENTER CLICK + REDIRECT
 ***********************/
function enterApp() {
  const click = document.getElementById("enterClick");
  if (click) {
    click.currentTime = 0;
    click.volume = 0.4; // soft 0.1 sec click
    click.play().catch(() => {});
  }

  // English voice
  speakEnglish("Welcome to Grow Together");

  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 300);
}
  }

  speakTelugu("Grow Together app lo ki swagatham");

  // HARD FALLBACK NAVIGATION
  setTimeout(() => {
    const link = document.getElementById("enterFallback");
    if (link) {
      link.click(); // always works
    } else {
      window.location.href = "./dashboard.html";
    }
  }, 300);
}
  }

  // optional soft voice
  speakTelugu("Grow Together app lo ki swagatham");

  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 300);
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
 * SAVE USAGE + DIALOGUE
 ***********************/
function saveUsage() {
  const usageInput = document.getElementById("usage");
  const messageBox = document.getElementById("saveMessage");
  if (!usageInput || !messageBox) return;

  const usage = Number(usageInput.value);
  const user = localStorage.getItem("currentUser") || "User";
  const date = new Date().toLocaleDateString();

  if (isNaN(usage) || usage < 0) {
    messageBox.style.color = "red";
    messageBox.innerText = "Correct ga hours enter cheyyandi 🙂";
    speakTelugu("Correct ga hours enter cheyyandi");
    return;
  }

  // Firebase save (db MUST be window.db)
  if (!window.db) {
    messageBox.innerText = "Firebase not connected 😕";
    return;
  }

  db.collection("usageData").add({
    name: user,
    usage,
    date,
    createdAt: new Date()
  }).then(() => {

    let text = "";
    let voice = "";
    let color = "#2e7d32";

    if (usage <= 0.5) {
      text = "🔥🔥 SUPER STAR! Phone control level MAX 💎";
      voice = "Superr. Nuvvu phone meedha control lo unnaru";
      launchConfetti();
    } else if (usage <= 1) {
      text = "🚀 Excellent! 1 hour lopu undhi 💪";
      voice = "Excellent. Chaala bagundi";
    } else if (usage <= 2) {
      text = "🌱 Good! Inka konchem thagginchithe top level";
      voice = "Bagundhi. Inka konchem thagginchagalav";
    } else if (usage <= 4) {
      text = "⚠️ Average. Phone control improve cheyyali";
      voice = "Phone usage konchem ekkuva undhi";
      color = "#ff9800";
    } else {
      text = "❌ Danger zone! Phone kaadhu future important 🔥";
      voice = "Phone usage chaala ekkuva ayipoyindhi";
      color = "red";
    }

    messageBox.style.color = color;
    messageBox.innerText = text;
    speakTelugu(voice);
    usageInput.value = "";

  }).catch(() => {
    messageBox.style.color = "red";
    messageBox.innerText = "Something went wrong 😕";
  });
}

/***********************
 * SAVE TIME TABLE
 ***********************/
function saveTimetable() {
  const textArea = document.getElementById("timetable");
  const msg = document.getElementById("timetableMsg");
  if (!textArea || !msg) return;

  if (!textArea.value.trim()) {
    msg.style.color = "red";
    msg.innerText = "Konchem aina raayi 🙂";
    return;
  }

  localStorage.setItem("myTimeTable", textArea.value);
  msg.style.color = "#2e7d32";
  msg.innerText = "Saved successfully ✅";
  speakTelugu("Mee ideas save ayyai");
}
