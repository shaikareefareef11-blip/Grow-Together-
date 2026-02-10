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
  const audio = document.getElementById("welcomeSound");
  if (audio) audio.play().catch(() => {});
  speakTelugu("Grow Together app lo ki swagatham");
  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 600);
}

/***********************
 * SAVE USAGE
 ***********************/
function saveUsage() {
  const usageInput = document.getElementById("usage");
  const messageBox = document.getElementById("saveMessage");
  if (!usageInput || !messageBox) return;

  const usage = Number(usageInput.value);
  if (isNaN(usage) || usage < 0) {
    messageBox.innerText = "Correct ga hours enter cheyyandi 🙂";
    messageBox.style.color = "red";
    speakTelugu("Correct ga hours enter cheyyandi");
    return;
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
