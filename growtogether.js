/* =================================
   SPEAK ENGLISH VOICE (SAFE VERSION)
================================= */
function speakEnglish(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;
  msg.pitch = 1;

  window.speechSynthesis.speak(msg);
}


/* =================================
   ON PAGE LOAD (SAFE FOR ALL PAGES)
================================= */
document.addEventListener("DOMContentLoaded", function () {

  const welcome = document.getElementById("welcome");
  const timetableBox = document.getElementById("timetable");
  const user = localStorage.getItem("currentUser");

  // Welcome text
  if (welcome && user) {
    welcome.innerText = "Welcome, " + user + " 🌱";
    speakEnglish("Welcome back " + user);
  }

  // Load saved timetable
  if (timetableBox) {
    const saved = localStorage.getItem("myTimeTable");
    if (saved) {
      timetableBox.value = saved;
    }
  }
});


/* =================================
   SAVE NAME (INDEX PAGE)
================================= */
function saveName() {

  const nameInput = document.getElementById("nameInput");
  const msg = document.getElementById("nameMsg");

  if (!nameInput || !msg) return;

  const name = nameInput.value.trim();

  if (name === "") {
    msg.innerText = "Please enter your name 🙂";
    msg.style.color = "red";
    speakEnglish("Please enter your name");
    return;
  }

  localStorage.setItem("currentUser", name);

  msg.innerText = "Welcome " + name + " 🌱";
  msg.style.color = "#2e7d32";

  speakEnglish("Hello " + name + ", welcome to Grow Together");

  setTimeout(function () {
    window.location.href = "dashboard.html";
  }, 1500);
}


/* =================================
   ACCORDION
================================= */
function toggleGrand(panelId, btn) {

  const panel = document.getElementById(panelId);
  if (!panel) return;

  const arrow = btn.querySelector(".arrow");

  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    if (arrow) arrow.style.transform = "rotate(0deg)";
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    if (arrow) arrow.style.transform = "rotate(180deg)";
  }
}


/* =================================
   SAVE TIMETABLE
================================= */
function saveTimetable() {

  const textarea = document.getElementById("timetable");
  const msg = document.getElementById("timetableMsg");

  if (!textarea || !msg) return;

  const text = textarea.value.trim();

  if (text === "") {
    msg.innerText = "Please write something 🙂";
    msg.style.color = "red";
    return;
  }

  localStorage.setItem("myTimeTable", text);

  msg.innerText = "Saved successfully ✅";
  msg.style.color = "green";

  speakEnglish("Your timetable has been saved");
}


/* =================================
   SAVE USAGE
================================= */
function saveUsage() {

  const usageInput = document.getElementById("usage");
  const msg = document.getElementById("saveMessage");

  if (!usageInput || !msg) return;

  const usage = Number(usageInput.value);

  if (isNaN(usage) || usage < 0) {
    msg.innerText = "Enter valid hours";
    msg.style.color = "red";
    return;
  }

  const user = localStorage.getItem("currentUser") || "User";

  // Save to Firebase (if connected)
  if (window.db) {
    window.db.collection("usageData").add({
      name: user,
      usage: usage,
      date: new Date().toLocaleDateString(),
      createdAt: new Date()
    }).catch(function () {
      console.log("Firebase save failed");
    });
  }

  let text = "";
  let voice = "";
  let color = "green";

  if (usage <= 1) {
    text = "🚀 Excellent control!";
    voice = "Excellent control!";
  }
  else if (usage <= 3) {
    text = "🌱 Good. Improve more.";
    voice = "Good. Try to improve more.";
  }
  else {
    text = "🔥 Reduce usage for better future.";
    voice = "Please reduce your mobile usage.";
    color = "red";
  }

  msg.innerText = text;
  msg.style.color = color;

  speakEnglish(voice);

  usageInput.value = "";
}
