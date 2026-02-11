/* ===============================
   SPEAK ENGLISH VOICE
================================= */
function speakEnglish(text){
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;
  msg.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

/* ===============================
   ON PAGE LOAD (DASHBOARD)
================================= */
document.addEventListener("DOMContentLoaded", () => {

  const welcome = document.getElementById("welcome");
  const user = localStorage.getItem("currentUser");

  if (welcome && user) {
    welcome.innerText = "Welcome, " + user + " 🌱";

    // Speak name when dashboard opens
    speakEnglish("Welcome back " + user);
  }

  const saved = localStorage.getItem("myTimeTable");
  if (saved && document.getElementById("timetable")) {
    document.getElementById("timetable").value = saved;
  }
});

/* ===============================
   SAVE NAME (INDEX PAGE)
================================= */
function saveName(){

  const nameInput = document.getElementById("nameInput");
  const msg = document.getElementById("nameMsg");

  if(!nameInput) return;

  const name = nameInput.value.trim();

  if(name === ""){
    msg.innerText = "Please enter your name 🙂";
    msg.style.color = "red";
    speakEnglish("Please enter your name");
    return;
  }

  localStorage.setItem("currentUser", name);

  msg.innerText = "Welcome " + name + " 🌱";
  msg.style.color = "#2e7d32";

  speakEnglish("Hello " + name + ", welcome to Grow Together");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1500);
}

/* ===============================
   ACCORDION
================================= */
function toggleGrand(panelId, btn){

  const panel = document.getElementById(panelId);
  const arrow = btn.querySelector(".arrow");

  if(panel.style.maxHeight){
    panel.style.maxHeight = null;
    arrow.style.transform="rotate(0deg)";
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    arrow.style.transform="rotate(180deg)";
  }
}

/* ===============================
   SAVE TIMETABLE
================================= */
function saveTimetable(){

  const text = document.getElementById("timetable").value;
  const msg = document.getElementById("timetableMsg");

  if(!text.trim()){
    msg.innerText="Please write something 🙂";
    msg.style.color="red";
    return;
  }

  localStorage.setItem("myTimeTable", text);
  msg.innerText="Saved successfully ✅";
  msg.style.color="green";

  speakEnglish("Your timetable has been saved");
}

/* ===============================
   SAVE USAGE
================================= */
function saveUsage(){

  const usageInput = document.getElementById("usage");
  const msg = document.getElementById("saveMessage");
  const usage = Number(usageInput.value);

  if(isNaN(usage) || usage < 0){
    msg.innerText="Enter valid hours";
    msg.style.color="red";
    return;
  }

  const user = localStorage.getItem("currentUser") || "User";

  if(window.db){
    db.collection("usageData").add({
      name:user,
      usage:usage,
      date:new Date().toLocaleDateString(),
      createdAt:new Date()
    });
  }

  let text = "";
  let voice = "";
  let color = "green";

  if(usage <= 1){
    text = "🚀 Excellent control!";
    voice = "Excellent control";
  } else if(usage <= 3){
    text = "🌱 Good, improve more.";
    voice = "Good. Try to improve more.";
  } else {
    text = "🔥 Reduce usage for better future.";
    voice = "Please reduce your mobile usage.";
    color = "red";
  }

  msg.innerText = text;
  msg.style.color = color;

  speakEnglish(voice);

  usageInput.value="";
}
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
};
