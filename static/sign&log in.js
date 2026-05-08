document.getElementById('signupForm').addEventListener('submit', function(event) {
    
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const role = document.querySelector('input[name="user_role"]:checked').value;


    if (!email.toLowerCase().endsWith("@gmail.com")) {
        alert("Error: Only Gmail accounts are allowed.");
        return;
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and contain both uppercase and lowercase letters.");
        return;
    }


    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Logged in SUCCESSFULLY!");
    localStorage.setItem("loggedInUser", email);
    localStorage.setItem("role", role);

    if (role === "admin") {
        window.location.href = "Recipes_List.html"; 
    } else {
        window.location.href = "Recipes_List.html"; 
    }
});