document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            // You can add your login logic here (e.g., fetch from API or localStorage)
            alert(`Logged in as: ${username}`);
            // Redirect to inventory page
            window.location.href = "index.html"; // Change this to your main page
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newUsername = document.getElementById("newUsername").value;
            const newPassword = document.getElementById("newPassword").value;

            // You can add your sign-up logic here (e.g., fetch from API or store in localStorage)
            alert(`Signed up with username: ${newUsername}`);
            // Redirect to login page
            window.location.href = "login.html"; // Change this to your login page
        });
    }
});
