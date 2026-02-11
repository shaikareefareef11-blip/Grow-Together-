/***********************
 * ON PAGE LOAD
 ***********************/
document.addEventListener("DOMContentLoaded", () => {

  const welcome = document.getElementById("welcome");
  const user = localStorage.getItem("currentUser") || "Friend";

  const hour = new Date().getHours();
  let greeting = "Hello";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";
  else greeting = "Good evening";
function saveName() {

  const nameInput = document.getElementById("nameInput");
  const msg = document.getElementById("nameMsg");

  if (!nameInput || !msg) return;

  const name = nameInput.value.trim();

  if (!name) {
    msg.style.color = "red";
    msg.innerText = "Please enter your name 🙂";
    speakEnglish("Please enter your name");
    return;
  }

  localStorage.setItem("currentUser", name);

  msg.style.color = "#2e7d32";
  msg.innerText = "Welcome " + name + " 🌱";

  speakEnglish("Welcome " + name + ". Let's grow together!");

  nameInput.value = "";
}
  if (welcome) {
    welcome.innerText = greeting + ", " + user + " 🌱";
    speakEnglish(greeting + " " + user + ". Stay focused and grow strong.");
  }

  const saved = localStorage.getItem("myTimeTable");
  if (saved && document.getElementById("timetable")) {
    document.getElementById("timetable").value = saved;
  }
});

/***********************
 * SAVE NAME + VOICE
 ***********************/


/***********************
 * ENGLISH VOICE
 ***********************/
7 speakEnglish(text) {
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
 * ENTER BUTTON
 ***********************/

  }

  speakEnglish("Opening dashboard");

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
 * SAVE USAGE
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

  if (!window.db) {
    messageBox.innerText = "Firebase not connected 😕";
    return;
  }

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
 * SAVE TIMETABLE
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
