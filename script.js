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
// ==============================
// BLOG POSTS (Local Storage)
// ==============================

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// Create Post
const postForm = document.querySelector("form");

if (window.location.pathname.includes("create-post.html") && postForm) {

    postForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const title = postForm.querySelector("input").value;
        const content = postForm.querySelector("textarea").value;
        const category = postForm.querySelector("select").value;

        const post = {
            id: Date.now(),
            title,
            content,
            category,
            date: new Date().toLocaleDateString()
        };

        posts.push(post);

        localStorage.setItem("posts", JSON.stringify(posts));

        alert("Post Published Successfully!");

        window.location.href = "dashboard.html";
    });

}

// Show Posts on Dashboard
const dashboard = document.querySelector(".blogs");

if (window.location.pathname.includes("dashboard.html")) {

    const container = document.createElement("div");

    posts.forEach(post => {

        container.innerHTML += `
        <div class="card">
            <h3>${post.title}</h3>
            <p>${post.category}</p>
            <p>${post.date}</p>

            <button onclick="deletePost(${post.id})">
                Delete
            </button>
        </div>
        `;

    });

    document.body.appendChild(container);

}

// Delete Post
function deletePost(id){

    posts = posts.filter(post => post.id !== id);

    localStorage.setItem("posts", JSON.stringify(posts));

    location.reload();

}
// ==============================
// Search Blog Posts
// ==============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const value = this.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ==============================
// Like Button
// ==============================

function likePost(button) {
    let likes = Number(button.dataset.likes || 0);
    likes++;
    button.dataset.likes = likes;
    button.innerHTML = `❤️ ${likes}`;
}

// ==============================
// Comments
// ==============================

function addComment() {
    const input = document.getElementById("commentInput");
    const list = document.getElementById("commentList");

    if (!input || input.value.trim() === "") return;

    const p = document.createElement("p");
    p.textContent = input.value;

    list.appendChild(p);
    input.value = "";
}
