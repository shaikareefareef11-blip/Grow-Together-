/* ===============================
   SPEAK ENGLISH VOICE
================================= */
function speakEnglish(text){
  if(!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;
  msg.pitch = 1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(msg);
}

/* ===============================
   SAVE NAME FUNCTION
================================= */
function saveName(){

  const nameInput = document.getElementById("nameInput");
  const msg = document.getElementById("nameMsg");

  if(!nameInput){
    alert("Input not found!");
    return;
  }

  const name = nameInput.value.trim();

  if(name === ""){
    msg.style.color = "red";
    msg.innerText = "Please enter your name 🙂";
    speakEnglish("Please enter your name");
    return;
  }

  // Save name
  localStorage.setItem("currentUser", name);

  // Show welcome message
  msg.style.color = "#2e7d32";
  msg.innerText = "Welcome " + name + " 🌱";

  // Speak name
  speakEnglish("Hello " + name + ", welcome to Grow Together");

  // Redirect after voice
  setTimeout(function(){
    window.location.href = "dashboard.html";
  },1500);
}
