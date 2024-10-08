document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        // Simple user data storage (localStorage can be used for now)
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Sign up successful! Redirecting to login...");
        window.location.href = "login.html";  // Redirect to login page
    });
});
