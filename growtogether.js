/***********************
 * WELCOME USER
 ***********************/
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome");
  const user = localStorage.getItem("currentUser") || "Friend";
  if (welcome) welcome.innerText = "Welcome, " + user + " 🌱";

  const saved = localStorage.getItem("myTimeTable");
  if (saved && document.getElementById("timetable")) {
    document.getElementById("timetable").value = saved;
  }
});

/***********************
 * TELUGU VOICE
 ***********************/
function speakTelugu(text) {
  if (!window.speechSynthesis) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "te-IN";
  msg.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/***********************
 * ENTER APP
 ***********************/
function enterApp() {
  // tiny smooth click (0.1 sec feel)
  const click = document.getElementById("enterClick");
  if (click) {
    click.currentTime = 0;
    click.volume = 0.4; // soft, not irritating
    click.play().catch(() => {});
  }

  // optional gentle Telugu voice
  speakTelugu("Grow Together app lo ki swagatham");

  // smooth transition
  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 300);
}
}

/***********************
 * SAVE USAGE
 ***********************/
if (usage <= 0.5) {
  text =
    "🔥🔥 SUPER STAR! Phone meedha control ante idhe! Discipline level MAX 💎";
  voice =
    "Superr! Phone meedha control undhi. Nuvvu chaala strong.";
  launchConfetti();
}
else if (usage <= 1) {
  text =
    "🚀 Excellent! 1 hour lopu undadam ante future meedha focus 💪";
  voice =
    "Excellent. Nuvvu future kosam serious ga unnaru.";
}
else if (usage <= 2) {
  text =
    "🌱 Good! Inka konchem thagginchithe top category lo velthav 😊";
  voice =
    "Bagundhi. Inka konchem thagginchagalav.";
}
else if (usage <= 4) {
  text =
    "⚠️ Average. Phone control improve cheyyali ra 🔄";
  voice =
    "Phone usage konchem ekkuva undhi. Improve cheyyali.";
  color = "#ff9800";
}
else {
  text =
    "❌ Danger zone! Phone kaadhu future important 🔥";
  voice =
    "Phone usage chaala ekkuva ayipoyindhi. Mee future gurinchi alochinchandi.";
  color = "red";
}
  }

  db.collection("usageData").add({
    usage,
    date: new Date().toLocaleDateString(),
    createdAt: new Date()
  }).then(() => {
    messageBox.style.color = "#2e7d32";
    messageBox.innerText = "Saved successfully ✅";
    speakTelugu("Mee usage save ayindi");
    usageInput.value = "";
  });
}

/***********************
 * SAVE TIMETABLE
 ***********************/
function saveTimetable() {
  const text = document.getElementById("timetable");
  const msg = document.getElementById("timetableMsg");
  if (!text || !msg) return;

  if (!text.value.trim()) {
    msg.innerText = "Konchem aina raayi 🙂";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("myTimeTable", text.value);
  msg.innerText = "Saved successfully ✅";
  msg.style.color = "#2e7d32";
  speakTelugu("Mee ideas save ayyai");
}
