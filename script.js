// ----------------------
// Dark Mode
// ----------------------
const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark") ? "dark" : "light"
        );
        themeBtn.textContent =
            document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (themeBtn) themeBtn.textContent = "☀️";
}

// ----------------------
// Register
// ----------------------
const registerForm = document.querySelector("form");

if (window.location.pathname.includes("register.html") && registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const user = {
            name: inputs[0].value,
            email: inputs[1].value,
            password: inputs[2].value
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

// ----------------------
// Login
// ----------------------
if (window.location.pathname.includes("login.html") && registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input");

        const email = inputs[0].value;
        const password = inputs[1].value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (
            user &&
            user.email === email &&
            user.password === password
        ) {
            localStorage.setItem("loggedIn", "true");
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid Email or Password");
        }
    });
}
