/* ===============================
   SPEAK ENGLISH VOICE
================================= */
function speakEnglish(text){

  if (!("speechSynthesis" in window)) return;

  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  msg.rate = 0.95;
  msg.pitch = 1;
  msg.volume = 1;

  // Stop previous voice
  window.speechSynthesis.cancel();

  // Speak
  window.speechSynthesis.speak(msg);
}


/* ===============================
   SAVE NAME FUNCTION
================================= */
function saveName(){

  const nameInput = document.getElementById("nameInput");
  const msg = document.getElementById("nameMsg");

  // Safety check
  if (!nameInput) return;

  const name = nameInput.value.trim();

  if (!name){
    if(msg){
      msg.style.color = "red";
      msg.innerText = "Please enter your name 🙂";
    }
    speakEnglish("Please enter your name");
    return;
  }

  // Save to localStorage
  localStorage.setItem("currentUser", name);

  // Show welcome text
  if(msg){
    msg.style.color = "#2e7d32";
    msg.innerText = "Welcome " + name + " 🌱";
  }

  // Speak name
  speakEnglish("Hello " + name + ", welcome to Grow Together");

  // Redirect after voice finishes (better method)
  setTimeout(function(){
      window.location.href = "dashboard.html";
  }, 1500);
}
