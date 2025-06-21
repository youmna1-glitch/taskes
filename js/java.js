
// ========== SIGNUP ==========
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("message");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !password) {
        message.style.color = "red";
        message.textContent = "All fields are required";
        return;
      }

      if (!emailRegex.test(email)) {
        message.style.color = "red";
        message.textContent = "Invalid email format";
        return;
      }

      if (password.length < 4) {
        message.style.color = "red";
        message.textContent = "Password must be at least 4 characters";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.find((user) => user.email === email)) {
        message.style.color = "red";
        message.textContent = "Email already exists";
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      message.style.color = "green";
      message.textContent = "Registration successful. Redirecting...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    });
  }

  // ========== LOGIN ==========
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginName").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const message = document.getElementById("loginMessage");

      if (!email || !password) {
        message.style.color = "red";
        message.textContent = "All fields are required";
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === email);

      if (!user) {
        message.style.color = "red";
        message.textContent = "Email not found";
        return;
      }

      if (user.password !== password) {
        message.style.color = "red";
        message.textContent = "Wrong password";
        return;
      }

      sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      message.style.color = "green";
      message.textContent = "Login successful. Redirecting...";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    });
  }

  // ====== HOME PROTECTION / WELCOME MESSAGE ======
  if (window.location.pathname.includes("home.html")) {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) {
      window.location.href = "login.html";
    } else {
      const welcome = document.getElementById("welcome-message");
      const username = document.getElementById("username");

      if (welcome && username) {
        welcome.textContent = "Welcome";
        username.textContent = user.name;
      }
    }
  }

  // ====== LOGOUT BUTTON ======
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
