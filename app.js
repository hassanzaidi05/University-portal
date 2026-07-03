function showDateTime() {
  const footer = document.querySelector('.footer p');
  if (footer) {
    const now = new Date();
    footer.innerHTML = `&copy; Designed By Syed Muhammad Hassan Zaidi<br>Current Date & Time: ${now.toLocaleString()}`;
  }
}
setInterval(showDateTime, 1000);

function showMessage(msg, type = "info") {
  const div = document.createElement("div");
  div.textContent = msg;
  div.className = `alert ${type}`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const name = document.getElementById('name').value.trim();
    const number = document.getElementById('number').value.trim();
    const date = document.getElementById('date').value;
    const degree = document.getElementById('Degree').value;
    const department = document.getElementById('courses').value;
    const colour = document.getElementById('colour').value.trim();

    if (!email || !password || !name || !number || !date) {
      showMessage("⚠️ Please fill in all required fields!", "error");
      return;
    }

    if (!email.includes("@")) {
      showMessage("❌ Invalid email format!", "error");
      return;
    }

    if (password.length < 6) {
      showMessage("🔒 Password must be at least 6 characters long!", "error");
      return;
    }

    const confirmSave = confirm("Are you sure you want to submit this information?");
    if (!confirmSave) {
      showMessage("Submission cancelled.", "info");
      return;
    }

    const student = { email, name, number, date, degree, department, colour };
    localStorage.setItem("studentData", JSON.stringify(student));

    showMessage("✅ Registration Successful! Redirecting to Profile...", "success");

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 1500);
  });
}

if (window.location.pathname.includes("profile.html")) {
  const data = JSON.parse(localStorage.getItem("studentData"));
  if (data) {
    const tableBody = document.querySelector(".std-data tbody");
    if (tableBody) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${data.email}</td>
        <td>${data.name}</td>
        <td>${data.number}</td>
        <td>${data.date}</td>
        <td>${data.degree}</td>
        <td>${data.department}</td>
        <td>--</td>
        <td>${data.colour}</td>
      `;
      tableBody.appendChild(newRow);
      showMessage("👤 Student profile loaded successfully!", "success");
    }
  } else {
    showMessage("⚠️ No student data found. Please register first!", "error");
  }
}
