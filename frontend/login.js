document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        // Dummy authentication check (Replace with actual logic)
        if (username === "testuser" && password === "password123") {
            localStorage.setItem("isLoggedIn", true);
            window.location.href = "index.html";  // Redirect to main dashboard
        } else {
            alert("Invalid username or password");
        }
    });
});
