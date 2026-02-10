/***********************
 * ON PAGE LOAD
 ***********************/
document.addEventListener("DOMContentLoaded", () => {

  // Welcome message
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
 * ENGLISH VOICE (SAFE)
 ***********************/
function speakEnglish(text) {
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;
  msg.pitch = 1;
  msg.volume = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/***********************
 * ENTER BUTTON (CLICK + REDIRECT)
 ***********************/
function enterApp() {

  // Smooth 0.1 sec click sound
  const click = document.getElementById("enterClick");
  if (click) {
    click.currentTime = 0;
    click.volume = 0.4;
    click.play().catch(() => {});
  }

  // English welcome voice
  speakEnglish("Welcome to Grow Together");

  // Redirect
  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 300);
}

/***********************
 * CONFETTI EFFECT
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
 * SAVE USAGE + MOTIVATION
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
    messageBox.innerText = "Please enter valid hours 🙂";
    speakEnglish("Please enter valid hours");
    return;
  }

  // Firebase check
  if (!window.db) {
    messageBox.innerText = "Firebase not connected 😕";
    return;
  }

  // Save to Firestore
  db.collection("usageData").add({
    name: user,
    usage: usage,
    date: date,
    createdAt: new Date()
  }).then(() => {

    let text = "";
    let voice = "";
    let color = "#2e7d32";

    if (usage <= 0.5) {
      text = "🔥 SUPER STAR! Amazing phone control 💎";
      voice = "Super star. You have excellent phone control.";
      launchConfetti();
    }
    else if (usage <= 1) {
      text = "🚀 Excellent! Less than 1 hour. Keep it up 💪";
      voice = "Excellent. You are doing very well.";
    }
    else if (usage <= 2) {
      text = "🌱 Good! Reduce a little more to reach top level.";
      voice = "Good. Try to reduce your phone usage a little more.";
    }
    else if (usage <= 4) {
      text = "⚠️ Average usage. Improve your phone control.";
      voice = "Your phone usage is a bit high. Improve your focus.";
      color = "#ff9800";
    }
    else {
      text = "❌ Danger zone! Your future is more important than the phone 🔥";
      voice = "Your phone usage is too high. Focus on your future.";
      color = "red";
    }

    messageBox.style.color = color;
    messageBox.innerText = text;
    speakEnglish(voice);
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
    msg.innerText = "Please write something 🙂";
    return;
  }

  localStorage.setItem("myTimeTable", textArea.value);
  msg.style.color = "#2e7d32";
  msg.innerText = "Saved successfully ✅";
  speakEnglish("Your ideas have been saved successfully");
}
