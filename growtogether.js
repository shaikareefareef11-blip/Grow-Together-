/* ===============================
   SPEAK ENGLISH VOICE
================================= */
function speakEnglish(text){
  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

/* ===============================
   ON PAGE LOAD
================================= */
document.addEventListener("DOMContentLoaded", () => {

  const welcome = document.getElementById("welcome");
  const user = localStorage.getItem("currentUser");

  if (welcome && user) {
    welcome.innerText = "Welcome, " + user + " 🌱";
    speakEnglish("Welcome back " + user);
  }

  const saved = localStorage.getItem("myTimeTable");
  if (saved && document.getElementById("timetable")) {
    document.getElementById("timetable").value = saved;
  }
});

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

  const textArea = document.getElementById("timetable");
  const msg = document.getElementById("timetableMsg");

  if(!textArea || !msg) return;

  const text = textArea.value.trim();

  if(text === ""){
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
   SAVE USAGE (LOCAL ONLY)
================================= */
function saveUsage(){

  const usageInput = document.getElementById("usage");
  const msg = document.getElementById("saveMessage");

  if(!usageInput || !msg) return;

  const usage = Number(usageInput.value);

  if(isNaN(usage) || usage < 0){
    msg.innerText="Enter valid hours";
    msg.style.color="red";
    return;
  }

  let text = "";
  let voice = "";
  let color = "green";

  if(usage <= 1){
    text = "🚀 Excellent control!";
    voice = "Excellent control";
  }
  else if(usage <= 3){
    text = "🌱 Good, improve more.";
    voice = "Good. Try to improve more.";
  }
  else{
    text = "🔥 Reduce usage for better future.";
    voice = "Please reduce your mobile usage.";
    color = "red";
  }

  msg.innerText = text;
  msg.style.color = color;

  speakEnglish(voice);

  usageInput.value = "";
}
