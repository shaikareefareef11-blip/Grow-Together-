function login() {
  let name = document.getElementById("username").value;
  if (!name) return alert("Enter name");

  localStorage.setItem("currentUser", name);
  window.location.href = "dashboard.html";
}

function saveUsage() {
  let user = localStorage.getItem("currentUser");
  let usage = document.getElementById("usage").value;
  if (!usage) return alert("Enter usage");

  let today = new Date().toLocaleDateString();
  let data = JSON.parse(localStorage.getItem("data")) || [];

  data.push({ user, date: today, usage });
  localStorage.setItem("data", JSON.stringify(data));

  displayRecords();
}

function displayRecords() {
  let user = localStorage.getItem("currentUser");
  document.getElementById("welcome").innerText = "Welcome " + user;

  let data = JSON.parse(localStorage.getItem("data")) || [];
  let list = document.getElementById("records");
  list.innerHTML = "";

  data.filter(d => d.user === user).forEach(d => {
    let li = document.createElement("li");
    li.textContent = `${d.date} – ${d.usage} hrs`;
    list.appendChild(li);
  });
}

function adminView() {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  let list = document.getElementById("adminData");

  data.forEach(d => {
    let li = document.createElement("li");
    li.textContent = `${d.user} | ${d.date} | ${d.usage} hrs`;
    list.appendChild(li);
  });
}

if (document.getElementById("records")) displayRecords();
if (document.getElementById("adminData")) adminView();