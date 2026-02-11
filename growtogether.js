/* ===============================
ON PAGE LOAD
================================= */
document.addEventListener("DOMContentLoaded", function () {

const welcome = document.getElementById("welcome");
const user = localStorage.getItem("currentUser");

// Show only: Welcome Arif
if (welcome) {
if (user && user.trim() !== "") {
welcome.innerText = "Welcome " + user;
} else {
welcome.innerText = "Welcome";
}
}

// Load saved timetable safely
const timetable = document.getElementById("timetable");
const saved = localStorage.getItem("myTimeTable");

if (timetable && saved) {
timetable.value = saved;
}

});

/* ===============================
ACCORDION
================================= */
function toggleGrand(panelId, btn){

const panel = document.getElementById(panelId);
if (!panel) return;

const arrow = btn ? btn.querySelector(".arrow") : null;

if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
panel.style.maxHeight = null;
if (arrow) arrow.style.transform = "rotate(0deg)";
}
else {
panel.style.maxHeight = panel.scrollHeight + "px";
if (arrow) arrow.style.transform = "rotate(180deg)";
}
}

/* ===============================
SAVE TIMETABLE
================================= */
function saveTimetable(){

const textArea = document.getElementById("timetable");
const msg = document.getElementById("timetableMsg");

if (!textArea || !msg) return;

const text = textArea.value.trim();

if (text === "") {
msg.innerText = "Please write something";
msg.style.color = "red";
return;
}

localStorage.setItem("myTimeTable", text);

msg.innerText = "Saved successfully";
msg.style.color = "green";
}

/* ===============================
SAVE USAGE (LOCAL ONLY)
================================= */
function saveUsage(){

const usageInput = document.getElementById("usage");
const msg = document.getElementById("saveMessage");

if (!usageInput || !msg) return;

const usage = parseFloat(usageInput.value);

if (isNaN(usage) || usage < 0) {
msg.innerText = "Enter valid hours";
msg.style.color = "red";
return;
}

let text = "";
let color = "green";

if (usage <= 1) {
text = "Excellent control!";
}
else if (usage <= 3) {
text = "Good, improve more.";
}
else {
text = "Reduce usage for better future.";
color = "red";
}

msg.innerText = text;
msg.style.color = color;

usageInput.value = "";
}

